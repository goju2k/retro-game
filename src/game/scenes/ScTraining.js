import AbstractScene from "@/modules/scene/AbstractScene";

import Sprite from "@/modules/draw/Sprite"
import Animation from "@/modules/draw/Animation"
import Player from "@/game/object/Player";
class ScTraining extends AbstractScene{
    
    //생성자
    constructor(status){

        //super
        super(status);

        //player
        this.player = new Player({
            x:100,y:100,speed:140,
        });
        
    }

    calc(ctx, gapTime, keyInput){

        this.player.calc(ctx, gapTime, keyInput);

    }

    draw(ctx, gapTime, keyInput){
        
        //this.background.draw(ctx, 0, 0, 0, 0);

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