import AcMove from "@/modules/action/AcMove";
class AcMoveAttack extends AcMove{

    constructor(targetObject){

        super(targetObject);

        this.updateVisible();
        
    }

    updateVisible(){
        this.attackRangeX = this.targetObject.x + 15;
        this.attackRangeY = this.targetObject.y + 15;
    }

    calc(gapTime) {
        
        //공격반경 위치 업데이트
        this.updateVisible();
        
        //공격범위 적 체크
        let enemyFound = false;
        this.enemyList = this.enemyList||[];
        for (let mon of this.$g.monsters) {

            for (let box of mon.collider.boxList) {

                if(this.$math.checkCrossBoxAndCircle(
                    box[0], box[1], box[2], box[3],
                    this.attackRangeX, this.attackRangeY, this.attackRange
                )) {
                    enemyFound = true;
                    break;
                    // this.enemyList.push();
                    // this.setTarget(this.$g.player.x, this.$g.player.y);
                    // this.status = 2; //적발견
                    // this.setSpeed(70); //속도증가
                }

            }

            if (enemyFound) {
                break;
            }
            
        }

        //적 있으면 공격중 상태로 변경
        if (enemyFound) {
            this.status = 2; //공격중
            return;
        }

        //적 없으면 계속 이동
        super.calc(gapTime);

        //목적지 도착하면 정지
        if(this.status !== 0 && this.movex == this.targetObject.x && this.movey == this.targetObject.y){

            this.status = 0; //준비

        }

    }

}

export default AcMoveAttack;