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

var group;


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ghost', 'assets/LM_ghost.png');
}

function create ()
{
    this.add.aprite(400, 300, 'ghost');

    group = this.add.group({key: 'ghost', frameQuantity: 1});

    //  Display the game stats
    //info = this.add.text(10, 10, '', { font: '48px Arial', fill: '#FFFFFF' });

    //timer = this.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: this });
}

function update ()
{
    //info.setText('Points: ' + alive + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
    while(true){
        Phaser.Actions.ShiftPosition(group.getChildren(), 100, 100);
        Phaser.Actions.ShiftPosition(group.getChildren(), 700, 100);
        Phaser.Actions.ShiftPosition(group.getChildren(), 700, 500);
        Phaser.Actions.ShiftPosition(group.getChildren(), 100, 500);
    }
}

