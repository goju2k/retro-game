<template>

    <div>

        <can ref="can" :config="canvasConfig" :callback="canvasDraw"
        @mousedown.prevent="mousedown"
        @mousemove.prevent="mousemove"
        @mouseup.prevent="mouseup"
        @mouseleave.prevent="mouseup"
        ></can>

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
        this.canvasConfig.displayWidth = 1920;
        this.canvasConfig.displayHeight = 1080;


        //컨트롤 변수
        this.mousedownFlag = false;


        //씬 불러오기
        this.currScene = require('@/game/scenes/sc_traning.js');

        //렌더링 후
        await this.$nextTick();

    },
    methods:{

        //컨트롤
        ...gm_controls,

        //캔버스 그리기
        canvasDraw(ctx, can, gapTime){

            //scene 그리기

            //UI 그리기

        }

    }
}
</script>

<style>

</style>