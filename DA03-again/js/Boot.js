"use strict";

class Boot extends Phaser.Scene{

    constructor(){
        super('Boot');
    }

    /*init() {

        //  Unless you specifically know your this needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the this is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the this, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    }*/

    preload() {

        //  Here we load the assets required for our Preloader state (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/preloader_background.jpg');
        this.load.image('preloaderBar', 'assets/preloader_bar.png');

    }

    create() {

        //  By this point the preloader assets have loaded to the cache, we've set the this settings
        //  So now let's start the real preloader going
        this.scene.start('Preloader');
        this.anims.create({
            key: "player_idle",
            //frames: [ { key: 'guy', frame: 0} ],
            //frameRate: 10,
            //repeat: -1
        });
        this.anims.create({
            key: "player_left",
            frames: [ { key: 'guy', frame: 1} ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player_right",
            frames: [ { key: 'guy', frame: 2 } ],
            frameRate: 20,
            repeat: -1
        });

    }
}
//export default Boot;
