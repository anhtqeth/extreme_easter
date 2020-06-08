
const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property
    player: cc.Node = null;

    @property
    timeLimit: number = 0;
    
    @property
    noPlayers: number = 0;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //Set up listener
        //Set up sender
        for(let i = 0;i<= this.noPlayers; i++) {
            // Create Remote Player (does not count local player)
            
        }
    }

    //Send current game state to server
    //Players Count, Each Player's score, Timer
    sendGameState () {

        //
    }

    start () {

    }

    gameOver () {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }


    //Receive Update from Server to render Eggs
    update (dt) {
        //renderEgg


    }
}
