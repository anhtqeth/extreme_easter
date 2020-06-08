
const {ccclass, property} = cc._decorator;

@ccclass
export default class Egg extends cc.Component {


    @property
    pickRadius: number = 1;

    getPlayerDistance () {
        //playerPos
        //dist
        var dist = 0;
        return dist;
    }

    onPicked() {
        //Refresh Spawn
        //gain score
        this.node.destroy;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }



    }
}
