"use strict";

class Overworld extends Phaser.Scene{

    constructor(){
        super('Overworld');
    }

    create() {
        this.gameOver = false;
        this.map = this.add.image(400, 300, 'overworld');
        this.char = this.add.image(400, 300, 'c');
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 800, 600);
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
            this.char.x -= 10;
            
        }else if(this.cursorKeys.right.isDown){
            this.char.x += 10;
        }else if(this.cursorKeys.down.isDown){
            this.char.y += 10;
        }else if(this.cursorKeys.up.isDown){
            this.char.y -= 10;
        }
    }
}
//export default Game;