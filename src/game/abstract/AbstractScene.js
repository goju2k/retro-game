class AbstractScene {
    
    //생성자
    constructor(){
        
        this.name = 'unknown scene'

    }

    //계산
    calc(){
        this.log('[scene] calc');
    }

    //그리기
    draw(){
        this.log('draw');
    }

    log(obj){
        console.log('[SCENE '+this.name+'] '+obj);
    }

}

export default AbstractScene;