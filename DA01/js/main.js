"use strict";

function make_main_game_state( game )
{
    var info;
    var timer;
    var alive = 0;
    function preload ()
    {
        game.load.image('bg', 'assets/skies/sky4.png');
        game.load.image('crate', 'assets/sprites/crate.png');
    }

    function create ()
    {
        //  How many crates can you click on in 10 seconds?
        game.add.image(400, 300, 'bg');

        //  Create a bunch of images
        for (var i = 0; i < 64; i++)
        {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);

            var box = game.add.image(x, y, 'crate');

            //  Make them all input enabled
            box.setInteractive();

            //  The images will dispatch a 'clicked' event when they are clicked on
            box.on('clicked', clickHandler, game);

            alive++;
        }

        //  If a Game Object is clicked on, game event is fired.
        //  We can use it to emit the 'clicked' event on the game object itself.
        game.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, game);

        //  Display the game stats
        info = game.add.text(10, 10, '', { font: '48px Arial', fill: '#000000' });

        timer = game.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: game });
    }

    function update ()
    {
        info.setText('Alive: ' + alive + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
    }

    /*function clickHandler (box)
    {
        alive--;

        box.off('clicked', clickHandler);
        box.input.enabled = false;
        box.setVisible(false);
    }

    function gameOver ()
    {
        game.input.off('gameobjectup');
    }*/
    
    return { "preload": preload, "create": create, "update": update };
}


window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
