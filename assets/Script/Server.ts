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

    @property(cc.Prefab)
    bluePlayerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    pinkPlayerPrefab: cc.Prefab = null;

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

    @property
    noPlayers: number = 0; 

    @property(cc.Node)
    game: cc.Node = null;

    public hello: string = 'HI! IAM SERVER!';

    currentEggs: number = 0;
    currentPlayers: number = 0;


    onLoad () {
        // this.timer = 0;
        this.noPlayers = 3; // Get this from game
        let currentEgg = 0;
        for(let i = 0;i < this.maxEgg; i++) {
            this.genNewEgg();
            currentEgg += 1;
        }
        for(let i = 0; i< this.noPlayers;i++){
            this.genNewPlayer();
        }
    }



   
    // Receive current game state from local
    updateGameState() {
        this.game.getComponent('Game').sendGameState();
        
    }
    
    randEggColor(color: string) {
        let newEgg: cc.Node;
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

    genNewEgg () {
        //Random Color Egg
        let eggColors: string[] = ['cho','blue','red'];
        let randColor = eggColors[Math.floor(Math.random()*eggColors.length)];
        let newEgg = this.randEggColor(randColor);
        newEgg.name = 'egg_' + this.currentEggs;
        newEgg.setPosition(this.getRandomPosition());
        this.node.addChild(newEgg);
        this.currentEggs+=1;
    }
     //Randomly generate new Remote Player
     randPlayerColor(color: string) {
        let newPlayer: cc.Node;
        switch(color){
            case 'blue':
                newPlayer = cc.instantiate(this.bluePlayerPrefab);
                break;
            case 'pink':
                newPlayer = cc.instantiate(this.pinkPlayerPrefab);
                break;
        }
        return newPlayer
    }



    genNewPlayer() {
        let playerColors: string[] = ['blue','pink'];
        let randColor = playerColors[Math.floor(Math.random()*playerColors.length)];
        let newPlayer = this.randPlayerColor(randColor);
        newPlayer.name = 'remotePlayer_'+ this.currentPlayers;
        newPlayer.setPosition(this.getRandomPosition());
        this.node.addChild(newPlayer);
        this.currentPlayers+=1;
    }

    //Send this location to Client
    getRandomPosition() {
        let randX = 0;
        let randY = 0;
        //Modify this to get correct tile position
        // console.log('Y value: ' + randY);
        let maxY = 640/2-32;  // A random tile on map
        let maxX = 960/2-32;
        // console.log('Max X value: ' + maxX);
        randX = (Math.random() * Math.floor(maxX));
        randY = (Math.random() * Math.floor(maxY));
        // console.log('X Value' + randX);
        return cc.v2(randX, randY); // Should be correspond to Tile location
    }
    // Send Update to client
    sendUpdate () {

    }
    
    // LIFE-CYCLE CALLBACKS:

    start () {

    }

    update (dt) {
        if (this.currentEggs < this.maxEgg)
            this.genNewEgg();
    }
}
