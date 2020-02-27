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
        this.numCat = 0;
        this.gameOver = false;
        this.win = false;

        this.info = this.add.text(400, 300, 'Number of Cats you have = ' + this.numCat, { font: '12px Arial', fill: '#FFFFFF' });

        this.timer = this.time.addEvent({ delay: 20000, callback: this.gameOver, callbackScope: this });
        this.timer2 = this.time.addEvent({ delay: 30000, callback: this.gameOver, callbackScope: this });

        this.timeInfo = this.add.text(400, 350, 'Timer: ' + 20 + ' seconds', { font: '12px Arial', fill: '#FFFFFF' });

        this.cameras.main.setBounds(0, 0, 800, 600);

        this.guy = this.physics.add.sprite(400, 500, 'guy');
        this.guy.setCollideWorldBounds(true);
        this.guy.setSize(32, 73);
        this.guy.setScale(2);

        this.cat = this.physics.add.sprite(Phaser.Math.Between(300, 500), 0, 'cat');
        this.cat.setCollideWorldBounds(true);

        //this.add.sprite(400, 300, 'tree');

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.guy, this.cat);
        this.physics.add.overlap(this.cat, this.guy, this.newCat, null, this);
    }

    update() {
        if (this.numCat == 15 && this.timer.getElapsed() < 20000) {
            this.winGame();
        }
        else if(this.timer.getElapsed() >= 20000){
            this.gameDone();
        }
        if(!this.gameOver){
            this.playerMovementManager();
        this.timeInfo.setText("Timer: " + Math.round(20000-this.timer.getElapsed())/1000 + " seconds");
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
            this.guy.x -= 4;
            //this.guy.setVelocityX(-this.gameSettings.playerSpeed);
            //this.guy.anims.play("player_left", true);
        }
        else if (this.cursorKeys.right.isDown) {
            this.guy.x += 4;
            //this.guy.anims.play("player_right", true);
        }
        else {
            this.guy.setVelocityX(0);
            //this.guy.anims.play("player_idle", true);
        }
    }
    newCat(){
        this.numCat += 1;
        this.info.setText("Number of Cats you have = " + this.numCat);
        this.cat.x = Phaser.Math.Between(0, 800);
        this.cat.y = 0;
    }
    gameDone(){
        this.gameOver = true;
        this.info.setVisible(false);
        this.timeInfo.setVisible(false);
        this.guy.setVisible(false);
        this.cat.setVisible(false);
        if(!this.win){
            this.add.text(400, 300, 'YOU FAILED TO GET ALL YOUR CATS', { font: '12px Arial', fill: '#FFFFFF' });
        }
        if(this.timer2.getElapsed() >= 30000){
            this.scene.start('MainMenu');
        }
    }
    winGame(){
        this.win = true;
        this.info.setVisible(false);
        this.timeInfo.setVisible(false);
        this.guy.setVisible(false);
        this.cat.setVisible(false);
        this.add.text(400, 300, 'YOU RESCUED ALL YOUR CATS', { font: '12px Arial', fill: '#FFFFFF' });
    }
}
//export default Game;