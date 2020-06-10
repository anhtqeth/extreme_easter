
const {ccclass, property} = cc._decorator;

@ccclass
export default class RemotePlayer extends cc.Component {

    @property
    difficulty: number = 0;
    @property
    speed: number = 0;

    public score: number = 0;

    //Remote Player can win
    collectEgg () {
        //Moving according to to the neareast egg 
        // Continue with the next nearest egg
        // Change direction when hit wall
        this.score += 1;
    }    
    onLoad () {
        this.score = 0;

    }

    loadAnimation(direction: string, type) {
        let anim = this.getComponent(cc.Animation);
        if (type == 'blue'){
            switch(direction) {
                case 'U':
                    anim.play('blue_player_up'); // Missing this
                    break;
                case 'D':
                    anim.play('blue_player_run');
                    break;
                case 'L':
                    anim.play('blue_player_run');
                    break;
                case 'R':
                    anim.play('blue_player_run');
                    break;
            }
        } 

        if (type == 'pink') {
            switch(direction) {
                case 'U':
                    anim.play('pink_player_up'); // Missing this
                    break;
                case 'D':
                    anim.play('pink_player_run');
                    break;
                case 'L':
                    anim.play('pink_player_run');
                    break;
                case 'R':
                    anim.play('pink_player_run');
                    break;
            }
        }
    }

    start () {

    }

    update (dt) {
        // this.collectEgg();
    }
}
