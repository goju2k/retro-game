import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
import Animation from "@/modules/draw/Animation"
import Player from "@/game/object/player/Player";
import Turtle from "@/game/object/monster/turtle/Turtle";

import trainingMap from "@/assets/data/map/MapTraining"

class ScTraining extends AbstractScene{
    
    //생성자
    constructor(status){

        //super
        super(status);

        //map setting
        this.$setupMapInfo(trainingMap, new Sprite(
            trainingMap.spriteMap.src,
            trainingMap.spriteMap.w,
            trainingMap.spriteMap.h,
        ));

        this.mapLoaded = false;

        //player
        this.player = new Player({
            x:100,y:100,speed:150,
        });

        this.$g.player = this.player; //global set

        //monster
        this.monsters = [
            //new Turtle({x:math.random(550),y:math.random(300), speed:80}),
        ];
        this.$g.monsters = this.monsters;

        for(let i=0 ; i<20 ; i++){
            this.monsters.push(new Turtle({x:this.$math.random(550),y:this.$math.random(300), speed:Math.floor(20+this.$math.random(120))}));
        }
        this.monTime = 2000;
        this.monCurrTime = 0;

    }

    calc(ctx, gapTime, keyInput){

        for(let mon of this.monsters){
            mon.calc(ctx, gapTime, keyInput);
        }

        this.player.calc(ctx, gapTime, keyInput);

        if(this.monCurrTime >= this.monTime){
            this.monsters.push(new Turtle({x:this.$math.random(550),y:this.$math.random(300), speed:Math.floor(20+this.$math.random(120))}));
            this.monTime = 3000 + this.$math.random(200);
            this.monCurrTime = 0;
        }else{
            this.monCurrTime += gapTime;
        }

    }

    draw(ctx, gapTime, keyInput){
        
        if(!this.mapLoaded){
            this.initMap();
            this.mapLoaded = true;
        }

        //맵 그리기
        this.drawMap(ctx, gapTime, keyInput);

        //객체 그리기
        for(let mon of this.monsters){
            mon.draw(ctx, gapTime, keyInput);
        }

        this.player.draw(ctx, gapTime, keyInput);
        
    }

    mousedown(e){

        this.log('mousedown', e);

        this.player.mousedown(e);

    }

    keydown(e){
        
        //this.log('keydown', e);
        this.player.keydown(e);

    }

}

export default ScTraining;