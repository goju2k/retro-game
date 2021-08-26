import Sprite from "@/modules/draw/Sprite"
class Animation {

    //생성자
    constructor(dataSrc, initAnimationName){

        //메타데이터 로드
        const aniMeta = require('@/assets/data/animation/'+dataSrc).default;

        //스프라이트 목록 구성
        this.spriteMap = {};
        let tempSpriteData;
        let tempSprite;
        for(let spriteName in aniMeta.spriteMap){

            tempSpriteData = aniMeta.spriteMap[spriteName];
            tempSprite = new Sprite(
                tempSpriteData.src,
                tempSpriteData.w,
                tempSpriteData.h,
                tempSpriteData.scale,
            );

            this.spriteMap[spriteName] = tempSprite;

        }

        //애니메이션 정보
        this.animationMap = aniMeta.def;

        //실행관련 변수
        this.playing = true;
        this.gapTime = 0; //지난 시간 변수
        this.loopCnt = 0; //반복된 횟수
        this.currDelay = 0; //현재 프레임의 지연(재생시간)
        this.currAni = null; //현재 재생 애니메이션
        this.currSprite = null; //현재 대상 스프라이트
        this.currFrame = null; //현재 재생 프레임

        //초기 애니메이션 지정
        if(initAnimationName){
            this.initAnimation(initAnimationName);
        }

    }

    initAnimation(aniName){

        this.loopCnt = 0; //반복된 횟수
        this.currAni = this.animationMap[aniName]; //현재 재생 애니메이션
        this.currSprite = this.spriteMap[this.currAni.map]; //현재 대상 스프라이트
        
        this.setNextFrame(0); //0번 프레임 셋팅

    }

    setNextFrame(frameNo){

        if(frameNo === undefined){

            frameNo = this.currAni.frames.indexOf(this.currFrame) + 1;

            //마지막 프레임이면
            if(frameNo === this.currAni.frames.length){

                //반복수 도달시 종료
                if(this.currAni.loopCnt > 0 && this.loopCnt == this.currAni.loopCnt){
                    this.pause(true);
                    return;
                }
                
                //반복수 지정되어 있는경우만 증가
                if(this.currAni.loopCnt > 0){
                    this.loopCnt += 1;
                }
                
                //첫 프레임으로
                frameNo = 0;

            }

        }

        this.currFrame = this.currAni.frames[frameNo]; //현재 재생 프레임
        this.currDelay = this.currFrame.delay?this.currFrame.delay:this.currAni.delay;

    }

    play(ctx, gapTime, x, y){
        //console.log('this.gapTime=>'+gapTime);
        if(!this.playing){
            return;
        }

        //현재 프레임 draw
        this.currSprite.draw(ctx, x, y, this.currFrame.pos[0], this.currFrame.pos[1], this.currFrame.flipX);

        ctx.fillStyle = 'red';
        ctx.font = '11px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji';
        ctx.fillText('no:'+this.currAni.frames.indexOf(this.currFrame), x, y);

        //gap 누적
        if(this.currAni.frames.length > 1){

            this.gapTime += gapTime;
            if(this.gapTime >= this.currDelay){

                //console.log('gap:', this.gapTime)
                
                this.gapTime = this.gapTime % this.currDelay; //지난 시간 변수

                this.setNextFrame();

                //console.log('gap 보정:'+this.gapTime)

            }

        }

    }

    pause(flag){
        this.playing = !flag;
    }

}

export default Animation;