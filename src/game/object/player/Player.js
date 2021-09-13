import AbstractObject from '@/modules/object/AbstractObject'
import Animation from "@/modules/draw/Animation"
import Sprite from "@/modules/draw/Sprite"

import keyControl from "@/game/object/player/control/keyboard.js"

import AcMoveAttack from '@/modules/action/AcMoveAttack'
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
        this.ACTION_ATTACK = 2;

        //액션 셋팅
        this.actionObject[this.ACTION_ATTACK] = new AcMoveAttack(this);
        
        //액션 스탯
        Object.defineProperty(this, 'attackRange', {
            get: function () {
                return this.attackRangeVal;
            },
            set: function (val) {
                this.attackRangeVal = val;
                this.actionObject[this.ACTION_ATTACK].attackRange = this.attackRangeVal;
            }
        });
        this.attackRange = 20;
        this.attackPower = 30;
        this.attackEnd = true;

        //효과
        this.effectRes = {
            0:'explosion.js'
        }

        this.effectList = [];

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
                    //this.animation.pose.setAnimation('attack_right');
                    
                    this.action = this.ACTION_READY;

                }else{

                    this.currAction.moveDirectionH==1?this.animation.pose.setAnimation('run_right'):this.animation.pose.setAnimation('run_left');

                }

            }else if(this.action == this.ACTION_ATTACK){
                
                //이동 계산
                this.currAction.calc(gapTime, this.attackEnd);

                //공격중이면..
                if (this.currAction.status == 2
                ||  (
                        (    this.animation.pose.currAni.name == 'attack_right'
                        ||  this.animation.pose.currAni.name == 'attack_left')
                        &&  this.animation.pose.currFrameNo != 0
                    )
                ) {

                    this.attackEnd = false;

                    //공격 애니메이션 결정
                    this.currAction.moveDirectionH==1?this.animation.pose.setAnimation('attack_right'):this.animation.pose.setAnimation('attack_left');

                    //2번째 프레임일때 공격
                    if(this.animation.pose.currFrameNo == 1 && this.currAction.enemyList && this.currAction.enemyList.length > 0){

                        if(!this.attackFlag){
                            this.attackFlag = true;
                            for(let enemy of this.currAction.enemyList){
                                if(enemy.status == enemy.STAT_HIT){
                                    continue;
                                }
                                enemy.hit(this);
                                this.effectList.push({res:0,frame:'exp', x:enemy.x + 10 - this.$math.random(20)  , y:enemy.y - (50 - this.$math.random(20))});
                            }
                        }

                    }else{
                        this.attackFlag = false;
                    }

                } else {

                    this.attackEnd = true;

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

    }

    //그리기
    draw(ctx, gapTime, keyInput){

        this.animation.pose.play(ctx, gapTime, this.x, this.y);
        if(this.action == this.ACTION_MOVE){
            this.animation.arrow.play(ctx, gapTime, this.currAction.movex, this.currAction.movey + 16);
        } else if(this.action == this.ACTION_ATTACK) {
            ctx.beginPath();
            ctx.strokeStyle = 'orange';
            ctx.arc(this.currAction.attackRangeX, this.currAction.attackRangeY, this.attackRange, 0, this.$math.PI2);
            ctx.stroke();
        }

        //이펙트
        for(let effect of this.effectList){

            if(effect.ani){
                if(!effect.ani.playing){
                    this.effectList.splice(this.effectList.indexOf(effect), 1);
                    continue;
                }
            }else{
                effect.ani = new Animation(this.effectRes[effect.res], effect.frame);
            }
            
            effect.ani.play(ctx, gapTime, effect.x, effect.y);

        }

    }

    //이벤트
    mousedown(e){

        if(this.controller == 1){ //마우스 컨트롤일때...

            if(e.button === 2){ //우클릭

                //키 상태 제거
                this.keyA = false;

                this.animation.arrow.setAnimation('position', true);
                this.setMove(e.x - 15, e.y - 32, this.ACTION_MOVE);

            }else if(e.button === 0){ //좌클릭

                if(this.keyA){
                    
                    //키 상태 제거
                    this.keyA = false;

                    //공격 설정
                    this.setMove(e.x - 15, e.y - 32, this.ACTION_ATTACK);
                    
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