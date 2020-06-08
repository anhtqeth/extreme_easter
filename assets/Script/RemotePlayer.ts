
const {ccclass, property} = cc._decorator;

@ccclass
export default class RemotePlayer extends cc.Component {

    @property
    difficulty: number = 0;
    @property
    speed: number = 0;

    @property
    score: number = 0;

    //Remote Player can win
    collectEgg () {
        //Moving according to grid to the neareast egg 
        // Continue with the next nearest egg

    }    
    onLoad () {
        this.score = 0;

    }

    start () {

    }

    update (dt) {
        this.collectEgg();
    }
}
