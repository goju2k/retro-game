import BaseClass from "@/modules/base/BaseClass";

class AbstractScene extends BaseClass{
    
    //생성자
    constructor(status){

        super();
        
        //상태객체
        this.status = status || {};

        //이름
        this.name = this.status.name || 'unknown scene'

        //캐시용 off캔버스 (배경 등등..)
        this.offctx = {};

        //offcan name for map
        this.offCtxMapName = 'map';

        //초기화
        this.init(this.status);

    }

    createOffCanvas(name, width, height){

        if(this.offctx[name]){
            return;
        }

        const can = document.createElement('canvas');
        can.width = width;
        can.height = height;
        can.style.zIndex = '1'
        can.style.position = 'absolute';
        can.style.border = '1px solid black'
        
        
        const ctx = can.getContext('2d');
        //ctx.scale(this.$g.scaleX, this.$g.scaleY);
            
        //image scale option
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        this.offctx[name] = {
            can:can,
            ctx:ctx,
        }

    }

    getOffCanvas(name){
        return this.offctx[name];
    }

    //초기화
    init(status){
        this.log('init', status);
    }

    //계산
    calc(ctx, gapTime, keyInput){
        //this.log('calc');
    }

    //그리기
    draw(ctx, gapTime, keyInput){
        //this.log('draw');
    }

    //맵 초기화
    initMap(){

        this.createOffCanvas(this.offCtxMapName, this.$getMapData().width, this.$getMapData().height);
        
        const mapSection = this.$getMap();
        const ctx = this.getOffCanvas(this.offCtxMapName).ctx;

        ctx.clearRect(0, 0, this.$getMapData().width, this.$getMapData().height);

        for(let mapRow of mapSection){

            for(let mapCol of mapRow){

                mapCol.sprite.draw(ctx, mapCol.x, mapCol.y, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x + 16, mapCol.y, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x, mapCol.y + 16, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x + 16, mapCol.y + 16, mapCol.frame[0], mapCol.frame[1]);

            }

        }

    }

    //맵 그리기
    drawMap(ctx, gapTime, keyInput){

        ctx.drawImage(this.getOffCanvas(this.offCtxMapName).can, 0, 0);

    }

    log(){
        console.log('[SCENE '+this.name+'] ', ...arguments);
    }

}

export default AbstractScene;