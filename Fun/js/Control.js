"use strict";

class Control extends Phaser.Scene{

    constructor(){
        super('Control');
    }

    create() {
        this.add.text(100, 100, "Left and Right Arrow keys to move\nUp Arrow to jump\nSpace to interact", { font: '48px Arial', fill: '#000000' });
        this.back = this.add.image(100, 450, 'buttons');
        this.back.setCrop(0, 100, 100, 50);
        this.back.setScale(1.5);
        this.back.setInteractive();
        this.back.on('pointerdown', () => this.scene.start('MainMenu'));
    }

    update() {
        

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        
    }
}