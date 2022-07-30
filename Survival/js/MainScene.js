import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload(){
        Player.preload(this); // STATIC CLASSES ARE SO COOL
        this.load.image('tiles', 'assets/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
    }

    create(){
        const map = this.make.tilemap({
            key: 'map'
        });

        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0);

        const layer1 = map.createLayer('Tile Layer 1', tileset,0,0);
        const layer2 = map.createLayer('Tile Layer 2', tileset,0,0);

        this.player = new Player({scene: this, x: 0, y: 0, texture: 'player', frame: 'townsfolk_m_idle_1'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
    }

    update(){
        this.player.move();
    }
}