class AbstractScene {
    
    //생성자
    constructor(status){
        
        //이름
        this.name = 'unknown scene'

        //상태객체
        this.status = status || {};

        //초기화
        this.init(this.status);

    }

    //초기화
    init(status){
        this.log('init', status);
    }

    //계산
    calc(gapTime){
        this.log('calc');
    }

    //그리기
    draw(ctx){
        this.log('draw');
    }

    log(){
        if(!window.getGlobalValue('SceneLogEnable')) return;
        console.log('[SCENE '+this.name+'] ', ...arguments);
    }

}

export default AbstractScene;