import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"

import keyControl from "@/game/object/player/control/keyboard.js"
class Turtle extends AbstractObject{

    //생성자
    constructor(info){

        super(info);

        //컨트롤방식
        this.controller = 1; //0:키보드, 1:마우스

        //정지/이동 애니메이션
        this.animation.pose = new Animation('turtle.js', 'pose');
        
    }

    //계산
    calc(ctx, gapTime, keyInput){

        //action : 이동
        if(this.action == 1){

            //키보드 컨트롤
            if(this.controller === 0){

                this.calcKeyMove(gapTime, keyInput);

            }else{ //마우스 컨트롤

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

}

export default Turtle;