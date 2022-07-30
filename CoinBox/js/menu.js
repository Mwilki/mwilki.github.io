class Menu {
    create(data){
        let score = data.score ? data.score : 0;
        
        this.add.image(250, 170, 'background');

        let nameLabel = this.add.text(250, -50, 'Super Coin Box', {font: '70px Geo', fill: "#fff"});
        nameLabel.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: nameLabel,
            y: 80,
            duration: 1000,
            ease: 'bounce.out'
        });

        // local storage: best score
        if (localStorage.getItem('bestScore') === null){
            localStorage.setItem('bestScore', 0);
        }

        if (score > localStorage.getItem('bestScore')){
            localStorage.setItem('bestScore', score);
        }
        let scoreText = "score: " + score + '\nbest score: ' + localStorage.getItem('bestScore');
        let scoreLabel = this.add.text(250, 170, scoreText, {font: '25px Arial', fill: "#fff", align: 'center'});
        scoreLabel.setOrigin(0.5, 0.5);

        let startText;
        if (this.sys.game.device.os.desktop){
            startText = "press the up arrow key to start";
        } else {
            startText = "touch the screen to start";
        }
        let startLabel = this.add.text(250, 260, startText, {font: '30px Geo', fill: "#fff"});
        startLabel.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: startLabel,
            angle: {from: -2, to: 2},
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // store up key
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W
        });
    }

    update(){
        if (this.keys.up.isDown || (!this.sys.game.device.os.desktop && this.input.activePointer.isDown)){
            this.scene.start('play');
        }
    }
}