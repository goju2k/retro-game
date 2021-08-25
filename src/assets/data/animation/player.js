export default {
    type:'ANIMATION',
    spriteMap:{
        move:{
            src:'object/player/move.png',
            w:32,h:32,
        },
    },
    def:{
        'run_top' : {
            map:'move',
            loopCnt:-1,
            delay:1000,
            frames:[
                {
                    pos:[3,0],
                },
                {
                    pos:[4,0],
                },
                {
                    pos:[5,0],
                },
                {
                    pos:[6,0],
                },
                {
                    pos:[7,0],
                },
                // {
                //     pos:[8,0],
                // }
            ],
        },
    },
}