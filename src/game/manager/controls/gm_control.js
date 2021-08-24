const controls = {

    mousedown(e){
        
        this.log('mousedown ('+e.x+','+e.y+')');
        this.mousedownFlag = true;

        this.$refs.ta_event.focus();

        if(this.currScene && this.currScene.mousedown){
            this.currScene.mousedown.call(this.currScene, {
                x:e.clientX,
                y:e.clientY,
                button:e.button,
                ctrlKey:e.ctrlKey,
                shiftKey:e.shiftKey,
                altKey:e.altKey,
            });
        }
    },
    mousemove(e){
        
        if(!this.mousedownFlag){
            return;
        }
        
        // this.ctx.clearRect(0, 0, this.canvasConfig.gameWidth, this.canvasConfig.gameHeight);
        // this.ctx.translate(e.movementX, e.movementY);

    },
    mouseup(){
        this.mousedownFlag = false;
    },

    keydown(e){
        
        e.stopPropagation();

        if(this.currScene && this.currScene.keydown){
            this.currScene.keydown.call(this.currScene, {
                key:e.key,                
                ctrlKey:e.ctrlKey,
                shiftKey:e.shiftKey,
                altKey:e.altKey,
            });
        }
        //e.preventDefault();

        // this.ctx.clearRect(0, 0, this.canvasConfig.gameWidth, this.canvasConfig.gameHeight);
        // if(e.keyCode == 37){ //left
        //     this.ctx.translate(10, 0);
        //     this.charx -= 10;
        // }else if(e.keyCode == 38){ //up
        //     this.ctx.translate(0, 10);
        //     this.chary -= 10;
        // }else if(e.keyCode == 39){ //right
        //     this.ctx.translate(-10, 0);
        //     this.charx += 10;
        // }else if(e.keyCode == 40){ //down
        //     this.ctx.translate(0, -10);
        //     this.chary += 10;
        // }else{
        //     return;
        // }

        // this.drawObject(0);
        
    },

}

export default controls;