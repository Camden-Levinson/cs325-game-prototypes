"use strict";
function addBlock(x, y, ground){
    game.layer = ground.create(x, y, 'grass');
    game.layer.setSize(64, 64);
    game.layer.setScale(2);
}
var x = 100;
var y = 400

var hasIron = false;
var hasGold = false;
class Mountain extends Phaser.Scene{

    constructor(){
        super('Mountain');
    }
    
    create() {
        this.BG2 = this.physics.add.staticGroup();
        for(var i = 0; i < 4; i++){
            this.forest = this.BG2.create(200+(i*400), 300, 'mountainBG');
            this.forest.setScale(1/2);
        }
        this.house = this.physics.add.sprite(700, 374, 'mhouse');
        this.rock = this.physics.add.image(100, 512, 'rock');
        this.rock.setScale(2);
        this.physics.world.setBounds(-100, -200, 1090, 800);
        this.cameras.main.setBounds(0, 0, 900, 600);
        this.boots = this.physics.add.sprite(x, y, 'boots');
        this.boots.setScale(1/3);
        this.boots.setCollideWorldBounds(true);
        this.facing = "right";
        this.gameOver = false;
        this.ground = this.physics.add.staticGroup();
        for(var i = 0; i < 1600/64; i++){
            this.layer = this.ground.create(32+(i*64), 568, 'grass');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        }
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.startFollow(this.boots, true, 1.00, 1.00);
        this.physics.add.collider(this.boots, this.ground);
        this.physics.add.collider(this.house, this.ground);
        this.physics.add.collider(this.rock, this.ground);
        this.physics.add.overlap(this.house, this.boots, this.main, null, this);
        this.physics.add.overlap(this.rock, this.boots, this.mine, null, this);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if(hasIron){
            this.rock.destroy();
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
            this.facing = "left";
            this.boots.setVelocityX(-400);
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
            
        }else if(this.cursorKeys.right.isDown){
            this.facing = "right";
            this.boots.setVelocityX(400);
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else{
            this.boots.setVelocityX(0);
            this.boots.anims.play("boot_side", true);
        }
        if(this.cursorKeys.up.isDown && this.boots.body.touching.down){
            this.boots.setVelocityY(-600);
        }
        if( this.boots.x >= 940 || this.boots.x < -40){
            x = 100;
            y = 400;
            this.scene.start('Overworld');
        }
    }
    main(){
        if(this.interactKey.isDown){
            x = this.boots.x;
            y = this.boots.y;
            this.scene.start('Cave');
        }
    }
    mine(){
        if(this.interactKey.isDown){
            if(hasPick){
                hasIron = true;
                hasGold = true;
                this.rock.destroy();
            }
        }
    }
}
//export default Game;