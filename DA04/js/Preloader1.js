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
        this.load.image('ground', 'assets/ground.png');
        this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
        this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
        this.load.spritesheet('chicken', 'assets/Chicken.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('Link', 'assets/Link.png', {frameWidth: 32, frameHeight: 64});
        this.load.image('egg', 'assets/egg.png');
        //  + lots of other required assets here
    }

    create() {

        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        
        this.anims.create({
            key: "chicken_idle",
            frames: [ { key: 'chicken', frame: 0} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "chicken_left",
            frames: [ { key: 'chicken', frame: 1} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "chicken_right",
            frames: [ { key: 'chicken', frame: 2 } ],
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "chicken_left_attack",
            frames: [ { key: 'chicken', frame: 3 } ],
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: "chicken_right_attack",
            frames: [ { key: 'chicken', frame: 4 } ],
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: "Link_left",
            frames: this.anims.generateFrameNumbers('Link', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "Link_right",
            frames: this.anims.generateFrameNumbers('Link', { start: 7, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "Link_win",
            frames: [{key: 'Link', frame: 8}],
            frameRate: 5,
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
            this.scene.start('MainMenu');
        }

    }

}
//export default Preloader;