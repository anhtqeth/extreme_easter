
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property()
    maxMoveSpeed: number = 0;
    movLeft:  boolean = false;
    movRight: boolean = false;
    movUp:    boolean = false;
    movDown:  boolean = false;

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
            case cc.macro.KEY.up:
                this.movUp    = true;
                break;
            case cc.macro.KEY.down:
                this.movDown = true;
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
            case cc.macro.KEY.up:
                this.movUp    = false;
                break;
            case cc.macro.KEY.down:
                this.movDown  = false;
                break;
        }
    }

    start () {

    }

    ani(direction) {
        // Load Appropriate animation base on direction?
    }

    update (dt) {
        
        if (this.movLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.movRight) {
            this.xSpeed += this.accel * dt;
        }

        if (this.movDown) {
            this.ySpeed -= this.accel * dt;
        } else if (this.movUp) {
            this.ySpeed += this.accel * dt;
        }

        
        // restrict the movement speed of the main character to the maximum movement speed
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        
        if ( Math.abs(this.ySpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }
        // update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;


    }
}
