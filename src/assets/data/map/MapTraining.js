const map = {

    width:640,
    height:360,
    blockSize:32,
    
    spriteMap:{
        src:'map/rhombus-outside.png',
        w:16,h:16,
    },

}

const def = [];
const xcnt = map.width / map.blockSize;
const ycnt = map.height / map.blockSize;

for(let i = 0 ; i < xcnt ; i++){

    def[i] = [];

    for(let k = 0 ; k < ycnt ; k++){

        def[i][k] = {

            x:i*map.blockSize, //x좌표
            y:k*map.blockSize, //y좌표
            x2:(i+1)*map.blockSize, //x2좌표
            y2:(k+1)*map.blockSize, //y2좌표

            frame:Math.random()>0.8?[1,3]:[0,3], //스프라이트내의 좌표

            boxCollider:null, //boxCollider 목록
            move : true, //이동가능 영역 여부

        }

    }

}

map.def = def;

export default map;