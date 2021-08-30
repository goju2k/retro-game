<template>

    <div ref="app">
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

        const arr = [];
        for(let i = 0 ; i < 10000 ; i++){
            arr[i] = i;
        }

        let now = performance.now();
        for(let aa in arr){
            arr[aa]++;
        }
        console.log('for => '+(performance.now() - now)+' ms');

        //우클릭 방지
        window.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
        });

    },
    data:function(){
        return {    
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