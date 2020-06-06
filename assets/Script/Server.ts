// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Server extends cc.Component {

    //TODO - Interval Spawning Egg (0.1 - 0.5 secs)
    //TODO - Spawn random color eggs

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    eggPrefab: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;
    
    @property(cc.Node)
    player: cc.Node = null;
    
    @property(cc.Label)
    scoreDisplay: cc.Node = null;

    // 1. Count number of egg < 6
    // 2. Spawn new egg (random color) (random location)
    // 3. If egg < 6 Back to 2

    // Record Players Score
    // Show winner when timer end
    spawnNewEgg () {
        //Random Color Egg
        let eggColors: string[] = ['cho','blue','red'];

        let newEgg = cc.instantiate(this.eggPrefab);
        this.node.addChild(newEgg);


        newEgg.setPosition(this.getNewEggPosition());
        newEgg.getComponent('Egg').game = this;

    }
    
    getNewEggPosition() {

        //
        return cc.v2(0,0);
    }
    // Send Update to client
    sendUpdate () {

    }
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
