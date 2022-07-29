let game = new Phaser.Game({
    width: 500,
    height: 340,
    backgroundColor: '#3498db',
    physics: {default: 'arcade'},
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 250,
            height: 170
        },
        max: {
            width: 1000,
            height: 680
        }
    }
});

// add scene to the game
game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('play', Play);

// start the scene
game.scene.start('load');