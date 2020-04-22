"use strict";

class House extends Phaser.Scene{

    constructor(){
        super('House');
    }

    create() {
        this.talked = false;
        this.add.image(200, 330, 'house');
        this.Link = this.physics.add.sprite(450, 450, 'Link')
        this.Link.setScale(1/8);
        this.physics.world.setBounds(0, 0, 890, 600);
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.boots = this.physics.add.sprite(100, 400, 'boots');
        this.boots.setScale(1/2);
        this.boots.setCollideWorldBounds(true);
        this.gameOver = false;
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.startFollow(this.boots, true, 1.00, 1.00);
        this.ground = this.physics.add.staticGroup();
        for(var i = 0; i < 1600/64; i++){
            this.layer = this.ground.create(32 + (i*64), 568, 'grass');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
            
        }
        this.physics.add.collider(this.boots, this.ground);
        this.physics.add.collider(this.Link, this.ground);
        this.physics.add.overlap(this.boots, this.Link, this.textBox, null, this);
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
            this.boots.setVelocityX(-400);
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
            
        }else if(this.cursorKeys.right.isDown){
            this.boots.setVelocityX(400);
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else{
            this.boots.setVelocityX(0);
        }
        if(this.boots.x >= 840 && this.talked == true){
            this.scene.start('Overworld');
        }
    }
    textBox(){
        if(this.interactKey.isDown && this.talked == false){
            this.add.text(this.Link.x, this.Link.y-100, 'Hello Traveler', { font: '12px Arial', fill: '#000000' });
            this.talked = true;
        }
    }
}
//export default Game;