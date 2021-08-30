import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"

import math from "@/modules/util/math"
class Turtle extends AbstractObject{

    //생성자
    constructor(info){

        super(info);

        //정지/이동 애니메이션
        this.animation.pose = new Animation('turtle.js', 'pose');

        this.atkTarget = [-1,-1];

        this.thinkTime = 3000;
        this.thinkCurrTime = 0;

    }

    //계산
    calc(ctx, gapTime, keyInput){

        this.thinkCurrTime += gapTime;

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

    //그리기
    draw(ctx, gapTime, keyInput){

        this.animation.pose.play(ctx, gapTime, this.x, this.y);
        
    }

    //공격 목표설정
    setTarget(x, y){

        if(this.thinkCurrTime > this.thinkTime){
            this.thinkCurrTime = 0;
            this.thinkTime = 5000 + math.random(5000);
        }else{
            return;
        }
        
        if(this.atkTarget[0] == x && this.atkTarget[1] == y){
            return;
        }

        this.atkTarget[0] = x;
        this.atkTarget[1] = y;

        this.setMove(x, y);
        this.action = 1;
    }

}

export default Turtle;