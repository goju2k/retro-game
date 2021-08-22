<template>

    <div ref="app" v-if="load" style="width:100%;height:100%;border:1px solid red;">
        
        <can ref="can" :config="canvasConfig" :callback="canvasDraw"
        @mousedown.prevent="mousedown"
        @mousemove.prevent="mousemove"
        @mouseup.prevent="mouseup"
        @mouseleave.prevent="mouseup"
        ></can>

    </div>

</template>

<script>

import can from './components/canvas/can.vue'

import Sprite from './modules/draw/sprite.js'

export default {
    name: 'App',
    components: {
        can
    },
    created:function(){

        //그리기 조정
        document.addEventListener('visibilitychange', ()=>{
            if(document.hidden){
                this.$refs.can.drawStop();
            }else{
                this.$refs.can.drawStart();
            }
        }, false);
        
        //키보드이벤트
        window.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
        });
        window.addEventListener('keydown', this.keydown);

        //device 설정
        Object.assign(this.canvasConfig, this.$device);

        //디버그 on/off
        this.canvasConfig.debug = true;

        //0:기본, 1:고정
        this.canvasConfig.drawMode = 1;
        this.canvasConfig.drawFps = 60;
        
        //display 크기 셋팅
        this.canvasConfig.displayWidth = 1920;
        this.canvasConfig.displayHeight = 1080;

        //시작
        this.load = true;

        this.$nextTick(()=>{
            
            //배경 생성
            this.grassBack0 = new Sprite('back/grass0.png');
            this.grassBack1 = new Sprite('back/grass1.png');
            this.grassBack2 = new Sprite('back/grass2.png');
            
            const xCount = this.canvasConfig.gameWidth / 16;
            const yCount = this.canvasConfig.gameHeight / 16;
            
            for(let i = 0 ; i < xCount ; i++){

                const row = [];
                this.tileMap.push(row);

                for(let k = 0 ; k < yCount ; k++){
                    
                    const colRan = this.$math.random(100);
                    row.push(colRan < 2?1:colRan < 4?2:0);
                    
                }

            }

            //캐릭터 생성
            
            this.sp0 = new Sprite('char1/sp2.png');
            this.sp1 = new Sprite('char1/sp2.png');

            this.charx = Math.floor((this.canvasConfig.gameWidth / 2) - this.sp0.scaleWidth);
            this.chary = Math.floor((this.canvasConfig.gameHeight / 2) - this.sp0.scaleHeight);

            // this.start();
            this.$refs.can.drawStart();

        });

    },
    data:function(){
        return {

            //캔버스 설정
            canvasConfig:{},
            
            load : false,

            ctx : null,
            can : null,

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

        mousedown(){
            this.mousedownFlag = true;
        },
        mousemove(e){
            
            if(!this.mousedownFlag){
                return;
            }
            
            this.ctx.clearRect(0, 0, this.canvasConfig.gameWidth, this.canvasConfig.gameHeight);
            this.ctx.translate(e.movementX, e.movementY);

        },
        mouseup(){
            this.mousedownFlag = false;
        },

        keydown(e){

            if(!this.ctx){
                return;
            }

            console.log(e);


            this.ctx.clearRect(0, 0, this.canvasConfig.gameWidth, this.canvasConfig.gameHeight);
            if(e.keyCode == 37){ //left
                this.ctx.translate(10, 0);
                this.charx -= 10;
            }else if(e.keyCode == 38){ //up
                this.ctx.translate(0, 10);
                this.chary -= 10;
            }else if(e.keyCode == 39){ //right
                this.ctx.translate(-10, 0);
                this.charx += 10;
            }else if(e.keyCode == 40){ //down
                this.ctx.translate(0, -10);
                this.chary += 10;
            }else{
                return;
            }

            this.drawObject(0);
            
            e.stopPropagation();
            e.preventDefault();

        },

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

body{
    padding:0px;
    margin:0px;
}
</style>