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
    blueEggPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    redEggPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    chocoEggPrefab: cc.Prefab = null;


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
        // this.timer = 0;

        let currentEgg = 0;
        if (currentEgg < this.maxEgg) {
            this.genNewEgg();
            currentEgg +=1;
        }
        
        // this.genNewEgg();
        this.playerScore = 0;
    }

    genNewEgg () {
        //Random Color Egg
        let eggColors: string[] = ['cho','blue','red'];
        for (let color of eggColors) {
            let newEgg = this.randEggColor(color);
            newEgg.setPosition(this.getNewEggPosition());
            this.node.addChild(newEgg);
        }
        // newEgg.getComponent('Egg').game = this;
    }
    
    randEggColor(color) {
        let newEgg;
        switch(color) {
            case 'cho':
                newEgg = cc.instantiate(this.chocoEggPrefab);
                break;
            case 'blue':
                newEgg = cc.instantiate(this.blueEggPrefab);
                break;
            case 'red':
                newEgg = cc.instantiate(this.redEggPrefab);
                break;
        }
        return newEgg;
    }

    //Randomly set position of new Egg
    getNewEggPosition() {
        let randX = 0;
        let randY = 0;
        //Modify this to get correct tile position
        // Math.floor(Math.random() * 6) + 1  

        randY = this.node.height/2; //this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50; // A random square tile on map
        let maxX = this.node.width;

        randX = (Math.random() * 1360) + 1;
        return cc.v2(randY,randX);
    }
    // Send Update to client
    sendUpdate () {


    }
    
    // LIFE-CYCLE CALLBACKS:

    start () {

    }

    update (dt) {
        
    }
}
