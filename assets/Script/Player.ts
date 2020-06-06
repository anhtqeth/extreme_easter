// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property()
    maxMoveSpeed: number = 0;
    movLeft:  boolean = false;
    movRight: boolean = false;
    xSpeed:   number = 0;
    ySpeed:   number = 0; //Move up ladder?
    @property()
    accel:    number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.movLeft  = false;
        this.movRight = false;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.movLeft = true;
                break;
            case cc.macro.KEY.right:
                this.movRight = true;
                break;
        }

    }

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.movLeft = false;
                break;
            case cc.macro.KEY.right:
                this.movRight = false;
                break;
        }
    }

    start () {

    }

    update (dt) {
        
        if (this.movLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.movRight) {
            this.xSpeed += this.accel * dt;
        }
        // restrict the movement speed of the main character to the maximum movement speed
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;


    }
}
