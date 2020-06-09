import Server from "./Server";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property
    noPlayers: number = 0;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    remotePlayer: cc.Node = null;

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

    public score: 0;

    playerTile: cc.Vec2 = null;

    // Should you use this?
    GameState = class {

    }   

    onLoad () {
        //Set up listener
        //Set up sender
        this.score = 0;
        this.initMap(); // init the current map and layers
        
        for(let i = 0;i<= this.noPlayers; i++) {
            // Create Remote Player (does not count local player)
        }
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
        let playerPos  = new cc.Vec2(playerObj.offset.x ,playerObj.offset.y); 
        console.log('Player Pos: ' + playerPos);

        let server = new Server();
        // this.playerTile = this.getTilePos(playerPos);
        // console.log('Player Tile: ' + this.playerTile);
        this.updatePlayerPos();
    }

    //Get position base on tile location
    getTilePos(tile) {
        let mapSize  = this.node.getContentSize;
        let tileSize = this.map.getTileSize();
        let x = Math.floor(tile.x / tileSize.width);
        let y = Math.floor(tile.y/ tileSize.height);
        return new cc.Vec2(x,y);
    }
  
    tileTransition(newTile) {
        let width = this.map.node.width;
        let height = this.map.node.height;
        if (newTile.x < 0 || newTile.x >= width) return;
        if (newTile.y < 0 || newTile.y >= height) return;

        // console.log('get Tile GI DAT: '+ this.terrain.getTileGIDAt(newTile));
        //Boundaries
        if(this.terrain.getTileGIDAt(newTile)) {
            return false;
        }
        this.playerTile = newTile;
        this.updatePlayerPos();
    }
      
    updatePlayerPos() {
        let pos = this.ground.getPositionAt(this.playerTile);
        console.log('Position of ' + this.playerTile + ' in Pixel: ' + pos);
        this.player.setPosition(pos.x,pos.y);
    }

    //Send current game state to server
    //Players Count, Each Player's score, Timer
    sendGameState () {
        // send Map 
        //
    }

    updateScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score ' + this.score;
    }

    start () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    gameOver () {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }


    //Receive Update from Server to render Eggs
    update (dt) {
        //renderEgg
       
        // let eggPos    = new cc
    }
}
