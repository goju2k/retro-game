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

        //시야 반경 (반지름)
        this.visibleRadius = 100;
        this.updateVisible(); //시야 위치 업데이트

        //충돌박스 offset 설정
        this.colliderOffset = {
            boxList:[
                [6, 1, 22, 30]
            ],
        }

        //충돌박스 업데이트
        this.updateCollider();

        //상태
        this.status = 0;

        console.log("this.$getMapData()", this.$getMapData());
        console.log("this.$getMap()", this.$getMap());
        
    }

    //계산
    calc(ctx, gapTime, keyInput){

        this.thinkCurrTime += gapTime;

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
                this.status = 0;
            }else{
                this.currAction.moveDirectionH==1?this.animation.pose.setAnimation('run_right'):this.animation.pose.setAnimation('run_left');
            }

        }

    }

    //그리기
    draw(ctx, gapTime, keyInput){

        this.animation.pose.play(ctx, gapTime, this.x, this.y);

        //시야 반경 그리기
        ctx.beginPath();
        ctx.strokeStyle = this.status == 2?'red':'lightgreen';
        ctx.arc(this.visibleX, this.visibleY, this.visibleRadius, 0, this.$math.PI2);
        ctx.stroke();
        
    }

    updateVisible(){
        this.visibleX = this.x + 15;
        this.visibleY = this.y + 15;
    }

    think(){

        //생각 인터벌 1초 + 알파
        if(this.thinkCurrTime > this.thinkTime){
            this.thinkCurrTime = 0;
            this.thinkTime = 500;// + math.random(1000);
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
                this.status = 2; //적발견
                break;
            }

        }

        if (this.status != 2 && this.action == 0) {
            this.status = 1;
            this.setTarget(
                this.$math.random(this.$getMapData().width),
                this.$math.random(this.$getMapData().height),
            );
        }

    }

    //이동 목표설정
    setTarget(x, y){

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