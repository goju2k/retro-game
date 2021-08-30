import BaseClass from "@/modules/base/BaseClass";

class AbstractScene extends BaseClass{
    
    //생성자
    constructor(status){

        super();
        
        //상태객체
        this.status = status || {};

        //이름
        this.name = this.status.name || 'unknown scene'

        //초기화
        this.init(this.status);

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

    //맵 그리기
    drawMap(ctx, gapTime, keyInput){

        const mapSection = this.$getMap();

        for(let mapRow of mapSection){

            for(let mapCol of mapRow){

                mapCol.sprite.draw(ctx, mapCol.x, mapCol.y, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x + 16, mapCol.y, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x, mapCol.y + 16, mapCol.frame[0], mapCol.frame[1]);
                mapCol.sprite.draw(ctx, mapCol.x + 16, mapCol.y + 16, mapCol.frame[0], mapCol.frame[1]);

            }

        }

    }

    log(){
        //if(!window.getGlobalValue('SceneLogEnable')) return;
        console.log('[SCENE '+this.name+'] ', ...arguments);
    }

}

export default AbstractScene;