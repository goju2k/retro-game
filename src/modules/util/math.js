class MyMath {

    constructor() {
        this.localArr = [];
    }

    random(max){
        return Number(Number(Math.random() * max).toFixed(0));
    }

    getDistance(targetX, targetY) {
        return Math.sqrt(Math.pow(Math.abs(targetX), 2) + Math.pow(Math.abs(targetY), 2));
    }

    checkCrossBoxAndCircle(x, y, x2, y2, circlex, circley, radius) {
            
        let l = x2 - x;
        let m;
        let s;

        let xdiff1;
        let xdiff2;
        let disT;

        let line = this.localArr;
        for(let i = 0, len = 4 ; i < len ; i++){

            if(i == 0){
                line[0] = x, line[1] = y, line[2] = x2, line[3] = y;
            }else if(i == 1){
                line[0] = x2, line[1] = y, line[2] = x2, line[3] = y2;
            }else if(i == 2){
                line[0] = x2, line[1] = y2, line[2] = x, line[3] = y2;
            }else if(i == 3){
                line[0] = x, line[1] = y2, line[2] = x, line[3] = y;
            }

            xdiff1 = line[0] - circlex;
            xdiff2 = line[2] - circlex;

            if(xdiff1 > xdiff2){
                m = this.getDistance(xdiff1, line[1] - circley);
                s = this.getDistance(xdiff2, line[3] - circley);
            }else{
                m = this.getDistance(xdiff2, line[3] - circley);
                s = this.getDistance(xdiff1, line[1] - circley);
            }

            disT = m * s / l;

            if(radius >= disT){
                return true;
            }

        }

        return false;
    }

}

export default new MyMath();