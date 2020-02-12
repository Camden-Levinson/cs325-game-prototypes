
function make(game){
    function preload ()
    {
        game.load.image('bg', 'assets/sky4.png');
        game.load.image('crate', 'assets/crate.png');
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

    function clickHandler (box)
    {
        alive--;

        box.off('clicked', clickHandler);
        box.input.enabled = false;
        box.setVisible(false);
    }

    function gameOver ()
    {
        game.input.off('gameobjectup');
    }
    return { "preload": preload, "create": create, "update": update };
}
window.onload = function() {
        var config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var info;
    var timer;
    var alive = 0;

    var game = new Phaser.Game(config);
    
    game.state.add( "main", make( game ) );
    
    game.state.start( "main" );
};