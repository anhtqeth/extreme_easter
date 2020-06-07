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

    @property(cc.Prefab)
    eggPrefab: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;
    
    @property(cc.Node)
    player: cc.Node = null;
    
    @property(cc.Label)
    scoreDisplay: cc.Node = null;

    @property
    timer: number = 0;

    @property
    playerScore: number = 0;

    @property
    maxEgg: number = 0;

    onLoad () {
        this.timer = 0;
        
        this.genNewEgg();
        this.playerScore = 0;
    }

    // 1. Count number of egg < 6
    // 2. Spawn new egg (random color) (random location)
    // 3. If egg < 6 Back to 2

    // Record Players Score
    // Show winner when timer end
    genNewEgg () {
        //Random Color Egg
        let eggColors: string[] = ['cho','blue','red'];

        let newEgg = cc.instantiate(this.eggPrefab);
        this.node.addChild(newEgg);

        for (let num of eggColors) {
            newEgg.setPosition(this.getNewEggPosition());
        }
        //newEgg.setPosition(this.getNewEggPosition());
        newEgg.getComponent('Egg').game = this;
    }
    
    getNewEggPosition() {
        let randX = 0;
        let randY = 0;
        //Modify this to get correct tile position

        randY = this.node.height/2; //this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50; // A random square tile on map
        let maxX = this.node.width/2;

        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randY,randX);
    }
    // Send Update to client
    sendUpdate () {

    }
    
    // LIFE-CYCLE CALLBACKS:

   

    start () {

    }

    // update (dt) {}
}
