"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        var GameScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function GameScene ()
        {
            Phaser.Scene.call(game, { key: 'gameScene', active: true });

            game.player = null;
            game.cursors = null;
            game.score = 0;
            game.scoreText = null;
        },

        create: function ()
        {
            game.add.image(400, 300, 'sky');

            var platforms = game.physics.add.staticGroup();

            platforms.create(400, 568, 'ground').setScale(2).refreshBody();

            platforms.create(600, 400, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(750, 220, 'ground');

            var player = game.physics.add.sprite(100, 450, 'dude');

            player.setBounce(0.2);
            player.setCollideWorldBounds(true);

            game.anims.create({
                key: 'left',
                frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            game.anims.create({
                key: 'turn',
                frames: [ { key: 'dude', frame: 4 } ],
                frameRate: 20
            });

            game.anims.create({
                key: 'right',
                frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            game.cursors = game.input.keyboard.createCursorKeys();

            var stars = game.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });

            stars.children.iterate(function (child) {

                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });

            game.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            game.physics.add.collider(player, platforms);
            game.physics.add.collider(stars, platforms);

            game.physics.add.overlap(player, stars, game.collectStar, null, game);

            game.player = player;
        },

        update: function ()
        {
            var cursors = game.cursors;
            var player = game.player;

            if (cursors.left.isDown)
            {
                player.setVelocityX(-160);

                player.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);

                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);

                player.anims.play('turn');
            }

            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
        },

        collectStar: function (player, star)
        {
            star.disableBody(true, true);

            game.score += 10;
            game.scoreText.setText('Score: ' + game.score);
        }

    });

    var config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: GameScene
    };

};
