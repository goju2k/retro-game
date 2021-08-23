const controls = {

    mousedown(e){
        this.log('mousedown ('+e.x+','+e.y+')');
        this.mousedownFlag = true;
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

window.addEventListener('keydown', controls.keydown);

export default controls;