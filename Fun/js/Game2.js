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
        this.time.addEvent({delay: 5000, callback: this.idle = true, callbackScope: this});
        this.gameOver = false;
        this.guy = this.physics.add.sprite(400, 300, 'guy');
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
        this.guy.setVelocityX(0);
        if(!this.idle){
            this.guy.anims.play("guy_idle", true);
        }else{
            this.guy.anims.play("guy_yawn", true);
        }
    }
}
//export default Game;