<template>

    <div ref="container">
        
        <!-- 디버그 패널 -->
        <div v-if="config.debug" style="position:absolute;z-index:1;display:flex;align-items:center;"
        >
            <div style="width:100px;">{{'FPS : ['+fps+']'}}</div>
            <input type="number" v-model="config.drawFps">
            <button @click="drawStart()">시작</button>
            <button @click="drawStop()">멈춰</button>
        </div>

        <!-- 게임 캔버스 -->
        <div>

            <!-- UI -->
            <div>

            </div>

            <!-- 캔버스 -->
            <canvas ref="can"
            style="border:0px solid lightgrey;"
            :width="width" :height="height"></canvas>

        </div>

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
            this.ctx.scale(this.scaleValue, this.scaleValue);
            
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
            
            //2d context
            ctx:null,

            //draw
            drawId : null,
            drawFrame : 0,

            //fps
            fps:0,
            fpsPrevTime:-1,

            //draw
            drawPrevTime:-1,
            drawGapTime:0,
            drawGapTimeTotal:0,
            drawNextGapTime:0,

            //=== Constant =================

            //fpsMode
            DRAW_MODE_0:0,
            DRAW_MODE_1:1,

            //Number
            NUM_0:0,
            NUM_1:1,

            //1초
            SEC_1:1000,

            //=== Constant =================

        }
    },
    methods:{

        drawStart(){
            if(!this.drawId){
                this.drawId = window.requestAnimationFrame(this.draw);
            }
        },
        drawStop(){
            if(this.drawId){

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
            if(!this.drawCheck(time)) return;

            //draw 처리
            this.callback(this.ctx, this.$refs.can, this.drawNextGapTime);
            
            //FPS 처리
            this.calcFps(time);
            
        },
        drawCheck(currTime){

            if(this.drawPrevTime < 0){
                this.drawPrevTime = currTime;
                return false;
            }

            this.drawGapTime += (currTime - this.drawPrevTime);
            this.drawNextGapTime = this.drawGapTime;
            
            this.drawPrevTime = currTime;

            //fps 체크
            if(this.config.drawMode == this.DRAW_MODE_1 && this.drawGap > this.drawGapTime){
                
                return false;

            }else{
                this.drawGapTime = this.config.drawMode == this.DRAW_MODE_1
                ?this.drawGapTime - this.drawGap
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