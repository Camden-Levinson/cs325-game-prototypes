"use strict";

class Game extends Phaser.Scene{

    constructor(){
        super('Game');
    }
    
    quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.scene.start('MainMenu');

    }

    create() {
        this.facing = "right";
        this.attacking = false;
        this.gameOver = false;
        this.gameOver2 = false;
        this.physics.world.setBounds(0, 0, 1600, 600);
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.ground = this.physics.add.group();
        this.ground.enableBody = true;
        for(var i = 0; i < 30; i++){
            this.layer = this.ground.create(-32+(64*(i+1)), 600-16, 'ground');
            this.layer.setScale(2);
            this.layer.setCollideWorldBounds(true);
            this.layer.body.immovable = true;
        }
        
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.chicken = this.physics.add.sprite(400, 100, 'chicken');
        this.chicken.setBounce(0.2);
        this.chicken.setActive(true);
        this.chicken.setCollideWorldBounds(true);
        this.chicken.setSize(32, 32);
        this.chicken.setScale(2);
        this.Link = this.physics.add.sprite(600, 100, 'Link');
        //this.Link.setCollideWorldBounds(true);
        this.Link.setSize(32, 64);
        this.Link.setScale(2);
        this.cameras.main.startFollow(this.chicken, true, 1.00, 1.00);
        this.cameras.main.setZoom(1.25);
        this.physics.add.collider(this.ground, this.Link);
        this.physics.add.collider(this.ground, this.chicken);
        this.physics.add.overlap(this.chicken, this.Link, this.action, null, this);
        
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if(!this.gameOver2){
            if(this.Link.x > this.chicken.x){
                this.Link.anims.play("Link_left", true);
                this.Link.setVelocityX(-50);
            }
            else if(this.Link.x < this.chicken.x){
                this.Link.anims.play("Link_right", true);
                this.Link.setVelocityX(50);
            }else if(this.Link.x == this.chicken.x){
                this.Link.anims.play("Link_win", true);
            }
        }
        if(this.gameOver2){
            this.spawnLink();
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
        if (this.cursorKeys.left.isDown) {
            this.attacking = false;
            this.facing = "left";
            this.chicken.setVelocityX(-200);
            this.chicken.anims.play("chicken_left", true);
        }
        else if (this.cursorKeys.right.isDown) {
            this.attacking = false;
            this.facing = "right";
            this.chicken.setVelocityX(200);
            this.chicken.anims.play("chicken_right", true);
        }
        else {
            this.attacking = false;
            this.chicken.setVelocityX(0);
            this.chicken.anims.play("chicken_idle", true);
        }
        if(this.attackKey.isDown){
            this.attacking = true;
            if(this.facing == "left"){
                this.chicken.anims.play("chicken_left_attack", true);
            }else if(this.facing == "right"){
                this.chicken.anims.play("chicken_right_attack", true);
            }
        }
        if(this.cursorKeys.up.isDown && this.chicken.y == 504){
            this.chicken.setVelocityY(-700);
        }
        
    }
    action(){
        if(this.attacking){
            this.gameOver2 = true;
            this.Link.anims.stop();
            this.Link.destroy();
        }else{
            this.gameOver = true;
            this.chicken.x = 850;
            this.chicken.destroy();
        }
    }
    spawnLink(){
        this.Link = this.physics.add.sprite(0, 100, 'Link');
        this.physics.add.collider(this.ground, this.Link);
        //this.Link.setCollideWorldBounds(true);
        this.Link.setSize(32, 64);
        this.Link.setScale(2);
        this.physics.add.overlap(this.chicken, this.Link, this.action, null, this);
        this.gameOver2 = false;
    }
    addGround(i){
        this.ground.create(800-(64*(1+i)), 600-32, 'ground');
    }
}
//export default Game;