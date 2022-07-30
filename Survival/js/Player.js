export default class Player extends Phaser.Physics.Matter.Sprite {
    
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter; // enable us to create our own colliders
        var playerCollider = Bodies.circle(this.x, this.y, 12,{isSensor: false, label: 'playerCollider'});
        var playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: 'playerSensor'});
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35
        });

        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('player', 'assets/player.png', 'assets/player_atlas.json');
        scene.load.animation('player_anim', 'assets/player_anim.json');
    }

    move(){
            // let movingLeft = this.inputKeys.left.isDown;
            // let movingRight = this.inputKeys.right.isDown;
            // let movingUp = this.inputKeys.up.isDown;
            // let movingDown = this.inputKeys.down.isDown;
        
            const speed = 1.5;
            let playerVelocity = new Phaser.Math.Vector2();
    
            if (this.inputKeys.left.isDown) {
                playerVelocity.x = -1;
            } else if (this.inputKeys.right.isDown){
                playerVelocity.x = 1;
            }
    
            if (this.inputKeys.up.isDown) {
                playerVelocity.y = -1;
            } else if (this.inputKeys.down.isDown){
                playerVelocity.y = 1;
            }
    
            playerVelocity.normalize();
            playerVelocity.scale(speed); // multiplying unit vector * speed
    
            this.setVelocity(playerVelocity.x, playerVelocity.y);

            // sprite objects have a body object
            if(Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity) > 0){
                this.anims.play('player_walk', true);
            } else {
                this.anims.play('player_idle', true);
            }
    }s
}