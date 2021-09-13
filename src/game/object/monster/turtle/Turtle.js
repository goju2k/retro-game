import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"

import math from "@/modules/util/math"
class Turtle extends AbstractObject{

    //생성자
    constructor(info){

        super(info);

        //정지/이동 애니메이션
        this.animation.pose = new Animation('turtle.js', 'pose');

        //폭발
        this.animation.explo;

        this.atkTarget = [-1,-1];

        this.thinkTime = 1000 + this.$math.random(2000);
        this.thinkCurrTime = 0;
        this.noActionTime = 4000;
        this.noActionCurrTime = 4000;

        //시야 반경 (반지름)
        this.visibleRadius = 60;
        this.updateVisible(); //시야 위치 업데이트

        //충돌박스 offset 설정
        this.colliderOffset = {
            boxList:[
                [6, 1, 22, 30]
            ],
        }

        //충돌박스 업데이트
        this.updateCollider();

        //상태 상수
        this.STAT_READY = 0;
        this.STAT_MOVE = 1;
        this.STAT_FIND_ENEMY = 2;
        this.STAT_HIT = 3;

        //상태
        this.status = this.STAT_READY;

        //속도 초기화
        this.setSpeed(50);

    }

    //계산
    calc(ctx, gapTime, keyInput){

        //체력 없으면 1초후 사라짐
        if(this.life == 0){

            if(!this.deadTime){
                this.deadTime = gapTime;
            }else{
                this.deadTime += gapTime;
            }

            if(this.deadTime >= 1000){
                this.$g.monsters.splice(this.$g.monsters.indexOf(this), 1);
            }

            return;
        }

        this.thinkCurrTime += gapTime;
        this.action == 0 ? this.noActionCurrTime += gapTime : null;
        
        //피격시
        if (this.status == this.STAT_HIT) {
            
            if (this.action == 1) {
                
                //이동 계산
                this.currAction.calc(gapTime);

                //시야 위치 업데이트
                this.updateVisible()
                
                //충돌박스 업데이트
                this.updateCollider();

                if (this.currAction.status == 0) {

                    this.animation.pose.setAnimation('pose');
                    this.action = 0;
                    this.status = this.STAT_READY;
                    this.setSpeed(50); //속도원래대로

                } else {

                    this.currAction.moveDirectionH!=1
                        ?this.animation.pose.setAnimation('hit_right')
                        :this.animation.pose.setAnimation('hit_left');
                    
                }

            }

        } else {

            //생각중...
            this.think();

            //action : 이동
            if(this.action == 1){
    
                //이동 계산
                this.currAction.calc(gapTime);
    
                //시야 위치 업데이트
                this.updateVisible()
                
                //충돌박스 업데이트
                this.updateCollider();
    
                //이동 애니메이션 결정
                if(this.currAction.status == 0){
                    this.animation.pose.setAnimation('pose');
                    this.action = 0;
                    this.status = this.STAT_READY;
                    this.setSpeed(50); //속도원래대로
                }else{
                    if(this.status == this.STAT_FIND_ENEMY){
                        this.currAction.moveDirectionH==1
                        ?this.animation.pose.setAnimation('run_right_fast')
                        :this.animation.pose.setAnimation('run_left_fast');
                    }else{
                        this.currAction.moveDirectionH==1
                        ?this.animation.pose.setAnimation('run_right')
                        :this.animation.pose.setAnimation('run_left');
                    }
                }

            }

        }

    }

    //공격 당했을때
    hit(obj) {

        if (this.status == this.STAT_HIT) {
            return;
        }
        
        super.hit(obj);

        //피격 상태
        this.status = this.STAT_HIT;

        //액션 좌표 설정
        this.setTarget(
            this.x + ((10 + this.$math.random(10)) * (this.x > obj.x?1:-1)),
            this.y
        );

        //날라가는 속도
        this.setSpeed(150);

    }

    //그리기
    draw(ctx, gapTime, keyInput){

        super.draw(ctx, gapTime, keyInput);

        //시야 반경 그리기
        if (false && this.action == 1) {

            ctx.beginPath();
            ctx.strokeStyle = this.status == 2?'red':'green';
            ctx.arc(this.visibleX, this.visibleY, this.visibleRadius, 0, this.$math.PI2);
            ctx.stroke();

            //이동목표 표현
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.moveTo(this.x + 16, this.y + 16);
            ctx.lineTo(this.atkTarget[0] + 16, this.atkTarget[1] + 16);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.arc(this.atkTarget[0] + 16, this.atkTarget[1] + 16, 2, 0, this.$math.PI2);
            ctx.fill();

        }
        
        if(this.life == 0){
            if(!this.animation.explo){
                this.animation.explo = new Animation('explosionLarge.js', 'exp')
            }
            this.animation.explo.play(ctx, gapTime, this.x - 16, this.y - 16);
        }else{
            this.animation.pose.play(ctx, gapTime, this.x, this.y);
        }
        
    }

    updateVisible(){
        this.visibleX = this.x + 15;
        this.visibleY = this.y + 15;
    }

    think(){

        //생각 인터벌 1초 + 알파
        if(this.thinkCurrTime > this.thinkTime){
            this.thinkCurrTime = 0;
            this.thinkTime = 170 + math.random(170);
        }else{
            return;
        }

        //적찾기
        for (let box of this.$g.player.collider.boxList) {
            
            if(this.$math.checkCrossBoxAndCircle(
                box[0], box[1], box[2], box[3],
                this.visibleX, this.visibleY, this.visibleRadius
            )){
                this.setTarget(this.$g.player.x, this.$g.player.y);
                this.status = this.STAT_FIND_ENEMY; //적발견
                this.setSpeed(70); //속도증가
                break;
            }

        }

        if (this.status != this.STAT_FIND_ENEMY && this.action == 0) {

            //로밍 인터벌
            if (this.noActionCurrTime > this.noActionTime) {
                
                this.noActionCurrTime = 0;
                this.noActionTime = 2000 + this.$math.random(3000);
                
                this.status = this.STAT_MOVE;
                this.setTarget(
                    32 + this.$math.random(this.$getMapData().width - 64),
                    32 + this.$math.random(this.$getMapData().height - 64),
                );

            }

        }

    }

    //이동 목표설정
    setTarget(x, y){

        if(this.atkTarget[0] == x && this.atkTarget[1] == y){
            return;
        }

        this.atkTarget[0] = x;
        this.atkTarget[1] = y;

        this.setMove(x, y, 1);
        this.action = 1;
    }

    setSpeed(speed) {
        this.speed = speed;
        this.actionObject[1].initSpeed();
    }

}

export default Turtle;