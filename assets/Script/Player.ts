
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property()
    public maxMoveSpeed: number = 0;

    @property(cc.Animation)
    anim: cc.Animation = null;

    movLeft:  boolean = false;
    movRight: boolean = false;
    movUp:    boolean = false;
    movDown:  boolean = false;

    xSpeed:   number = 0;
    ySpeed:   number = 0; 
    
    @property()
    accel:    number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.movLeft  = false;
        this.movRight = false;
        this.movUp    = false;
        this.movDown  = false;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.loadAnimation('L');
                this.movLeft = true;
                break;
            case cc.macro.KEY.right:
                this.movRight = true;
                this.loadAnimation('R'); // because of the break it not loop
                break;
            case cc.macro.KEY.up:
                this.movUp    = true;
                this.loadAnimation('U');
                break;
            case cc.macro.KEY.down:
                this.movDown = true;
                this.loadAnimation('D');
                break;
        }
    }

    onKeyUp (event) {
        this.getComponent(cc.Animation).play('player_idle');
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.movLeft = false;
                break;
            case cc.macro.KEY.right:
                this.movRight = false;
                break;
            case cc.macro.KEY.up:
                this.movUp = false;
                break;
            case cc.macro.KEY.down:
                this.movDown = false;
                break;
        }
    }

    start () {

    }

    loadAnimation(direction: string) {
        // Load Appropriate animation base on direction
        // Left/ Right animation 
        // Up/ Down animation
        switch(direction) {
            case 'U':
                this.getComponent(cc.Animation).play('player_up');
                break;
            case 'D':
                this.getComponent(cc.Animation).play('player_run');
                break;
            case 'L':
                this.getComponent(cc.Animation).play('player_run');
                break;
            case 'R':
                this.getComponent(cc.Animation).play('player_run');
                break;
        }
    }

    collEggs(other,self) {
        other.node.removeFromParent();
    }

    onCollisionEgg (other,self) {
        console.log("Colliding egg");
        //++ Score
    }

    onCollisionEnter(other,self) {
        console.log('hitting something');
        other.node.removeFromParent();
    }


    update (dt) {
        if(this.movUp){
            this.node.y += 2;
        }
        if (this.movDown) {
            this.node.y -= 2;
        }
        if (this.movLeft) {
            this.node.scaleX = -Math.abs(this.node.scaleX);
            this.node.x -=2;
        }
        if (this.movRight) {
            this.node.scaleX = Math.abs(this.node.scaleX);
            this.node.x +=2;
        }
        
    }
}
