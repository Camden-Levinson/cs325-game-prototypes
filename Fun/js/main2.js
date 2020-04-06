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
            debug: false,
            gravity: { y: 1000 },
            overlapBias: 8
        }
    }
}
var gameSettings = {
    playerSpeed: 300,
    playerJumpVelocity: -400
}

var game = new Phaser.Game(config);

//	Add the States your game has.
//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

// An object for shared variables, so that them main menu can show
// the high score if you want.

game.scene.add( 'Boot', new Boot());
game.scene.add( 'Preloader', new Preloader() );
game.scene.add( 'MainMenu', new MainMenu() );
game.scene.add( 'Game', new Game() );
game.scene.add( 'Forest', new Forest());

//	Now start the Boot state.
game.scene.start('Boot');

