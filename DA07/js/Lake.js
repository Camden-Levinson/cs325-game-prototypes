"use strict";
function addBlock(x, y, ground){
    game.layer = ground.create(x, y, 'grass');
    game.layer.setSize(64, 64);
    game.layer.setScale(2);
}

class Lake extends Phaser.Scene{

    constructor(){
        super('Lake');
    }

    create() {
        this.BG = this.physics.add.staticGroup();
        for(var i = 0; i < 4; i++){
            this.lake = this.BG.create(200+(i*400), 300, 'lakeBG');
            this.lake.setScale(1/2);
        }
        this.house = this.physics.add.sprite(600, 360, 'lhouse');
        this.house.setScale(1/2);
        this.physics.world.setBounds(0, 0, 1690, 600);
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.boots = this.physics.add.sprite(100, 400, 'boots');
        this.boots.setScale(1/2);
        this.boots.setCollideWorldBounds(true);
        this.facing = "right";
        this.gameOver = false;
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.startFollow(this.boots, true, 1.00, 1.00);
        this.ground = this.physics.add.staticGroup();
        for(var i = 0; i < 1600/64; i++){
            this.layer = this.ground.create(32+(i*64), 568, 'sand');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        }
        this.physics.add.collider(this.boots, this.ground);
        this.physics.add.collider(this.house, this.ground);
        this.physics.add.overlap(this.house, this.boots, this.main, null, this);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        
    }
    playerMovementManager() {
        // Directional movement
        if(this.cursorKeys.left.isDown){
            this.facing = "left";
            this.boots.setVelocityX(-400);
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
            
        }else if(this.cursorKeys.right.isDown){
            this.facing = "right";
            this.boots.setVelocityX(400);
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else{
            this.boots.setVelocityX(0);
        }
        if(this.cursorKeys.up.isDown && this.boots.body.touching.down){
            this.boots.setVelocityY(-600);
        }
        if(this.boots.x >= 1640){
            this.scene.start('Overworld');
        }
    }
    main(){
        if(this.interactKey.isDown){
            this.scene.start('Tent');
        }
    }
}
//export default Game;