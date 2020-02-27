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

        this.guy = this.add.sprite(400, 500);
    }

    update() {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = this.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
}
//export default Game;