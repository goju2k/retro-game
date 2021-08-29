import math from "@/modules/util/math";

class AcMove {

    constructor(targetObject){
        
        //속도
        this.speed = targetObject.speed?targetObject.speed:140; //1초에 기본 140픽셀
        this.speedMs = this.speed / 1000; //ms 당 이동속도

        //중간변수
        this.movex = 0; //이동 목표 x
        this.movey = 0; //이동 목표 y
        this.moveDis = 0; //이동할 거리
        this.moveDisX = 0; //이동할 거리 x
        this.moveDisY = 0; //이동할 거리 y
        this.moveCurrDis = 0; //현재 이동중인 거리
        this.currDisRatio = 0; //현재 이동거리 비율
        this.moveToX = 0; //이동할 x좌표
        this.moveToY = 0; //이동할 y좌표
        this.moveDirection = 0; //0:left 1:right

        //상태
        this.status = 0; // 0:준비 1:실행중

        //대상 object
        this.targetObject = targetObject;
        
    }

    moveSetup(targetX, targetY){

        this.status = 1; //실행중

        this.movex = targetX;
        this.movey = targetY;

        this.moveDisX = this.movex - this.targetObject.x;
        this.moveDisY = this.movey - this.targetObject.y;

        this.moveDirectionH = this.moveDisX > 0;
        this.moveDirectionV = this.moveDisY > 0;

        this.moveDis = math.getDistance(this.moveDisX, this.moveDisY);

    }

    calc(gapTime){

        this.moveCurrDis = this.speedMs * gapTime;
            
        this.currDisRatio = this.moveCurrDis / this.moveDis;

        this.moveToX = this.moveDisX * this.currDisRatio;
        this.moveToY = this.moveDisY * this.currDisRatio;

        if((this.moveToX > 0 && this.targetObject.x < this.movex)
        || (this.moveToX < 0 && this.targetObject.x > this.movex)
        ){
            this.targetObject.x += this.moveToX;
        }else{
            this.moveToX = 0;
        }

        if((this.moveToY > 0 && this.targetObject.y < this.movey)
        || (this.moveToY < 0 && this.targetObject.y > this.movey)
        ){
            this.targetObject.y += this.moveToY;
        }else{
            this.moveToY = 0;
        }

        if(this.movex == 0 && this.movey == 0){
            this.targetObject.x = this.movex;
            this.targetObject.y = this.movey;
        }else{
            this.targetObject.x = this.moveDirectionH == 1?Math.min(this.targetObject.x, this.movex):Math.max(this.targetObject.x, this.movex);
            this.targetObject.y = this.moveDirectionV == 1?Math.min(this.targetObject.y, this.movey):Math.max(this.targetObject.y, this.movey);
        }

        if(this.movex == this.targetObject.x && this.movey == this.targetObject.y){

            this.status = 0; //준비

        }

    }

}

export default AcMove;