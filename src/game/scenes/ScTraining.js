import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
class ScTraining extends AbstractScene{
    
    //생성자
    constructor(status){

        //super
        super(status);

        //스프라이트 테스트
        this.spriteMove = new Sprite(
            'object/player/move.png',
            32,
            32,
            1
        );

    }

    draw(ctx){

        this.spriteMove.draw(ctx, 100, 200, 2, 2);

    }

}

export default ScTraining;