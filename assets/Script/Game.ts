import Server from "./Server";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property
    noPlayers: number = 0;

    @property(cc.Node)
    server: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property
    timeLimit: number = 0;
    
    //For Tilemap 
    @property(cc.TiledMap)
    map: cc.TiledMap = null;

    @property(cc.TiledLayer)
    ground: cc.TiledLayer = null;

    @property(cc.TiledLayer)
    terrain: cc.TiledLayer = null;


    @property(cc.TiledObjectGroup)
    objects: cc.TiledObjectGroup = null;

    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    @property(cc.Prefab)
    ColliderPreName: cc.Prefab = null;

    playerTile: cc.Vec2 = null;

    public score: number =0;
    public currentEggs: number = 0;
    
    @property
    public timer: number =0;

    @property(cc.Label)
    timerDisplay: cc.Label = null;


    onLoad () {
        this.initMap(); // init the current map and layers
        this.setTimer();
        console.log('Array of egg pos:' + this.eggPositionMap());
        console.log('Player Score: ' + this.player.getComponent('Player').getScore());
        console.log('Player Score: ' + this.player.getComponent('score'));
    }

    getRemotePlayer() {
        let rPlayers: cc.Node[] = [];
        for(let i =0;i<3;i++) {
            // let remotePlayerPos = this.server.getChildByName('remotePlayer_'+i).getPosition();
            // rPlayerPos.push(remotePlayerPos);
            let rPlayer = this.server.getChildByName('remotePlayer_'+i);
            rPlayers.push(rPlayer);
        }
        // for (let i = 0;i<rPlayers.length;i++){
        //     this.node.addChild(rPlayers[i]);
        // }
        return rPlayers;
    }

    autoCollectEgg(rPlayer) {
        // console.log('Player name: '+rPlayer.name);
        rPlayer.x+=2;
        let eggCount  = this.eggPositionMap().length;
        let eggPosMap = this.eggPositionMap();
        for(let i=0;i<eggCount;i++){
            if(rPlayer.x < eggPosMap[i].x){  
                rPlayer.x += 2; 
            }
            //Find next egg
        }
    }

    eggPositionMap() {
        let eggsPos: cc.Vec2[] = [];
        for(let i =0;i<6;i++) {
            let egg = this.server.getChildByName('egg_'+i).getPosition();
            eggsPos.push(egg);
        }
        return eggsPos;
    }
     /**
         * player_area
         * remote_player_area_1
         * remote_player_area_2
         * eggs_spawn_area_1
         * eggs_spawn_area_2
         * eggs_spawn_area_3
     */


    initMap () {
        let objs       = this.map.getObjectGroup('objects'); 
        let playerObj  = objs.getObject('player_area'); 
        var mapWall = this.map.getObjectGroup('wall');
        console.log('Map Wall +' + mapWall.getObject('1'));

        // for (var i = 1; i < 4; i++) {
        //     var collisionName = i.toString();
        //     var collider = mapWall.getObject(collisionName);
        //     var node = cc.instantiate(this.ColliderPreName);
        //     // var node = new cc.Node();
        //     node.setAnchorPoint(0.5, 0.5);
        //     node.x = collider.x;
        //     node.height = collider.height;
        //     node.y = collider.y - collider.height;
        //     node.width = collider.width;
        //     node.addComponent(cc.BoxCollider);
        //     node.getComponent(cc.BoxCollider).size = cc.size(collider.width, collider.height);
        //     node.getComponent(cc.BoxCollider).offset = cc.v2(collider.width / 2, collider.height / 2);
        //     node.getComponent(cc.BoxCollider).tag = 2;
        //     this.node.addChild(node);
        // }

        
        // let playerPos  = new cc.Vec2(playerObj.offset.x ,playerObj.offset.y); 
        // console.log('Player Pos: ' + playerPos);
        // this.playerTile = this.getTilePos(playerPos);
        // console.log('Player Tile: ' + this.playerTile);
        // this.updatePlayerPos();
    }

    //Get position base on tile location
    getTilePos(tile) {
        let mapSize  = this.node.getContentSize;
        let tileSize = this.map.getTileSize();
        let x = Math.floor(tile.x / tileSize.width);
        let y = Math.floor(tile.y/ tileSize.height);
        return new cc.Vec2(x,y);
    }
  
    // tileTransition(newTile) {
    //     let width = this.map.node.width;
    //     let height = this.map.node.height;
    //     if (newTile.x < 0 || newTile.x >= width) return;
    //     if (newTile.y < 0 || newTile.y >= height) return;

    //     // console.log('get Tile GI DAT: '+ this.terrain.getTileGIDAt(newTile));
    //     //Boundaries
    //     if(this.terrain.getTileGIDAt(newTile)) {
    //         return false;
    //     }
    //     this.playerTile = newTile;
    //     this.updatePlayerPos();
    // }
      
    // updatePlayerPos() {
    //     let pos = this.ground.getPositionAt(this.playerTile);
    //     console.log('Position of ' + this.playerTile + ' in Pixel: ' + pos);
    //     this.player.setPosition(pos.x,pos.y);
    // }

    //Send current game state to server
    //Players Count, Each Player's score, Timer
    sendGameState () {


        //
    }

    updateScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.player.getComponent('Player').getScore();
    }

    start () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    gameOver () {
        this.player.stopAllActions();
        cc.director.loadScene('gameover');
    }

    setTimer() {
        this.schedule(function(){
            this.timer-=1;
        },1)
    }



    //Receive Update from Server to render Eggs
    update (dt) {
        if(cc.director.getScene)
        if(this.timer == 0) {
            this.gameOver();
            return;
        }
        // this.timer-= Math.floor(dt/0.6);
        this.timerDisplay.string = 'Time Left ' + this.timer;

        this.updateScore();
        this.sendGameState();


        //renderEgg
        // this.autoCollectEgg(this.server.getChildByName('remotePlayer_0'));
        // let eggPos    = new cc
    }
}
