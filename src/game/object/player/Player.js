import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"
import Sprite from "@/modules/draw/Sprite"

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
        this.sprite.attackArrow = new Sprite(
            'effect/arrow/attack-arrow.png',
            16,
            16,
        )
        
        //키보드컨트롤 주입
        if(this.controller === 0){
            Object.assign(this, keyControl);
        }

        //충돌박스 offset 설정
        this.colliderOffset = {
            boxList:[
                [6, 1, 22, 30]
            ],
        }

        //충돌박스 업데이트
        this.updateCollider();

        //키 이벤트 상태
        this.KEY_ACTIONS = 'a,q,w,e,r'
        this.keyA = false;

        //상태 상수
        this.STAT_READY = 0;
        this.STAT_ATTACK = 1;

        //액션 상수
        this.ACTION_READY = 0;
        this.ACTION_MOVE = 1;

    }

    //계산
    calc(ctx, gapTime, keyInput){

        //키보드 컨트롤
        if(this.controller === 0){

            //키 이동 체크
            this.calcKeyMove(gapTime, keyInput);

        }else{ //마우스 컨트롤

            //action : 이동
            if(this.action == this.ACTION_MOVE){

                //이동 계산
                this.currAction.calc(gapTime);
                
                //충돌박스 업데이트
                this.updateCollider();

                //이동 애니메이션 결정
                if(this.currAction.status == this.STAT_READY){
                    this.animation.pose.setAnimation('pose');
                    this.action = this.ACTION_READY;
                }else{
                    this.currAction.moveDirectionH==1?this.animation.pose.setAnimation('run_right'):this.animation.pose.setAnimation('run_left');
                }

            }

        }

    }

    //그리기
    draw(ctx, gapTime, keyInput){

        this.animation.pose.play(ctx, gapTime, this.x, this.y);
        if(this.action == this.ACTION_MOVE){
            this.animation.arrow.play(ctx, gapTime, this.currAction.movex, this.currAction.movey + 16);
        }
        
    }

    //이벤트
    mousedown(e){

        if(this.controller == 1){ //마우스 컨트롤일때...

            if(e.button === 2){ //우클릭

                //키 상태 제거
                this.keyA = false;

                this.animation.arrow.setAnimation('position', true);
                this.setMove(e.x - 15, e.y - 32);

            }else if(e.button === 0){ //좌클릭

                if(this.keyA){
                    
                    //키 상태 제거
                    this.keyA = false;

                    //공격 설정
                    
                }

            }

        }

    }

    keydown(e){

        if(this.KEY_ACTIONS.indexOf(e.key) >= 0){
            this.keyA = true;
        }

    }

}

export default Player;