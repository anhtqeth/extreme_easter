
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

    // Should you use this?
    GameState = class {

    }
    
    movLeft:  boolean = false;
    movRight: boolean = false;
    movUp:    boolean = false;
    movDown:  boolean = false;

    playerTile: cc.Vec2 = null;

    onLoad () {
        //Set up listener
        //Set up sender
        
        this.initMap(); // init the current map and layers
        
        for(let i = 0;i<= this.noPlayers; i++) {
            // Create Remote Player (does not count local player)
        }
        //Handling input
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('Left pressed...');
                this.movLeft = true;
                break;
            case cc.macro.KEY.right:
                console.log('Right pressed...');
                this.movRight = true;
                break;
            case cc.macro.KEY.up:
                console.log('Up pressed...');
                this.movUp    = true;
                break;
            case cc.macro.KEY.down:
                console.log('Down pressed...');
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

        this.playerTile = this.getTilePos(playerPos);
        console.log('Player Tile: ' + this.playerTile);
        this.updatePlayerPos();
    }

    //Get position base on tile location
    getTilePos(tile) {
        // let tileSize  = this.map.getTileSize();
        // let mapWidth  = this.map.node.width;
        // let mapHeight = this.map.node.height;

        // let x = tile.x - mapWidth/2 + 32;
        // console.log('New x: ' + x);
        // let y = mapHeight/2 - tile.y - 32; 
        // console.log('New y: ' + y);
        // return new cc.Vec2(x,y);
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
        // if(this.terrain.getTileGIDAt(pos)){
        //     console.log('Terrain collision');
        //     return false ;
        // }
        // this.player.setPosition(pos);
        let pos = this.ground.getPositionAt(this.playerTile);
        console.log('Position of ' + this.playerTile + ' in Pixel: ' + pos);
        this.player.setPosition(pos.x,pos.y);
    }

    playerMove() {
        // let currPos = this.player.getPosition();
        // console.log('Current Player position: ' + currPos);
        var newTile = new cc.Vec2(this.playerTile.x,this.playerTile.y);
        if(this.movUp){
            // this.player.setPosition(this.player.x,this.player.y+2);
            newTile.y -= 1;
        }
        if (this.movDown) {
            // this.player.setPosition(this.player.x,this.player.y-2);
            newTile.y += 1;
        }
        if (this.movLeft) {
            newTile.x -= 1;
            // this.player.setPosition(this.player.x-2,this.player.y);
        }
        if (this.movRight) {
            newTile.x += 1;
            // this.player.setPosition(this.player.x+2,this.player.y);
        }
        this.tileTransition(newTile);
    }

    //Send current game state to server
    //Players Count, Each Player's score, Timer
    sendGameState () {
        // send Map 
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
        this.playerMove();
        //renderEgg
        let playerPos = new cc.Vec2(this.player.x, this.player.y);
        // let eggPos    = new cc
    }
}
