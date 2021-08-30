import BaseClass from "@/modules/base/BaseClass";

let imageCache = {};
window.imageCache = imageCache;
const getImage = async (imageSrc, thisObject, callback) => {

    if(!imageCache[imageSrc]){
        imageCache[imageSrc] = await createImage(imageSrc);
        //console.log('new image ', imageCache[imageSrc]);
    }else{
        //console.log('cache image ', imageCache[imageSrc]);
    }

    if(thisObject && callback){
        callback.call(thisObject, imageCache[imageSrc]);
    }

    return imageCache[imageSrc];
}

//이미지 생성
const createImage = async (imageSrc) => {
    const image = document.createElement('IMG');
    image.src = require('@/assets/img/'+imageSrc);
    await image.decode();
    imageCache[imageSrc] = image;
    return image;
}

//Sprite
//이미지 자원의 관리와 draw 기능을 제공
class Sprite extends BaseClass{

    //생성자
    constructor(imageSrc, frameWidth, frameHeight, scale){

        super();

        this.imageLoaded = false;

        const self = this;
        
        //이미지 로드 후처리
         getImage(imageSrc, this, (loadedImage)=>{

             //console.log(imageSrc+' loaded!!!');
            self.image = loadedImage;
    
            //프레임 처리
            if(!frameWidth) frameWidth = self.image.width;
            if(!frameHeight) frameHeight = self.image.height;
    
            //스케일 처리
            self.scale = scale?scale:1;
            self.scaleWidth = frameWidth * self.scale;
            self.scaleHeight = frameHeight * self.scale;
    
            //이미지 비율 점검
            self.frameWidth = frameWidth;
            self.frameHeight = frameHeight;
            if(self.image.width % frameWidth !== 0
            || self.image.height % frameHeight !== 0
            ){
                throw new Error('이미지의 프레임사이즈 비율이 맞지 않습니다.');
            }
    
            //프레임 정보 생성
            const xcnt = self.xcnt = self.image.width / frameWidth;
            const ycnt = self.ycnt = self.image.height / frameHeight;
            self.frame = [];
            for(let i = 0 ; i < xcnt ; i++){
    
                if(!self.frame[i]){
                    self.frame[i] = [];
                }
                for(let k = 0 ; k < ycnt ; k++){
                    self.frame[i][k] = {offsetX:i*frameWidth, offsetY:k*frameHeight};
                }
    
            }
    
            self.imageLoaded = true;

        });
        
    }

    //그리기
    draw(ctx, x, y, frameX, frameY, rotate){

        if(!this.imageLoaded) return;

        //프레임 존재 체크
        if(!this.frame[frameX] || !this.frame[frameX][frameY]){
            throw new Error('이미지의 프레임 ('+frameX+','+frameY+') 이 존재하지 않습니다.  최대좌표 => ('+this.xcnt+','+this.ycnt+')');
        }

        //디버그용 박스
        // ctx.strokeStyle = 'green';
        // ctx.strokeRect(Math.floor(x), Math.floor(y), this.scaleWidth, this.scaleHeight);

        //rotate 처리
        if(rotate !== undefined){
            ctx.save();
            ctx.scale(rotate, 1); //rotate 가 -1 이면 대칭
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
            rotate!=1?rotate*Math.floor(x) - this.scaleWidth:Math.floor(x), 
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
