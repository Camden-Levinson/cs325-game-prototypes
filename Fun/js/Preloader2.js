"use strict";

class Preloader extends Phaser.Scene{

    constructor(){
        super('Preloader');
    }

    preload() {
        this.ready = false;

        //  These are the assets we loaded in Boot.js
        //  A nice sparkly background and a loading progress bar
        this.background = this.add.sprite(400, 300, 'preloaderBackground');
        this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        //  This sets the preloadBar sprite as a loader sprite.
        //  What that does is automatically crop the sprite from 0 to full-width
        //  as the files below are loaded in.
        this.load.on('progress', n => this.preloadBar.setScale(n,1));

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('titlePage', 'assets/title.jpg');
        this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
        this.load.spritesheet('guy', 'assets/guy.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('boots', 'assets/Boot walk.png', {frameWidth: 173, frameHeight: 111});
        //  + lots of other required assets here
    }

    create() {

        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        
        this.anims.create({
            key: "guy_idle",
            frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "guy_yawn",
            frames: this.anims.generateFrameNumbers('guy', { start: 8, end: 11 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "guy_walk",
            frames: this.anims.generateFrameNumbers('guy', { start: 4, end: 7 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "guy_wall",
            frames: this.anims.generateFrameNumbers('guy', { start: 13, end: 14 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "guy_jump",
            frames: [ { key: 'guy', frame: 12} ],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "boot_walk",
            frames: this.anims.generateFrameNumbers('boots', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

    }

    update() {

        //  You don't actually need to do this, but I find it gives a much smoother game experience.
        //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //  You can jump right into the menu if you want and still play the music, but you'll have a few
        //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //  it's best to wait for it to decode here first, then carry on.
        
        //  If you don't have any music in your game then put the game.state.start line into the create function and delete
        //  the update function completely.
        
        if (this.ready == false)
        {
            this.ready = true;
            this.scene.start('Game');
        }

    }

}
//export default Preloader;