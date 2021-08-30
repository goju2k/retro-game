<template>

    <div ref="container">
        
        <!-- 디버그 패널 -->
        <div v-if="config.debug" style="position:absolute;z-index:1;padding:3px 5px;display:flex;align-items:center;background:lightblue;"
        >
            <div style="width:80px;">{{'FPS : ['+fps+']'}}</div>
            <div style="width:80px;margin:0px 5px;">{{'Playing : '+(active?'Y':'N')}}</div>
            <input type="number" v-model="config.drawFps">
            <button @click="setActive(true);drawStart();">시작</button>
            <button @click="setActive(false);drawStop()">멈춰</button>

        </div>

        <!-- 게임 캔버스 -->
        <canvas ref="can"
        style="margin-bottom:-4px;"
        :width="width" :height="height"></canvas>

    </div>

</template>

<script>
export default {
    name:'Can',
    props:{
        config:Object,
        callback:Function,
    },
    created(){
        
        //2d context
        this.ctx = null;

        //draw
        this.drawId = null;
        this.drawFrame = 0;

        //fps
        this.fpsPrevTime = -1;
    
        //draw vars
        this.drawPrevTime = -1;
        this.drawGapTime = 0;
        this.drawGapTimeTotal = 0;
        this.drawNextGapTime = 0;

        this.active = false;

        
        //=== Constant =================

        //fpsMode
        this.DRAW_MODE_0 = 0;
        this.DRAW_MODE_1 = 1;

        //Number
        this.NUM_0 = 0;
        this.NUM_1 = 1;

        //1초
        this.SEC_1 = 1000;

        //=== Constant =================


        //global 이벤트
        //그리기 조정
        document.addEventListener('visibilitychange', ()=>{
            if(document.hidden){
                this.drawStop();
            }else{
                this.drawStart();
            }
        }, false);
        

        this.$nextTick(()=>{

            //컨텍스트 생성
            const can = this.$refs.can;
            this.ctx = can.getContext('2d');
            
            //스케일 계산
            this.ctx.scale(this.scaleX, this.scaleY);
            
            //image scale option
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;
            this.ctx.msImageSmoothingEnabled = false;
            this.ctx.imageSmoothingEnabled = false;
                        
        });
        
    },
    computed:{

        scaleValue(){
            const scaleX = this.config.displayWidth / this.config.gameWidth;
            return scaleX;
        },
        scaleX(){
            const scaleX = this.config.displayWidth / this.config.gameWidth;
            return scaleX;
        },
        scaleY(){
            const scaleY = this.config.displayHeight / this.config.gameHeight;
            return scaleY;
        },
        
        width(){
            return this.config.displayWidth;
        },
        height(){
            return this.config.displayHeight;
        },
        drawGap(){
            const gap = this.config.drawMode==this.DRAW_MODE_1 && this.config.drawFps > this.NUM_0
                    ?Number(Number(this.SEC_1 / this.config.drawFps).toFixed(0))
                    :null;
            console.log('drawGap:'+gap);
            return gap;
        }

    },
    data(){
        return {
            
            //fps
            fps:0,
            
        }
    },
    methods:{

        setActive(flag){
            this.active = flag;
        },

        drawStart(){

            //active 아니면 종료
            if(!this.active){
                return;
            }

            this.log('drawStart!!')

            if(!this.drawId){
                this.drawId = window.requestAnimationFrame(this.draw);
            }

        },
        drawStop(){
            if(this.drawId){

                this.log('drawStop!!')

                window.cancelAnimationFrame(this.drawId);
                this.drawId = null;

                //fps 측정 관련 초기화
                this.drawFrame = this.NUM_0;
                this.fpsPrevTime = -1;
                this.fps = this.NUM_0;

                //draw 관련 초기화
                this.drawPrevTime = -1;

            }
        },
        draw(time){

            //request
            this.drawId = window.requestAnimationFrame(this.draw);
            
            //Draw 체크
            if(!this.drawCheck(time)) {
                this.log('frame skip');
                return;
            }

            //canvas 클리어
            // this.ctx.clearRect(-500, -500, this.$refs.can.width, this.$refs.can.height);
            this.ctx.fillStyle = 'lightgrey';
            this.ctx.fillRect(0, 0, this.config.gameWidth, this.config.gameHeight);

            //임시 좌표 디버그
            this.ctx.fillStyle = 'black';
            for(let i = 0, len =  this.config.gameWidth; i < len ; i = i + 32){
                for(let k = 0, len2 = this.config.gameHeight ; k < len2 ; k = k + 32){
                    this.ctx.fillRect(i, k, 1, 1);
                }
            }

            //draw 처리
            this.callback(this.ctx, this.$refs.can, this.drawNextGapTime);
            
            //FPS 처리
            this.calcFps(time);
            
        },
        drawCheck(currTime){

            if(this.config.drawMode==this.DRAW_MODE_1 && this.drawGap === null){
                return false;
            }

            if(this.drawPrevTime < 0){
                this.drawPrevTime = currTime;
                return false;
            }

            this.drawGapTime += (currTime - this.drawPrevTime);
            
            //his.log('drawPrevTime', this.drawPrevTime, 'currTime', currTime, 'drawGapTime', this.drawGapTime)

            this.drawNextGapTime = this.drawGapTime;
            
            this.drawPrevTime = currTime;

            //fps 체크
            if(this.config.drawMode == this.DRAW_MODE_1 && this.drawGap > this.drawGapTime){
                
                return false;

            }else{
                this.drawGapTime = this.config.drawMode == this.DRAW_MODE_1
                ?(this.drawGapTime - this.drawGap > this.drawGap?this.drawGap:this.drawGapTime - this.drawGap)
                :this.NUM_0;
            }

            return true;

        },
        //delta time 사용하지 마라...
        //https://stackoverflow.com/questions/63683024/optimise-javascript-canvas-for-mass-drawing-of-tiny-objects

        //requestAnimationFrame 설명
        //http://creativejs.com/resources/requestanimationframe/
        calcFps(currTime){

            //디버그일때만 처리
            if(!this.config.debug){
                return;
            }

            if(this.fpsPrevTime < 0){
                this.fpsPrevTime = currTime;
                return;
            }

            const delta = currTime - this.fpsPrevTime;
            
            if(delta >= this.SEC_1){
                
                this.fps = this.drawFrame;

                this.fpsPrevTime = currTime + delta - this.SEC_1;
                this.drawFrame = this.NUM_0;

            }else{
                this.drawFrame += this.NUM_1;
            }

        },

        log(){
            console.log('[CANVAS] ', ...arguments);
        }

    }

}
</script>

<style>
canvas{
    font-family: 'DungGeunMo', monospace;
    font-size: 16px;
    image-rendering: pixelated;
}
</style>