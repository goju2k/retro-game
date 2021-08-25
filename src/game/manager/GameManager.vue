<template>

    <div style="border:1px solid green;">

        <can ref="can" :config="canvasConfig" :callback="draw"
        @mousedown.stop.prevent="mousedown"
        @mousemove.stop.prevent="mousemove"
        @mouseup.stop.prevent="mouseup"
        ></can>

        <textarea ref='ta_event' style='position:absolute;z-index:-1;top:0px;left:0px;'
        @keydown.prevent="keydown"></textarea>

    </div>

</template>

<script>

import can from '@/components/canvas/can.vue'

import gm_controls from '@/game/manager/controls/gm_control.js'

export default {
    name:'GameManager',
    components: {
        can
    },
    computed:{
        scaleX(){
            const scaleX = this.canvasConfig?this.canvasConfig.gameWidth / this.canvasConfig.displayWidth:1;
            return scaleX;
        },
        scaleY(){
            const scaleY = this.canvasConfig?this.canvasConfig.gameHeight / this.canvasConfig.displayHeight:1;
            return scaleY;
        },
    },
    async created(){

        //캔버스 초기화
        this.canvasConfig = {};
        Object.assign(this.canvasConfig, this.$device);

        //!!임시 캔버스 설정추가

        //디버그 on/off
        this.canvasConfig.debug = true;

        //0:기본, 1:고정
        this.canvasConfig.drawMode = 1;
        this.canvasConfig.drawFps = 60;
        
        //display 크기 셋팅
        this.canvasConfig.displayWidth = 1280;
        this.canvasConfig.displayHeight = 720;


        //컨트롤 변수
        this.mousedownFlag = false;


        //씬 불러오기
        const ScTraning = require('@/game/scenes/ScTraining.js').default;
        this.currScene = new ScTraning({name:'training stage'});

        //렌더링 후
        await this.$nextTick();

        this.$refs.can.setActive(true);
        this.$refs.can.drawStart();

    },
    methods:{

        //컨트롤
        ...gm_controls,

        //캔버스 그리기
        draw(ctx, can, gapTime){

            //scene 계산
            this.currScene.calc(gapTime);

            //scene 그리기
            this.currScene.draw(ctx, gapTime);

            //UI 그리기

            //폰트 테스트
            ctx.fillStyle = 'black';
            ctx.font = '16px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji';
            ctx.fillText('폰트를 테스트합니다. Hi Hello World', 100, 100);

        },

        log(){
            //if(!window.getGlobalValue('GameManagerLogEnable')) return;
            console.log('[GAME MANAGER] ', ...arguments);
        }

    }
}
</script>

<style>

</style>