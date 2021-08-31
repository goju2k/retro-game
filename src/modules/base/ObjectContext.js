let mapInfo = {
    mapData: null,
    mapSection: null,
};

class ObjectContext{

    constructor(){
        this.mapInfo = mapInfo;
    }

    //맵 정보 초기화
    $setupMapInfo = function(map, mapSprite){

        this.mapInfo.mapData = map;

        const xcnt = map.width / map.blockSize;
        const ycnt = map.height / map.blockSize;

        this.mapInfo.mapSection = [];

        for(let i = 0 ; i < xcnt ; i++){

            this.mapInfo.mapSection[i] = [];

            for(let k = 0 ; k < ycnt ; k++){

                this.mapInfo.mapSection[i][k] = Object.assign({

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
        return this.mapInfo.mapSection;
    }
    $getMapData = function(){
        return this.mapInfo.mapData;
    }
    
};
export default new ObjectContext();