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
        this.load.image('Link', 'assets/title.jpg');
        this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
        this.load.spritesheet('guy', 'assets/guy.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('grass', 'assets/Grass.png');
        this.load.image('brick', 'assets/Brick.png');
        this.load.image('sand', 'assets/Sand.png');
        this.load.spritesheet('boots', 'assets/Bootswalk1.png', {frameWidth: 173, frameHeight: 419});
        this.load.image('girl', 'assets/Character.png');
        this.load.image('cityBG', 'assets/CityBG.png');
        this.load.image('forestBG', 'assets/ForestBG.png');
        this.load.image('lakeBG', 'assets/LakeBG.png');
        this.load.image('mountainBG', 'assets/Mountain.png');
        this.load.image('overworld', 'assets/Overworld.png');
        this.load.image('start', 'assets/Start.png');
        this.load.image('control', 'assets/Control.png');
        this.load.image('back', 'assets/Back.png');
        this.load.image('house', 'assets/House1.png');
        this.load.image('fhouse', 'assets/FHouse.png');
        this.load.image('mhouse', 'assets/MHouse.png');
        this.load.image('chouse', 'assets/CHouse.png');
        this.load.image('lhouse', 'assets/LHouse.png');
        this.load.image('tin', 'assets/TentIn.png');
        this.load.image('hin', 'assets/HouseIn.png');
        this.load.image('fin', 'assets/FlowerIn.png');
        this.load.image('cin', 'assets/CaveIn.png');
        this.load.image('key', 'assets/Key.png');
        this.load.image('gate', 'assets/Gate.png');
        this.load.image('rock', 'assets/Rock.png');
        this.load.image('pick', 'assets/Pickaxe.png');
        this.load.image('tree', 'assets/Tree.png');
        this.load.image('lock', 'assets/Lock.png');
        this.load.image('lumber', 'assets/Lumber.png');
        this.load.image('plant', 'assets/Plant.png');
        this.load.image('nook', 'assets/Nook.png');
        this.load.image('smith', 'assets/Smith.png');
        this.load.image('c', 'assets/Char_world.png');
        this.load.image('banner', 'assets/Banner.png');
        //  + lots of other required assets here
    }

    create() {

        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        
        this.anims.create({
            key: "boot_walk",
            frames: this.anims.generateFrameNumbers('boots', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: "boot_side",
            frames: [ { key: 'boots', frame: 8 } ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: "boot_forward",
            frames: [ { key: 'boots', frame: 9 } ],
            frameRate: 4,
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