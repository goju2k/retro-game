import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"

import keyControl from "@/game/object/player/control/keyboard.js"
class Player extends AbstractObject{

    //생성자
    constructor(info){

        super(info);

        //이동 컨트롤방식
        this.controller = 1; //0:키보드, 1:마우스

        //정지/이동 애니메이션
        this.animation.pose = new Animation('player.js', 'pose');
        this.animation.arrow = new Animation('positionArrow.js'); 
        
        //키보드컨트롤 주입
        Object.assign(this, keyControl);

    }

    //계산
    calc(ctx, gapTime, keyInput){

        //키보드 컨트롤
        if(this.controller === 0){

            //키 이동 체크
            this.calcKeyMove(gapTime, keyInput);

        }else{ //마우스 컨트롤

            //action : 이동
            if(this.action == 1){

                //이동 계산
                this.currAction.calc(gapTime);

                //이동 애니메이션 결정
                if(this.currAction.status == 0){
                    this.animation.pose.setAnimation('pose');
                    this.action = 0;
                }else{
                    this.currAction.moveDirectionH==1?this.animation.pose.setAnimation('run_right'):this.animation.pose.setAnimation('run_left');
                }

            }

        }

    }

    //그리기
    draw(ctx, gapTime, keyInput){

        this.animation.pose.play(ctx, gapTime, this.x, this.y);
        if(this.action == 1){
            this.animation.arrow.play(ctx, gapTime, this.currAction.movex, this.currAction.movey + 16);
        }

    }

    //이벤트
    mousedown(e){

        if(this.controller == 1){ //마우스 컨트롤일때...

            if(e.button == 2){
                this.animation.arrow.setAnimation('position', true);
                this.setMove(e.x - 15, e.y - 32);
            }

        }

    }

}

export default Player;