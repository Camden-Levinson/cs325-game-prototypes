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
        this.boots = this.add.sprite(400, 300, 'boots');
        this.boots.setScale(1/3);
        this.idle = false;
        this.facing = "right";
        this.timer = this.time.addEvent({delay: 10000});
        this.gameOver = false;
        this.guy = this.physics.add.sprite(400, 300, 'guy');
        this.guy.setSize(16, 32);
        this.guy.setScale(4);
        this.guy.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.ground = this.physics.add.staticGroup();
        this.ground.enableBody = true;
        for(var i = 0; i < 2; i++){
            this.layer = this.ground.create(-32+(64*(i+1)), 300, 'ground');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
            this.layer.immovable = true;
        }
        this.physics.add.collider(this.ground, this.guy);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        /*if(this.gameOver2 && !this.gameOver){
            this.spawnLink();
        }*/
        

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
            this.guy.setVelocityX(-400);
            this.guy.flipX = true;
            this.guy.anims.play("guy_walk", true);
        }else if(this.cursorKeys.right.isDown){
            this.facing = "right";
            this.boots.setVelocityX(400);
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.up.isDown){
            this.guy.setVelocityX(0);
            if(this.facing == "left"){
                this.guy.flipX = true;
            }
            if(this.guy.x == 768 || this.guy.x == 32){
                this.guy.setVelocityY(-100);
            }
            this.guy.anims.play("guy_wall", true);
        }
        else{
            this.guy.setVelocityX(0);
            this.guy.anims.play("guy_idle", true);
        }
        if(!this.guy.body.onFloor()){
            if(this.cursorKeys.left.isDown){
                this.facing = "left"
                this.guy.setVelocityX(-400);
            }else if(this.cursorKeys.right.isDown){
                this.facing = "right";
                this.guy.setVelocityX(400);
            }
        }
        if(!this.guy.body.onFloor() && !(this.guy.x == 768 || this.guy.x == 32)){
            this.guy.anims.play("guy_jump", true);
        }
        if(this.jumpKey.isDown && this.guy.body.onFloor()){
            if(this.facing == "left"){
                this.guy.flipX = true;
            }
            this.guy.setVelocityY(-300);
            this.guy.anims.play("guy_jump", true);
        }
    }
}
//export default Game;