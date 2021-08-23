let imageCache = {};
const getImage = (imageSrc) => {
    if(!imageCache[imageSrc]){
        imageCache[imageSrc] = createImage(imageSrc);
    }
    return imageCache[imageSrc];
}

//이미지 생성
const createImage = (imageSrc) => {
    const image = document.createElement('IMG');
    image.src = require('@/assets/img/'+imageSrc);
    imageCache[imageSrc] = image;
    return image;
}

//Sprite
//이미지 자원의 관리와 draw 기능을 제공
class Sprite {

    //생성자
    constructor(imageSrc, frameWidth, frameHeight, scale){

        //이미지 생성
        this.image = getImage(imageSrc);
        
        //스케일 처리
        this.scale = scale?scale:1;
        this.scaleWidth = frameWidth * this.scale;
        this.scaleHeight = frameHeight * this.scale;

        //이미지 비율 점검
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        if(this.image.width % frameWidth !== 0
        || this.image.height % frameHeight !== 0
        ){
            throw new Error('이미지의 프레임사이즈 비율이 맞지 않습니다.');
        }

        //프레임 정보 생성
        const xcnt = this.xcnt = this.image.width / frameWidth;
        const ycnt = this.ycnt = this.image.height / frameHeight;
        this.frame = [];
        for(let i = 0 ; i < xcnt ; i++){

            if(!this.frame[i]){
                this.frame[i] = [];
            }
            for(let k = 0 ; k < ycnt ; k++){
                this.frame[i][k] = {offsetX:i*frameWidth, offsetY:k*frameHeight};
            }

        }

    }

    //그리기
    draw(ctx, x, y, frameX, frameY, rotate){

        //프레임 존재 체크
        if(!this.frame[frameX] || !this.frame[frameX][frameY]){
            throw new Error('이미지의 프레임 ('+frameX+','+frameY+') 이 존재하지 않습니다.  최대좌표 => ('+this.xcnt+','+this.ycnt+')');
        }

        //rotate 처리
        if(rotate !== undefined){
            ctx.save();
            ctx.scale(rotate, 1);
        }else{
            rotate = 1;
        }

        //이미지 그리기
        ctx.drawImage(
            this.image, 
            this.frame[frameX][frameY].offsetX, 
            this.frame[frameX][frameY].offsetY, 
            this.frameWidth, 
            this.frameWidth, 
            rotate*Math.floor(x), 
            Math.floor(y), 
            this.scaleWidth, 
            this.scaleHeight
        );

        //rotate 복귀
        if(rotate !== undefined) ctx.restore();

    }

}

Sprite.prototype.clearImageCache = ()=>{
    imageCache = {};
}

export default Sprite;