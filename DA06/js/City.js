"use strict";

class City extends Phaser.Scene{

    constructor(){
        super('City');
    }

    create() {
        this.BG1 = this.physics.add.staticGroup();
        for(var i = 0; i < 2; i++){
            this.city = this.BG1.create(200+(i*400), 300, 'cityBG');
            this.city.setScale(1/2);
        }
        this.house = this.physics.add.sprite(600, 360, 'chouse');
        this.house.setScale(1/2);
        this.physics.world.setBounds(0, 0, 800, 600);
        this.cameras.main.setBounds(0, 0, 800, 600);
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
            this.layer = this.ground.create(32+(i*64), 568, 'brick');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        }
        this.layer1 = this.ground.create(0, 550, 'brick')
        this.layer1.setSize(64, 64);
        this.layer1.setScale(2);
        this.layer2 = this.ground.create(200, 500, 'brick')
        this.layer2.setSize(64, 64);
        this.layer2.setScale(2);
        for(var i = 0; i < 2; i++){
            this.layer = this.ground.create(400+(i*64), 400, 'brick');
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
            this.boots.setVelocityY(-500);
        }
        if(this.interactKey.isDown && this.boots.x >= 700){
            this.scene.start('Forest');
        }
    }
    main(){
        if(this.interactKey.isDown){
            this.scene.start('MainMenu');
        }
    }
}
//export default Game;