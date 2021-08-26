import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
import Animation from "@/modules/draw/Animation"
class ScTraining extends AbstractScene{
    
    //생성자
    constructor(status){

        //super
        super(status);
        
        //임시 좌표
        this.x = 64;
        this.y = 64;
        this.speed = 140; //1초에 100픽셀
        
        this.ani = new Animation('player.js', 'pose');

        this.background = new Sprite('map/rhombus-square-bg.png');

    }

    calc(ctx, gapTime, keyInput){

        const deltaDistance = this.calcMove(gapTime);
        const deltaDistance2 = deltaDistance * Math.SQRT1_2;
        
        //우상단
        if(keyInput.up && keyInput.right){
            this.ani.initAnimation('run_up_right');
            this.x += deltaDistance2;
            this.y -= deltaDistance2;
        }
        //좌상단
        else if(keyInput.up && keyInput.left){
            this.ani.initAnimation('run_up_left');
            this.x -= deltaDistance2;
            this.y -= deltaDistance2;
        }
        //우하단
        else if(keyInput.down && keyInput.right){
            this.ani.initAnimation('run_down_right');
            this.x += deltaDistance2;
            this.y += deltaDistance2;
        }
        //좌하단
        else if(keyInput.down && keyInput.left){
            this.ani.initAnimation('run_down_left');
            this.x -= deltaDistance2;
            this.y += deltaDistance2;
        }
        //위
        else if(keyInput.up){
            this.ani.initAnimation('run_up');
            this.y -= deltaDistance;
        }
        //아래
        else if(keyInput.down){
            this.ani.initAnimation('run_down');
            this.y += deltaDistance;
        }
        //오른쪽
        else if(keyInput.right){
            this.ani.initAnimation('run_right');
            this.x += deltaDistance;
        }
        //왼쪽
        else if(keyInput.left){
            this.ani.initAnimation('run_left');
            this.x -= deltaDistance;
        }
        //정지
        else{
            this.ani.initAnimation('pose');
        }

    }

    draw(ctx, gapTime, keyInput){
        
        this.background.draw(ctx, 0, 0, 0, 0);

        this.ani.play(ctx, gapTime, this.x, this.y);
        
    }

    //player 임시메소드
    calcMove(gapTime){
        return Math.floor(gapTime * this.speed / 1000);
    }

    mousedown(e){
        //this.log('mousedown', e);
    }
    keydown(e){
        //this.log('keydown', e);
    }

}

export default ScTraining;