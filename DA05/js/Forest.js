"use strict";
function addBlock(x, y, ground){
    game.layer = ground.create(x, y, 'grass');
    game.layer.setSize(64, 64);
    game.layer.setScale(2);
}
class Forest extends Phaser.Scene{

    constructor(){
        super('Forest');
    }
    

    create() {
        this.BG2 = this.physics.add.staticGroup();
        for(var i = 0; i < 2; i++){
            this.forest = this.BG2.create((i*400), 300, 'forestBG');
            this.forest.setScale(1/2);
        }
        this.physics.world.setBounds(0, -200, 800, 800);
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.boots = this.physics.add.sprite(100, 400, 'boots');
        this.boots.setScale(1/2);
        this.boots.setCollideWorldBounds(true);
        this.facing = "right";
        this.gameOver = false;
        this.ground = this.physics.add.staticGroup();
        for(var i = 0; i < 1600/64; i++){
            this.layer = this.ground.create(32+(i*64), 568, 'grass');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        }
        addBlock(0, 550, this.ground);
        addBlock(200, 400, this.ground);
        addBlock(0, 250, this.ground);
        for(var i = 1; i < 8; i++){
            addBlock(300, 568-(i*64), this.ground);
        }
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.startFollow(this.boots, true, 1.00, 1.00);
        this.physics.add.collider(this.boots, this.ground);
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
            this.scene.start('End');
        }
    }
}
//export default Game;