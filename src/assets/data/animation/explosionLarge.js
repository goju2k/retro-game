export default {
    spriteMap:{
        explo:{
            src:'effect/explosion/explosion-large.png',
            w:64,h:64,
        },        
    },
    def:{
        'exp' : {
            map:'explo',
            loopCnt:1,
            delay:50,
            frames:[
                {
                    pos:[0, 0],
                },
                {
                    pos:[1, 0],
                },
                {
                    pos:[2, 0],
                },
                {
                    pos:[3, 0],
                },
                {
                    pos:[0, 1],
                },
                {
                    pos:[1, 1],
                },
                {
                    pos:[2, 1],
                },
                {
                    pos:[3, 1],
                },
                {
                    pos:[0, 2],
                },
                {
                    pos:[1, 2],
                },
            ],
        },
    }
}