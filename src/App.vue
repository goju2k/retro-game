<template>

    <div ref="app" v-if="load">
        <GameManager></GameManager>
    </div>

</template>

<script>

import GameManager from '@/game/manager/GameManager.vue'

export default {
    name: 'App',
    components: {
        GameManager
    },
    created:function(){

        //우클릭 방지
        window.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
        });

        //global 환경변수
        window.__gglobal = {};
        window.setGlobalValue = (name, value)=>{
            window.__gglobal[name] = value;
        }
        window.getGlobalValue = (name)=>{
            return window.__gglobal[name];
        }
        
        //시작
        this.load = true;

    },
    data:function(){
        return {

            load : false,
            
            //px / sec
            moveSpeed : 100,

            SEC_1:1000,

            //이벤트처리 변수
            mousedownFlag : false,

            //타일 변수
            spBack : null,
            spBack2 : null,

            tileMap : [],

            //캐릭터 변수
            sp0 : null,
            sp1 : null,

            charx:0,
            chary:0,
            charAni:[500, 100],
            charTimePassed:0,
            charAniIdx:0,
            chardirection:1,

        }
    },
    computed:{
        scale(){
            if(this.$refs.can){
                return this.$refs.can.scaleValue;
            }else{
                return 1;
            }
        }
    },
    methods:{

        addObject(){
            
            if(!this.can){
                return;
            }
            
            //배경타일
            const x = this.$math.random(this.can.width - this.canvasConfig.rowpx);
            const y = this.$math.random(this.can.height - this.canvasConfig.colpx);
            
            this.objects.push([x, y]);

        },

        //==================
        // 반복호출영역
        //==================
        calcPx(moveSpeed, drawGapTime){
            return Math.floor(moveSpeed * drawGapTime / this.SEC_1);
        },
        drawObject(drawGapTime){

            //배경타일
            for(let i = 0 ; i < this.tileMap.length ; i++){

                for(let k = 0 ; k < this.tileMap[i].length ; k++){
                    
                    this['grassBack'+this.tileMap[i][k]].draw(this.ctx, i * 16, k * 16);
                    
                }

            }

            //캐릭터 이동
            if(this.charx <= 50){
                this.chardirection = -1;
            }else if(this.charx > 400){
                this.chardirection = 1;
            }

            this.charx = this.charx + (this.chardirection == 1?-2:+2);

            //캐릭터 그리기
            this['sp'+this.charAniIdx].draw(
                this.ctx,
                this.charx,
                this.chary,
                this.chardirection
            );

            this.charTimePassed += drawGapTime;
            
            if(this.charTimePassed > this.charAni[this.charAniIdx]){
                this.charTimePassed = 0;
                this.charAniIdx = this.charAniIdx == 0?1:0;
            }

            //폰트 테스트
            this.ctx.font = '16px DungGeunMo';
            this.ctx.fillText('폰트를 테스트합니다. Hi Hello World', 200, 200);

        },

        canvasDraw(ctx, can, drawGapTime){

            this.ctx = ctx;
            this.can = can;

            //클리어
            ctx.clearRect(-500, -500, can.width, can.height);

            //그리기
            this.drawObject(drawGapTime);

        }
        
    },
}
</script>

<style>
@font-face {
    font-family: "DungGeunMo";
    src: url("/neodgm.woff");
}

*{
    box-sizing: border-box;
    margin:0px;
}

body{
    padding:0px;
    margin:0px;    
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
}

div{
    padding:0px;
}
</style>