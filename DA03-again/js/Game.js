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
        this.gameOver = false;

        this.cameras.main.setBounds(0, 0, 800, 600);

        this.guy = this.physics.add.sprite(400, 500, 'guy');
        this.guy.setCollideWorldBounds(true);
        this.guy.setSize(32, 73);
        this.guy.setScale(2);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //if (this.player.y < 400) {
        //    this.winGame();
       // }
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
        if (this.cursorKeys.left.isDown) {
            this.guy.x -= 1;
            //this.guy.setVelocityX(-this.gameSettings.playerSpeed);
            //this.guy.anims.play("player_left", true);
        }
        else if (this.cursorKeys.right.isDown) {
            this.guy.x += 1;
            //this.guy.anims.play("player_right", true);
        }
        else if (this.cursorKeys.up.isDown){
            this.guy.y += 1;
        }
        else if (this.cursorKeys.down.isDown){
            this.guy.y -= 1;
        }
        else {
            this.guy.setVelocityX(0);
            //this.guy.anims.play("player_idle", true);
        }
        if (this.jumpKey.isDown) {
            this.guy.setVelocityY(gameSettings.playerJumpVelocity);
        }
    }
}
//export default Game;