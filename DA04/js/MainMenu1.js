"use strict";

class MainMenu extends Phaser.Scene {

    constructor(){
        super('MainMenu');
    }
    
    startGame(music) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        this.scene.start('Game');

    }
    
    create() {

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        var music = this.sound.add('titleMusic');
        music.play();

        this.add.sprite(400, 300, 'titlePage');
        this.add.text(400, 50, 'Chicken Revenge', { font: '48px Arial', fill: '#000000' });
        var playButton = this.add.text( 600, 500, 'Start Game', { font: '18px Arial', fill: '#000000' });
        playButton.setInteractive();
        playButton.on('pointerdown', () => this.startGame(music));

    }

    update() {

        //	Do some nice funky main menu effect here

    }
}
//export default MainMenu;
