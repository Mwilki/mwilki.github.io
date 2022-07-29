class Load {
    preload() {
        this.load.image('background', 'assets/background.png');
        // this.load.image('player', 'assets/player.png');
        this.load.spritesheet('player', 'assets/player2.png', {
            frameWidth: 20,
            frameHeight: 20
        });
        // this.load.image('wallV', 'assets/wallVertical.png');
        // this.load.image('wallH', 'assets/wallHorizontal.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('pixel', 'assets/pixel.png');
        this.load.image('tileset', 'assets/tileset.png');
        this.load.image('jumpButton', 'assets/jumpButton.png');
        this.load.image('rightButton', 'assets/rightButton.png');
        this.load.image('leftButton', 'assets/leftButton.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');

        this.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        this.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        this.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        this.load.audio('music', 'assets/music.mp3');
        this.loadLabel = this.add.text(250, 170, 'loading', {font: '30px Arial', fill: '#fff', align: 'center'});
        this.loadLabel.setOrigin(0.5, 0.5);
    }

    create() {
        // this.load.on('progress', function(value) {
        //     let percentage = Math.round(value * 100) + '%';
        //     this.loadLabel.setText('loading\n' + percentage);
        // });
        this.scene.start('menu');

    }
}