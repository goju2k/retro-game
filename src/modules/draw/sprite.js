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
    image.src = require('@/assets/'+imageSrc);
    imageCache[imageSrc] = image;
    return image;
}

//Sprite
//이미지 자원의 관리와 draw 기능을 제공
class Sprite {

    //생성자
    constructor(imageSrc, scale){
        this.image = getImage(imageSrc);
        this.scale = scale?scale:1;
        this.scaleWidth = this.image.width * this.scale;
        this.scaleHeight = this.image.height * this.scale;
    }

    //그리기
    draw(ctx, x, y, rotate){

        if(rotate !== undefined){
            ctx.save();
            ctx.scale(rotate, 1);
        }else{
            rotate = 1;
        }

        if(this.scale != 1){
            ctx.drawImage(this.image, rotate*Math.floor(x), Math.floor(y), this.scaleWidth, this.scaleHeight);
        }else{
            ctx.drawImage(this.image, rotate*Math.floor(x), Math.floor(y));
        }
        if(rotate !== undefined) ctx.restore();

    }

}

Sprite.prototype.clearImageCache = ()=>{
    imageCache = {};
}

export default Sprite;