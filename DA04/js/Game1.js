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
        this.music = this.sound.add('titleMusic');
        this.music.play();
        this.numberofLinks = 0;
        this.timer = this.time.addEvent({delay: 10000, callback: this.Full, callbackScope: this, repeat: 20, paused: true});
        this.info = this.add.text(800, 300, 'Belly Empty\n Number of Links eaten: ' + this.numberofLinks, { font: '12px Arial', fill: '#000000' });
        this.full = false;
        this.facing = "right";
        this.attacking = false;
        this.gameOver = false;
        this.gameOver2 = false;
        this.physics.world.setBounds(0, 0, 1600, 600);
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.ground = this.physics.add.staticGroup();
        this.ground.enableBody = true;
        for(var i = 0; i < 30; i++){
            this.layer = this.ground.create(-32+(64*(i+1)), 600-16, 'ground');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
            this.layer.body.immovable = true;
        }
        
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.chicken = this.physics.add.sprite(400, 100, 'chicken');
        this.chicken.setBounce(0.2);
        this.chicken.setActive(true);
        this.chicken.setCollideWorldBounds(true);
        this.chicken.setSize(32, 32);
        this.chicken.setScale(2);
        this.Link = this.physics.add.sprite(600, 100, 'Link');
        //this.Link.setCollideWorldBounds(true);
        this.Link.setSize(32, 64);
        this.Link.setScale(2);
        this.cameras.main.startFollow(this.chicken, true, 1.00, 1.00);
        this.egg = this.physics.add.sprite(0, 510, 'egg');
        this.egg.setActive(true);
        //this.cameras.main.setZoom(1.25);
        this.physics.add.collider(this.ground, this.Link);
        this.physics.add.collider(this.ground, this.chicken);
        this.physics.add.collider(this.ground, this.egg);
        this.physics.add.overlap(this.chicken, this.Link, this.action, null, this);
        this.physics.add.overlap(this.egg, this.Link, this.slow, null, this);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if(!this.gameOver2){
            if(this.Link.x > this.chicken.x){
                this.Link.anims.play("Link_left", true);
                this.Link.setVelocityX(-50-(this.numberofLinks*5));
            }
            else if(this.Link.x < this.chicken.x){
                this.Link.anims.play("Link_right", true);
                this.Link.setVelocityX(50+(this.numberofLinks*5));
            }else if(this.Link.x == this.chicken.x){
                this.Link.setVelocityX(0);
                this.Link.anims.play("Link_win", true);
            }
        }
        this.info.setX(this.chicken.x-30);
        if(this.full){
            this.info.setText('Belly Full, time to digest: ' + Math.round(10000-this.timer.getElapsed())/1000 + '\n Number of Links eaten: ' + this.numberofLinks);
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
        if (this.cursorKeys.left.isDown) {
            this.attacking = false;
            this.facing = "left";
            this.chicken.setVelocityX(-200);
            this.chicken.anims.play("chicken_left", true);
        }
        else if (this.cursorKeys.right.isDown) {
            this.attacking = false;
            this.facing = "right";
            this.chicken.setVelocityX(200);
            this.chicken.anims.play("chicken_right", true);
        }
        else {
            this.attacking = false;
            this.chicken.setVelocityX(0);
            this.chicken.anims.play("chicken_idle", true);
        }
        if(this.attackKey.isDown && this.full != true){
            this.attacking = true;
            if(this.facing == "left"){
                this.chicken.anims.play("chicken_left_attack", true);
            }else if(this.facing == "right"){
                this.chicken.anims.play("chicken_right_attack", true);
            }
        }
        if(this.cursorKeys.up.isDown && this.chicken.y == 520){
            this.chicken.setVelocityY(-700);
        }
        if(this.cursorKeys.down.isDown){
            this.egg.setVisible(true);
            this.egg.x = this.chicken.x;
            this.egg.y = this.chicken.y;
        }
        
    }
    slow(){
        this.gameOver2 = true;
        this.Link.setVelocityX(0);
        this.Link.anims.stop();
        this.egg.destroy();
        this.time.addEvent({delay: 3000, callback: this.reset, callbackScope: this});
    }
    reset(){
        this.egg = this.physics.add.sprite(this.chicken.x, this.chicken.y, 'egg');
        this.egg.setVisible(false);
        this.physics.add.collider(this.ground, this.egg);
        this.physics.add.overlap(this.egg, this.Link, this.slow, null, this);
        this.gameOver2 = false;
    }
    action(){
        if(this.attacking){
            this.gameOver2 = true;
            this.Link.anims.stop();
            this.Link.destroy();
            if(this.numberofLinks <= 11){
                this.spawnLink();
            }
        }else{
            this.music.stop();
            this.gameOver = true;
            this.gameOver2 = true;
            this.full = false;
            this.cameras.main.startFollow(this.Link, true, 1.00, 1.00);
            this.Link.setVelocityX(0);
            this.Link.anims.play("Link_win", true);
            this.info.setText('YOU DIED')
            this.chicken.destroy();
            this.time.addEvent({delay: 5000, callback: this.quitGame, callbackScope: this});
        }
    }
    spawnLink(){
        if(this.numberofLinks <= 10){
            this.full = true;
            this.timer.paused = false;
            this.numberofLinks += 1;
            this.Link = this.physics.add.sprite(Phaser.Math.Between(100, 1500), 100, 'Link');
            this.physics.add.collider(this.ground, this.Link);
            //this.Link.setCollideWorldBounds(true);
            this.Link.setSize(32, 64);
            this.Link.setScale(2);
            this.physics.add.overlap(this.chicken, this.Link, this.action, null, this);
            this.gameOver2 = false;
        }else{
            this.music.stop();
            this.info.setText("You got your revenge");
            this.time.addEvent({delay: 5000, callback: this.quitGame, callbackScope: this});
        }
    }
    Full(){
        this.timer.paused = true;
        this.full = false;
        this.info.setText("Belly Empty\n Number of Links eaten: " + this.numberofLinks);
    }
}
//export default Game;