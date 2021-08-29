class MyMath {

    random(max){
        return Number(Number(Math.random() * max).toFixed(0));
    }

    getDistance(targetX, targetY) {
        return Math.sqrt(Math.pow(Math.abs(targetX), 2) + Math.pow(Math.abs(targetY), 2));
    }

}

export default new MyMath();