import Boot from './Boot.js'
import Preloader from './Preloader.js'
import MainMenu from './MainMenu.js'
import Game from './Game.js'

//	Create your Phaser game and inject it into the 'game' div.
//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );

//	Add the States your game has.
//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

// An object for shared variables, so that them main menu can show
// the high score if you want.

game.scene.add( 'Boot', new Boot() );
game.state.add( 'Preloader', new Preloader() );
game.state.add( 'MainMenu', new MainMenu );
game.state.add( 'Game', new Game() );

//	Now start the Boot state.
game.state.start('Boot');

