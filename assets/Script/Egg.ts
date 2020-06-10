
const {ccclass, property} = cc._decorator;

@ccclass
export default class Egg extends cc.Component {

    @property
    pickRadius: number = 1;
    
    getPlayerDistance () {
        //playerPos
        //dist
        
        
        // var dist = this.node.position.sub(playerPos).mag();
        // return dist;
        return 0;
    }

    onCollisionEnter(other, self) {
        //play audio
    }
    onCollisionExit(other,self){
    }

    onPicked() {
        //Refresh Spawn
        //gain score
        this.node.destroy;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let ani = this.getComponent(cc.Animation);
        // ani.play();
    }

    start () {

    }

    update (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
        cc.scaleBy(2,2);
    }
}
