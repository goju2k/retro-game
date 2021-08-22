const MyMath = function(){
    this.random = (max) => {
        return Number(Number(Math.random() * max).toFixed(0));
    }
}

export default new MyMath();