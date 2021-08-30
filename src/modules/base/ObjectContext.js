class ObjectContext{

    constructor(){
        this.mapData;
        this.mapSection;
    }

    //맵 정보 초기화
    $setupMapInfo = function(map, mapSprite){

        this.mapData = map;

        const xcnt = map.width / map.blockSize;
        const ycnt = map.height / map.blockSize;

        this.mapSection = [];

        for(let i = 0 ; i < xcnt ; i++){

            this.mapSection[i] = [];

            for(let k = 0 ; k < ycnt ; k++){

                this.mapSection[i][k] = Object.assign({

                    sprite : mapSprite, //맵 스프라이트
                    
                    //object 정보
                    objectList : [],
                    player : null,
                    npcList : [],

                }, map.def[i][k]);

            }

        }

    }

    //맵 정보 get
    $getMap = function(){
        return this.mapSection;
    }
    
};
export default new ObjectContext();