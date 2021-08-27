const controls = {

    createEventObject(e){
        return {
            x:e.offsetX?Math.floor(e.offsetX * this.scaleX):null,
            y:e.offsetY?Math.floor(e.offsetY * this.scaleY):null,
            key:e.key,
            button:e.button,
            ctrlKey:e.ctrlKey,
            shiftKey:e.shiftKey,
            altKey:e.altKey,
        }
    },

    mousedown(e){
        
        this.log('mousedown original ('+e.offsetX+','+e.offsetY+')', e);
        this.mousedownFlag = true;

        this.$refs.ta_event.focus();

        if(this.currScene && this.currScene.mousedown){
            this.currScene.mousedown.call(this.currScene, this.createEventObject(e));
        }
    },
    mousemove(e){
        
        if(!this.mousedownFlag){
            return;
        }
        
        // this.ctx.clearRect(0, 0, this.canvasConfig.gameWidth, this.canvasConfig.gameHeight);
        // this.ctx.translate(e.movementX, e.movementY);

    },
    mouseup(e){

        this.log('mousedown original ('+e.offsetX+','+e.offsetY+')', e);
        this.mousedownFlag = false;
        if(this.currScene && this.currScene.mouseup){
            this.currScene.mouseup.call(this.currScene, this.createEventObject(e));
        }

    },

    keydown(e){
        
        e.stopPropagation();
        e.preventDefault();
        //this.log('keydown original ('+e.key+')', e);

        //keyInputObject 갱신
        if(e.key == 'ArrowUp'){
            this.keyInputObject.up = true;
        }else if(e.key == 'ArrowDown'){
            this.keyInputObject.down = true;
        }else if(e.key == 'ArrowLeft'){
            this.keyInputObject.left = true;
        }else if(e.key == 'ArrowRight'){
            this.keyInputObject.right = true;
        }

        //scene 에 이벤트 전송
        if(this.currScene && this.currScene.keydown){
            this.currScene.keydown.call(this.currScene, this.createEventObject(e));
        }

    },

    keyup(e){
        
        e.stopPropagation();
        e.preventDefault();
        //this.log('keyup original ('+e.key+')', e);

        //keyInputObject 갱신
        if(e.key == 'ArrowUp'){
            this.keyInputObject.up = false;
        }else if(e.key == 'ArrowDown'){
            this.keyInputObject.down = false;
        }else if(e.key == 'ArrowLeft'){
            this.keyInputObject.left = false;
        }else if(e.key == 'ArrowRight'){
            this.keyInputObject.right = false;
        }

        if(this.currScene && this.currScene.keyup){
            this.currScene.keyup.call(this.currScene, this.createEventObject(e));
        }
        
    },

}

export default controls;