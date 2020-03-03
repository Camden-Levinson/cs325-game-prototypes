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
        this.gameOver = false;
        this.physics.world.setBounds(0, 0, 800, 600);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.chicken = this.physics.add.sprite(400, 500, 'chicken');
        this.chicken.setActive(true);
        this.chicken.setCollideWorldBounds(true);
        this.chicken.setSize(32, 32);
        this.chicken.setScale(2);

        
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
        if (this.cursorKeys.left.isDown) {
            this.facing = "left";
            this.chicken.x -= 4;
            //this.guy.setVelocityX(-this.gameSettings.playerSpeed);
            this.chicken.anims.play("chicken_left", true);
        }
        else if (this.cursorKeys.right.isDown) {
            this.facing = "right";
            this.chicken.x += 4;
            this.chicken.anims.play("chicken_right", true);
        }
        else {
            //this.chicken.setVelocityX(0);
            this.chicken.anims.play("chicken_idle", true);
        }
    }
}
//export default Game;