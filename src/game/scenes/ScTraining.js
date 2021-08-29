import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
import Animation from "@/modules/draw/Animation"
import Player from "@/game/object/player/Player";
import Turtle from "@/game/object/monster/turtle/Turtle";

import math from "@/modules/util/math"
class ScTraining extends AbstractScene{
    
    //생성자
    constructor(status){

        //super
        super(status);

        //player
        this.player = new Player({
            x:100,y:100,speed:150,
        });

        //monster
        this.mosters = [
            //new Turtle({x:math.random(550),y:math.random(300), speed:80}),
        ];
        for(let i=0 ; i<50 ; i++){
            this.mosters.push(new Turtle({x:math.random(550),y:math.random(300), speed:Math.floor(20+math.random(120))}));
        }
        this.monTime = 2000;
        this.monCurrTime = 0;

        // const self = this;
        // window.setInterval(()=>{
        //     self.log('turtle created!!')
        //     self.mosters.push(new Turtle({x:math.random(550),y:math.random(300), speed:100}));
        // }, 5000);
        
    }

    calc(ctx, gapTime, keyInput){

        for(let mon of this.mosters){
            mon.setTarget(this.player.x, this.player.y);
            mon.calc(ctx, gapTime, keyInput);
        }

        this.player.calc(ctx, gapTime, keyInput);

        if(this.monCurrTime >= this.monTime){
            this.mosters.push(new Turtle({x:math.random(550),y:math.random(300), speed:Math.floor(20+math.random(120))}));
            this.monTime = 100 + math.random(500);
            this.monCurrTime = 0;
        }else{
            this.monCurrTime += gapTime;
        }

    }

    draw(ctx, gapTime, keyInput){
        
        //this.background.draw(ctx, 0, 0, 0, 0);

        for(let mon of this.mosters){
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
        this.action = 0;
    }

}

export default ScTraining;