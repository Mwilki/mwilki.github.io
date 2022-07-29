class Play {
    create(){
        // player
        this.player = this.physics.add.sprite(250,170,'player');
        this.player.body.gravity.y = 500;

        // player move animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [1,2]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [3,4]}),
            frameRate: 8,
            repeat: -1
        });

        // arrow
        this.arrow = this.input.keyboard.createCursorKeys();
        this.createWorld();

        // coin
        this.coin = this.physics.add.sprite(60, 130, 'coin');
        
        // score
        this.scoreLabel = this.add.text(30, 25, 'score: 0', {font: '18px Arial', fill: '#fff'});
        this.score = 0;

        // enemy
        this.enemies = this.physics.add.group();

        // Static Enemy Creation
        // this.time.addEvent({
        //     delay: 2200,
        //     callback: () => this.addEnemy(),
        //     loop: true
        // });

        // Dynamic Enemy Creation
        this.nextEnemy = 0;  // time of next enemy creation

        // add sounds
        this.jumpSound = this.sound.add('jump');
        this.coinSound = this.sound.add('coin');
        this.deadSound = this.sound.add('dead');

        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();


        // PARTICLES POG
        let particles = this.add.particles('pixel');
        this.emitter = particles.createEmitter({
            quantity: 15,
            speed: {min: -150, max: 150},
            scale: {start: 2, end: 0.1},
            lifespan: 800,
            on: false
        });

        // add buttons if mobile
        if (!this.sys.game.device.os.desktop){
            this.addMobileInputs();

            this.rotateLabel = this.add.text(250, 170, '', { font: '30px Geo', fill: "#fff", backgroundColor: '#000' });
            this.rotateLabel.setOrigin(0.5, 0.5);

            // phaser function scale calls our method whenever device is rotated
            this.scale.on('orientationchange', this.orientationChange, this);
            this.orientationChange();
        }


        // phaser only handles one pointer by default.  add one extra pointer (2 in total)
        this.input.addPointer(1);
    }

    update(){
        // called 60 times per second after create()
        this.physics.collide(this.player, this.walls);
        this.physics.collide(this.enemies, this.walls);
        if (!this.player.active){
            return;
        }

        // dynamic frequency minion creation
        let now = Date.now(); // current time in ms

        if (this.nextEnemy < now){
            let startDifficulty = 4000; // every 4 seconds
            let endDifficulty = 1000;
            let scoreToReachEndDifficulty = 100;

            let progress = Math.min(this.score / scoreToReachEndDifficulty, 1); // grab the min number (param 1 or param 2)
            // progress:  0, 0.2, 0.5, 0.9, 1

            let delay = startDifficulty - (startDifficulty - endDifficulty) * progress;  // 4000 - (4000 - 1000) * 0 = 4000;  4000 - (4000 - 1000) * 0.5 = 2500

            this.addEnemy();
            this.nextEnemy = now + delay;
        }

        // handle game logic
        this.movePlayer();

        // death logic
        if (this.player.y > 340 || this.player.y < 0){
            this.playerDie();
        }

        // coin overlap logic
        if (this.physics.overlap(this.player, this.coin)){
            this.takeCoin();
        }

        // player overlap enemy
        if (this.physics.overlap(this.player, this.enemies)) {
            this.playerDie();
        }
    }

    movePlayer(){
        if (this.arrow.left.isDown || this.moveLeft){
            this.player.body.velocity.x = -200;
            this.player.anims.play('left', true);
        } else if (this.arrow.right.isDown || this.moveRight){
            this.player.body.velocity.x = 200;
            this.player.anims.play('right', true);
        } else {
            this.player.body.velocity.x = 0;
            this.player.setFrame(0);
        }

        if (this.arrow.up.isDown && this.player.body.onFloor()){
            this.jumpPlayer();
        }
    }

    jumpPlayer(){
        if (this.player.body.onFloor()){
            this.jumpSound.play();
            this.player.body.velocity.y = -320;
        }
    }

    createWorld(){
        // this.walls = this.physics.add.staticGroup();
        
        // this.walls.create(10, 170, 'wallV'); // left
        // this.walls.create(490, 170, 'wallV'); // right

        // this.walls.create(50, 10, 'wallH'); // top left
        // this.walls.create(450, 10, 'wallH'); // top right
        // this.walls.create(50, 330, 'wallH'); // bottom left
        // this.walls.create(450, 330, 'wallH'); // bottom right

        // this.walls.create(0, 170, 'wallH'); // top left
        // this.walls.create(500, 170, 'wallH'); // top right
        // this.walls.create(250, 90, 'wallH'); // bottom left
        // this.walls.create(250, 250, 'wallH'); // bottom right
        let map = this.add.tilemap('map');
        let tileset = map.addTilesetImage('tileset', 'tileset');
        this.walls = map.createStaticLayer('Tile Layer 1', tileset);
        this.walls.setCollision(1);
    }

    playerDie(){
        this.deadSound.play();
        this.music.stop();
        this.emitter.setPosition(this.player.x, this.player.y);
        this.emitter.explode();
        this.player.destroy();

        this.time.addEvent({
            delay: 1000,
            callback: () => this.scene.start('menu', {score: this.score})
        });

        this.cameras.main.flash(300, 255, 50, 35);
        this.cameras.main.shake(300, 0.02);
    }

    takeCoin(){
        this.coinSound.play();
        this.score += 5;
        this.scoreLabel.setText('score: ' + this.score);
        this.updateCoinPosition();

        this.coin.setScale(0);
        this.tweens.add({
            targets: this.coin,
            scale: 1,
            duration: 300
        });

        this.tweens.add({
            targets: this.player,
            scale: 1.3,
            duration: 100,
            yoyo: true
        });
    }

    updateCoinPosition(){
        let positions = [
            {x: 140, y: 60},
            {x: 360, y: 60},
            {x: 60, y: 140},
            {x: 440, y: 140},
            {x: 130, y: 300},
            {x: 370, y: 300}
        ];

        // remove current coin position from the array (i.e. filter)
        positions = positions.filter(coin => coin.x !== this.coin.x);

        // randomly select a position from the array
        let newPosition = Phaser.Math.RND.pick(positions);
    
        // set new position of the coin
        this.coin.setPosition(newPosition.x, newPosition.y);
    }

    addEnemy(){
        let enemy = this.enemies.create(250, -10, 'enemy');
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = Phaser.Math.RND.pick([-100 - this.score,100 + this.score]);
        enemy.body.bounce.x = 1; // enemy hits left wall, it starts moving right.

        this.time.addEvent({
            delay: 10000,
            callback: () => enemy.destroy()
        });
    }

    addMobileInputs(){
        this.moveLeft = false;
        this.moveRight = false;

        let jumpButton = this.add.sprite(470, 290, 'jumpButton');
        jumpButton.setInteractive();
        jumpButton.alpha = 0.5; // transparent
        jumpButton.on('pointerdown', this.jumpPlayer, this);

        let leftButton = this.add.sprite(30, 290, 'leftButton');
        leftButton.setInteractive();
        leftButton.alpha = 0.5; // transparent
        leftButton.on('pointerover', () => this.moveLeft = true, this);
        leftButton.on('pointerout', () => this.moveLeft = false, this);

        let rightButton = this.add.sprite(100, 290, 'rightButton');
        rightButton.setInteractive();
        rightButton.alpha = 0.5; // transparent
        rightButton.on('pointerover', () => this.moveRight = true, this);
        rightButton.on('pointerout', () => this.moveRight = false, this);
    }

    orientationChange(){
        if (this.scale.orientation === Phaser.Scale.PORTRAIT){
            this.rotateLabel.setText(' rotate your device in landscape ');
            this.scene.pause();
        } else if (this.scale.orientation === Phaser.Scale.LANDSCAPE){
            this.rotateLabel.setText('');
            this.scene.resume();
        }
    }
}

