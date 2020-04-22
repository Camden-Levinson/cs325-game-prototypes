//import Boot from './Boot.js'
//import Preloader from './Preloader.js'
//import MainMenu from './MainMenu.js'
//import Game from './Game.js'

//	Create your Phaser game and inject it into the 'game' div.
//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
var config = {
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: 0x98D9EA,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 1000 },
            overlapBias: 1
        }
    }
}

var game = new Phaser.Game(config);

//	Add the States your game has.
//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

// An object for shared variables, so that them main menu can show
// the high score if you want.

game.scene.add( 'Boot', new Boot());
game.scene.add( 'Preloader', new Preloader() );
game.scene.add( 'MainMenu', new MainMenu() );
game.scene.add( 'City', new City() );
game.scene.add( 'House', new House());
game.scene.add( 'Forest', new Forest());
game.scene.add( 'Lake', new Lake());
game.scene.add( 'Mountain', new Mountain());
game.scene.add( 'Overworld', new Overworld());
game.scene.add('Control', new Control());
game.scene.add('End', new End());
//	Now start the Boot state.
game.scene.start('Boot');

