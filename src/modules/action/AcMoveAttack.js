import AcMove from "@/modules/action/AcMove";
class AcMoveAttack extends AcMove{

    constructor(targetObject){

        super(targetObject);
        
    }

    initSpeed() {
        
        //속도
        this.speed = this.targetObject.speed?this.targetObject.speed:20; //1초에 기본 120픽셀
        this.speedMs = this.speed / 1000; //ms 당 이동속도

    }

    moveSetup(targetX, targetY){

        this.status = 1; //실행중

        this.movex = targetX;
        this.movey = targetY;

        this.moveDisX = this.movex - this.targetObject.x;
        this.moveDisY = this.movey - this.targetObject.y;

        this.moveDirectionH = this.moveDisX > 0;
        this.moveDirectionV = this.moveDisY > 0;

        this.moveDis = this.$math.getDistance(this.moveDisX, this.moveDisY);

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

            this.targetObject.prevX = this.targetObject.x;
            this.targetObject.prevY = this.targetObject.y;
            this.targetObject.x = this.moveDirectionH == 1?Math.min(this.targetObject.x, this.movex):Math.max(this.targetObject.x, this.movex);
            this.targetObject.y = this.moveDirectionV == 1?Math.min(this.targetObject.y, this.movey):Math.max(this.targetObject.y, this.movey);

            //충돌체크
            if(this.$g.player != this.targetObject){

                for (let box of this.$g.player.collider.boxList) {
    
                    //me 의 충돌박스
                    for(let mybox of this.targetObject.collider.boxList){
    
                        if(this.$math.checkCrossBox(
                            box[0], box[1], box[2], box[3],
                            mybox[0], mybox[1], mybox[2], mybox[3],
                        )){
                            this.targetObject.x = this.targetObject.prevX;
                            this.targetObject.y = this.targetObject.prevY;
                            this.status = 0; //준비
                            break;
                        }
    
                    }
        
                }

            }else{

                // for (let mon of this.$g.monsters){

                //     for(let box of mon.collider.boxList) {
    
                //         //me 의 충돌박스
                //         for(let mybox of this.targetObject.collider.boxList){
        
                //             if(this.$math.checkCrossBox(
                //                 box[0], box[1], box[2], box[3],
                //                 mybox[0], mybox[1], mybox[2], mybox[3],
                //             )){
                //                 this.targetObject.x = this.targetObject.prevX;
                //                 this.targetObject.y = this.targetObject.prevY;
                //                 this.status = 0; //준비
                //                 return;
                //             }
        
                //         }

                //     }

                // }

            }

        }

        if(this.status !== 0 && this.movex == this.targetObject.x && this.movey == this.targetObject.y){

            this.status = 0; //준비

        }

    }

}

export default AcMoveAttack;