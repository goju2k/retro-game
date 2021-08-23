//BaseObject
//좌표를 가지는 Sprite 의 집합체
class BaseObject {

    //생성자
    constructor(ctx, config){

        //context
        this.ctx = ctx;

        //t-index : 2d 타일 상에서 그리기 순서 (Top -> Bottom 순서)
        this.tindex = 1;

        //z-index : 2d 맵에서 높이 인덱스
        this.zindex = 1;

        //충돌박스 설정
        this.collider = {
            boxList:[]
        };

        //Sprites
        this.spriteList = [];

        //animation
        this.animation = null;

        //parent object
        this.parent = null;
        
        if(config){
            Object.assign(this, config);
        }

    }

    //업데이트
    calc(gapTime){

    }

    //그리기
    draw(ctx){
        
    }

}