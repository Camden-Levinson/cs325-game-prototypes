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
        this.idle = false;
        this.timer = this.time.addEvent({delay: 10000});
        this.gameOver = false;
        this.guy = this.physics.add.sprite(400, 300, 'guy');
        this.guy.setSize(16, 32);
        this.guy.setScale(4);
        this.guy.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
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
        if(this.cursorKeys.right.isDown){
            this.guy.setVelocityX(100);
            this.guy.anims.play("guy_walk_right", true);
        }
        else{
            this.guy.setVelocityX(0);
            this.guy.anims.play("guy_idle", true);
        }
    }
}
//export default Game;