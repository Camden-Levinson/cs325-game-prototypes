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
var sky;

function preload ()
{
    this.load.image('bg', 'assets/sky4.png');
    this.load.image('crate', 'assets/crate.png');
}

function create ()
{
    //  How many crates can you click on in 10 seconds?
    this.add.sprite(400, 300, 'bg');

    //  Create a bunch of images
    //for (var i = 0; i < 64; i++)
    //{
    var x = Phaser.Math.Between(0, 800);
    var y = Phaser.Math.Between(0, 600);

    var box = this.add.sprite(x, y, 'crate');

    //  Make them all input enabled
    box.setInteractive();

    //  The images will dispatch a 'clicked' event when they are clicked on
    box.on('clicked', clickHandler, this);

    //}

    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);

    //  Display the game stats
    info = this.add.text(10, 10, '', { font: '48px Arial', fill: '#FFFFFF' });

    timer = this.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: this });
}

function update ()
{
    info.setText('Points: ' + alive + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
}

function clickHandler (box)
{
    alive++;

    box.off('clicked', clickHandler);
    box.input.enabled = false;
    box.setVisible(false);
    var x = Phaser.Math.Between(0, 800);
    var y = Phaser.Math.Between(0, 600);

    var box = this.add.sprite(x, y, 'crate');

    //  Make them all input enabled
    box.setInteractive();

    //  The images will dispatch a 'clicked' event when they are clicked on
    box.on('clicked', clickHandler, this);

}

function gameOver ()
{
    this.input.off('gameobjectup');
}
