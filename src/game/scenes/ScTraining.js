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
        this.speedMs = this.speed / 1000; //ms 당 이동속도

        this.action = 0;  //0:키보드이동, 1:마우스이동
        
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
        
        this.ani = new Animation('player.js', 'pose');

        this.background = new Sprite('map/rhombus-square-bg.png');

    }

    calc(ctx, gapTime, keyInput){

        if(this.action == 0){ //키보드이동

            const deltaDistance = this.calcMove(gapTime);
            const deltaDistance2 = deltaDistance * Math.SQRT1_2;
            //우상단
            if(keyInput.up && keyInput.right){
                // this.ani.initAnimation('run_up_right');
                this.ani.initAnimation('run_right');
                this.x += deltaDistance2;
                this.y -= deltaDistance2;
            }
            //좌상단
            else if(keyInput.up && keyInput.left){
                // this.ani.initAnimation('run_up_left');
                this.ani.initAnimation('run_left');
                this.x -= deltaDistance2;
                this.y -= deltaDistance2;
            }
            //우하단
            else if(keyInput.down && keyInput.right){
                // this.ani.initAnimation('run_down_right');
                this.ani.initAnimation('run_right');
                this.x += deltaDistance2;
                this.y += deltaDistance2;
            }
            //좌하단
            else if(keyInput.down && keyInput.left){
                // this.ani.initAnimation('run_down_left');
                this.ani.initAnimation('run_left');
                this.x -= deltaDistance2;
                this.y += deltaDistance2;
            }
            //위
            else if(keyInput.up){
                // this.ani.initAnimation('run_up');
                this.ani.initAnimation(this.ani.currAni.name=='run_right'?'run_right':'run_left');
                this.y -= deltaDistance;
            }
            //아래
            else if(keyInput.down){
                // this.ani.initAnimation('run_down');
                this.ani.initAnimation(this.ani.currAni.name=='run_right'?'run_right':'run_left');
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

        }else if(this.action == 1){ //마우스이동

            this.moveCurrDis = this.speedMs * gapTime;
            
            this.currDisRatio = this.moveCurrDis / this.moveDis;

            this.moveToX = this.moveDisX * this.currDisRatio;
            this.moveToY = this.moveDisY * this.currDisRatio;

            if((this.moveToX > 0 && this.x < this.movex)
            || (this.moveToX < 0 && this.x > this.movex)
            ){
                this.x += this.moveToX;
            }else{
                this.moveToX = 0;
            }

            if((this.moveToY > 0 && this.y < this.movey)
            || (this.moveToY < 0 && this.y > this.movey)
            ){
                this.y += this.moveToY;
            }else{
                this.moveToY = 0;
            }

            if(this.movex == 0 && this.movey == 0){
                this.x = this.movex;
                this.y = this.movey;
            }else{
                this.x = this.moveDirectionH == 1?Math.min(this.x, this.movex):Math.max(this.x, this.movex);
                this.y = this.moveDirectionV == 1?Math.min(this.y, this.movey):Math.max(this.y, this.movey);
            }

            if(this.movex == this.x && this.movey == this.y){
                this.ani.initAnimation('pose');
                this.action = 0;
            }else{
                this.moveDirectionH==1?this.ani.initAnimation('run_right'):this.ani.initAnimation('run_left');
            }

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

        this.log('mousedown', e);

        if(e.button == 2){
            this.action = 1;
            this.movex = e.x - 16;
            this.movey = e.y - 16;
    
            this.moveDisX = this.movex - this.x;
            this.moveDisY = this.movey - this.y;
    
            this.moveDirectionH = this.moveDisX > 0;
            this.moveDirectionV = this.moveDisY > 0;
    
            this.moveDis = Math.sqrt(Math.pow(Math.abs(this.moveDisX), 2) + Math.pow(Math.abs(this.moveDisY), 2));
        }

    }
    keydown(e){
        //this.log('keydown', e);
        this.action = 0;
    }

}

export default ScTraining;