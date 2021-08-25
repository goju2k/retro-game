import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
import Animation from "@/modules/draw/Animation"
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
        );

        this.spriteMove2 = new Sprite(
            'object/player/move.png',
            32,
            32,
        );

        //임시 프레임번호
        this.framePos = [0,0];

        this.ani = new Animation('player.js', 'run_top');

    }

    draw(ctx, gapTime){

        // this.spriteMove.draw(ctx, 128, 128, this.framePos[0], this.framePos[1]);
        
        // this.spriteMove2.draw(ctx, 256, 256, this.framePos[0], this.framePos[1]);

        this.ani.play(ctx, gapTime, 64, 64);

    }

    mousedown(e){
        this.log('mousedown', e);
    }
    keydown(e){
        this.log('keydown', e);

        if(e.key == 'ArrowUp' && this.framePos[1] > 0){
            this.framePos[1] = this.framePos[1] - 1;
        }else if(e.key == 'ArrowDown' && this.framePos[1] < this.spriteMove.ycnt - 1){
            this.framePos[1] = this.framePos[1] + 1;
        }else if(e.key == 'ArrowLeft' && this.framePos[0] > 0){
            this.framePos[0] = this.framePos[0] - 1;
        }else if(e.key == 'ArrowRight' && this.framePos[0] < this.spriteMove.xcnt - 1){
            this.framePos[0] = this.framePos[0] + 1;
        }

    }

}

export default ScTraining;