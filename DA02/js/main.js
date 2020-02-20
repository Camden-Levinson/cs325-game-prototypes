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

var follower;
var path;
var graphics;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ghost', 'assets/LM_ghost.png');
}

function create ()
{
    this.add.sprite(400, 300, 'ghost');

    graphics = this.add.graphics();

    follower = { t: 0, vec: new Phaser.Math.Vector2() };

    //  The curves do not have to be joined
    var line1 = new Phaser.Curves.Line([ 100, 100, 700, 100 ]);
    var line2 = new Phaser.Curves.Line([ 700, 100, 700, 500 ]);
    var line3 = new Phaser.Curves.Line([ 700, 500, 100, 500 ]);
    var line4 = new Phaser.Curves.Line([ 100, 500, 100, 100 ]);

    path = this.add.path();

    // path = new Phaser.Curves.Path();

    path.add(line1);
    path.add(line2);
    path.add(line3);
    path.add(line4);

    this.tweens.add({
        targets: follower,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        yoyo: false,
        repeat: -1
    });
    var player = this.add.sprite(400, 300, 'ghost');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    /*graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);

    //path.draw(graphics);

    path.getPoint(follower.t, follower.vec);
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(follower.vec.x - 8, follower.vec.y - 8, 16, 16);*/
    var cursors = this.cursors;
    var player = this.player;
    if(cursors.left.isDown){
        player.x = 300;
    }
}

