"use strict";

class MainMenu extends Phaser.Scene {

    constructor(){
        super('MainMenu');
    }
    
    startGame(music) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();
        //	And start the actual game
        this.scene.start('Tent');

    }
    
    create() {

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        var music = this.sound.add('titleMusic');
        music.mute = true;
        music.mute = false;
        music.play();

        this.add.sprite(700, 300, 'girl');
        this.start = this.add.image(200, 425, 'start');
        this.start.setScale(1.5);
        this.controls = this.add.image(200, 525, 'control');
        this.controls.setScale(1.5);
        this.add.text(50, 100, 'Legend of the\n \n Dark Wanderer', { font: '56px Arial', fill: '#000000' });
        //this.add.text(100, 500, 'Space to eat\narrow keys to move and jump',{ font: '18px Arial', fill: '#000000' });
        //var playButton = this.add.text( 100, 450, 'Start Game', { font: '48px Arial', fill: '#000000' });
        this.start.setInteractive();
        this.start.on('pointerdown', () => this.startGame(music));
        this.controls.setInteractive();
        this.controls.on('pointerdown', () => this.control(music));

    }

    update() {

        //	Do some nice funky main menu effect here

    }
    control(music){
        music.stop();
        this.scene.start('Control');
    }
}
//export default MainMenu;
