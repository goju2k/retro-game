const control = {

    calcKeyMove(gapTime, keyInput){

        if(!keyInput.keydown){
            this.animation.pose.setAnimation('pose');
            return;
        }

        const deltaDistance = this.calcMove(gapTime);
        const deltaDistance2 = deltaDistance * Math.SQRT1_2;

        //console.log(deltaDistance, deltaDistance2);

        //우상단
        if(keyInput.up && keyInput.right){
            // this.animation.pose.setAnimation('run_up_right');
            this.animation.pose.setAnimation('run_right');
            this.x += deltaDistance2;
            this.y -= deltaDistance2;
        }
        //좌상단
        else if(keyInput.up && keyInput.left){
            // this.animation.pose.setAnimation('run_up_left');
            this.animation.pose.setAnimation('run_left');
            this.x -= deltaDistance2;
            this.y -= deltaDistance2;
        }
        //우하단
        else if(keyInput.down && keyInput.right){
            // this.animation.pose.setAnimation('run_down_right');
            this.animation.pose.setAnimation('run_right');
            this.x += deltaDistance2;
            this.y += deltaDistance2;
        }
        //좌하단
        else if(keyInput.down && keyInput.left){
            // this.animation.pose.setAnimation('run_down_left');
            this.animation.pose.setAnimation('run_left');
            this.x -= deltaDistance2;
            this.y += deltaDistance2;
        }
        //위
        else if(keyInput.up){
            // this.animation.pose.setAnimation('run_up');
            this.animation.pose.setAnimation(this.animation.pose.currAni.name=='run_right'?'run_right':'run_left');
            this.y -= deltaDistance;
        }
        //아래
        else if(keyInput.down){
            // this.animation.pose.setAnimation('run_down');
            this.animation.pose.setAnimation(this.animation.pose.currAni.name=='run_right'?'run_right':'run_left');
            this.y += deltaDistance;
        }
        //오른쪽
        else if(keyInput.right){
            this.animation.pose.setAnimation('run_right');
            this.x += deltaDistance;
        }
        //왼쪽
        else if(keyInput.left){
            this.animation.pose.setAnimation('run_left');
            this.x -= deltaDistance;
        }
        //정지
        else{
            this.animation.pose.setAnimation('pose');
        }

        //충돌박스 업데이트
        this.updateCollider();

    },
    
    //player 임시메소드
    calcMove(gapTime){
        //console.log('this.speed',this.speed)
        return Math.floor(gapTime * this.speed / 1000);
    }

}
export default control;