// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    player: cc.Node = null;

    @property
    text: string = 'hello';

    @property
    timeLimit: number = 0;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    gameOver () {
        this.player.stopAllActions(); //stop the jumping action of the player node
        cc.director.loadScene('game');
    }


    //Receive Update from Server to render Eggs
    //update (dt) {}
}
