import BaseClass from "@/modules/base/BaseClass";

import AcMove from '@/modules/action/AcMove'

class AbstractObject extends BaseClass{

    //생성자
    constructor(info){

        super();

        //id
        this._uid = performance.now();

        //좌표
        this.x = 0;
        this.y = 0;

        //그리기
        this.active = true;

        //t-index : 2d 타일 상에서 그리기 순서 (Top -> Bottom 순서)
        this.tindex = 1;

        //z-index : 2d 맵에서 높이 인덱스
        this.zindex = 1;

        //충돌박스 설정
        this.colliderOffset = {
            boxList:[]
        };
        this.collider = {
            boxList:[]
        };

        //Sprites
        this.sprite = {};

        //animation
        this.animation = {};

        //status
        this.status = 0;
    
        if(info){
            Object.assign(this, info);
        }
        
        //액션
        this.action = 0;  //0:대기, 1:마우스이동
        if(!this.speed) this.speed = 140; //기본 스피드
        this.actionObject = {
            '1':new AcMove(this)
        };

        this.currAction;

    }

    setMove(targetX, targetY, action){

        this.action = action;
        this.currAction = this.actionObject[this.action];

        this.currAction.moveSetup(targetX, targetY);

    }

    updateCollider(){

        let i = 0;
        let box;
        for(let offset of this.colliderOffset.boxList){

            box = this.collider.boxList[i];
            if(!box){
                box = [];
                this.collider.boxList[i] = box;
            }

            box[0] = this.x + offset[0];
            box[1] = this.y + offset[1];
            box[2] = box[0] + offset[2];
            box[3] = box[1] + offset[3];

            i+=1;
            
        }

    }

    //계산
    calc(ctx, gapTime, keyInput){

    }

    //그리기
    draw(ctx, gapTime, keyInput){
        
    }

}

export default AbstractObject;