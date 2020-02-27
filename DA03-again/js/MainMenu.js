"use strict";

class MainMenu extends Phaser.Scene {

    constructor(){
        super('mainmenu');
    }
    
    startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        this.scene.start('Game');

    }
    
    create() {

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        music = this.add.audio('titleMusic');
        music.play();

        this.add.sprite(0, 0, 'titlePage');

        playButton = this.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');

    }

    update() {

        //	Do some nice funky main menu effect here

    }
}
export default MainMenu;
