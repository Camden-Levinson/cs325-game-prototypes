"use strict";

class Overworld extends Phaser.Scene{

    constructor(){
        super('Overworld');
    }
    //City: 271 389, 345 463
    //Forest: 624 188, 667 272
    //Lake: 544 390, 606 444
    //Mountain: 407 157, 466 218

    create() {
        this.gameOver = false;
        this.map = this.add.image(400, 300, 'overworld');
        this.char = this.add.image(400, 300, 'c');
        this.char.setScale(4);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 800, 600);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if((this.char.x >= 271 && this.char.x <= 345) && (this.char.y >= 389 && this.char.y <= 463)){
            this.scene.start('City');
        }
        if((this.char.x >= 624 && this.char.x <= 667) && (this.char.y >= 188 && this.char.y <= 272)){
            this.scene.start('Forest');
        }
        if((this.char.x >= 544 && this.char.x <= 606) && (this.char.y >= 390 && this.char.y <= 444)){
            this.scene.start('Lake');
        }
        if((this.char.x >= 407 && this.char.x <= 466) && (this.char.y >= 157 && this.char.y <= 218)){
            this.scene.start('Mountain');
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
        
        if(this.cursorKeys.down.isDown && this.cursorKeys.right.isDown){
            this.char.x += 5;
            this.char.y += 5;
        }else if(this.cursorKeys.down.isDown && this.cursorKeys.left.isDown){
            this.char.x -= 5;
            this.char.y += 5;
        }else if(this.cursorKeys.up.isDown && this.cursorKeys.right.isDown){
            this.char.x += 5;
            this.char.y -= 5;
        }else if(this.cursorKeys.up.isDown && this.cursorKeys.left.isDown){
            this.char.x -= 5;
            this.char.y -= 5;
        }else if(this.cursorKeys.left.isDown){
            this.char.x -= 5;
        }else if(this.cursorKeys.right.isDown){
            this.char.x += 5;
        }else if(this.cursorKeys.down.isDown){
            this.char.y += 5;
        }else if(this.cursorKeys.up.isDown){
            this.char.y -= 5;
        }
    }
}
//export default Game;