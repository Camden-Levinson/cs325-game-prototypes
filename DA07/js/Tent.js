"use strict";

var hasKey3 = false;
var hasBlanket = false;
var hasTask = false;

class Tent extends Phaser.Scene{

    constructor(){
        super('Tent');
    }

    create() {
        //this.add.text(50, 100, "Congrats you have made it through the city and forest\nCome back next week for a content update", { font: '24px Arial', fill: '#000000' });
        //this.add.text(50, 400, "Enter house to go\nback to Main Menu", { font: '24px Arial', fill: '#000000' });
        this.tent = this.add.image(400, 300, 'tin');
        this.ground = this.physics.add.staticGroup();
        this.nook = this.physics.add.image(320, 380, 'nook');
        this.nook.body.setAllowGravity(false);
        this.nook.setScale(1/2);
        this.physics.world.setBounds(0, 0, 800, 800);
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.boots = this.physics.add.sprite(400, 530, 'boots');
        this.boots.body.setAllowGravity(false);
        this.boots.setScale(1/3);
        this.boots.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /*for(var i = 0; i < 1600/64; i++){
            this.layer = this.ground.create(32+(i*64), 568, 'grass');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        this.physics.add.collider(this.boots, this.ground);
        this.physics.add.collider(this.house, this.ground);*/
        this.physics.add.overlap(this.boots, this.nook, this.main, null, this);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if(this.boots.y > 700){
            this.scene.start('Lake');
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
            this.boots.x += 5;
            this.boots.y += 5;
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.down.isDown && this.cursorKeys.left.isDown){
            this.boots.x -= 5;
            this.boots.y += 5;
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.up.isDown && this.cursorKeys.right.isDown){
            this.boots.x += 5;
            this.boots.y -= 5;
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.up.isDown && this.cursorKeys.left.isDown){
            this.boots.x -= 5;
            this.boots.y -= 5;
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.left.isDown){
            this.boots.x -= 5;
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.right.isDown){
            this.boots.x += 5;
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
        }else if(this.cursorKeys.down.isDown){
            this.boots.flipX = false;
            this.boots.y += 5;
            this.boots.anims.play("boot_forward", true);
        }else if(this.cursorKeys.up.isDown){
            this.boots.y -= 5;
        }else{
            this.boots.anims.play("boot_side", true);
        }
    }
    main(){
        if(this.interactKey.isDown){
            if(hasCup){
                hasBlanket = true;
                this.add.text(0, 0, "Got Blanket", { font: '24px Arial', fill: '#FFFFFF' });
            }
            if(!hasTask && !hasCup && returnPick && hasKey2){
                hasTask = true;
                this.add.text(0, 0, "Need Wood, Iron, and Stone", { font: '24px Arial', fill: '#FFFFFF' });
            }
            if(hasStone && hasWood && hasIron){
                hasKey3 = true;
                this.add.text(0, 0, "Got Key", { font: '24px Arial', fill: '#FFFFFF' });
            }
        }
    }
}