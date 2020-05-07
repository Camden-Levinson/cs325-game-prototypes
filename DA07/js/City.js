"use strict";
function addBlockC(x, y, ground){
    game.layer = ground.create(x, y, 'brick');
    game.layer.setSize(64, 64);
    game.layer.setScale(2);
    return game.layer;
}
var x = 100;
var y = 400;

class City extends Phaser.Scene{

    constructor(){
        super('City');
    }

    create() {
        this.BG1 = this.physics.add.staticGroup();
        for(var i = 0; i < 4; i++){
            this.city = this.BG1.create(200+(i*400), 300, 'cityBG');
            this.city.setScale(1/2);
        }
        this.hasKey = false;
        this.hasPick = false;
        this.key = this.add.image(672, 32, 'key');
        this.gate = this.add.image(768, 232, 'gate');
        this.pick = this.add.image(672, 216, 'pick');
        this.house = this.physics.add.sprite(200, 361, 'chouse');
        this.physics.world.setBounds(0, -200, 1690, 800);
        this.cameras.main.setBounds(0, 0, 1600, 700);
        this.boots = this.physics.add.sprite(x, y, 'boots');
        this.boots.setScale(1/3);
        this.facing = "right";
        this.gameOver = false;
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.startFollow(this.boots, true, 1.00, 1.00, 100, 200);
        this.ground = this.physics.add.staticGroup();
        for(var i = 0; i < 7; i++){
            this.layer = this.ground.create(32+(i*64), 568, 'brick');
            this.layer.setSize(64, 64);
            this.layer.setScale(2);
        }
        for(var i = 0; i < 3; i++){
            addBlockC(640+(i*64), 344, this.ground);
        }
        for(var i = 0; i < 4; i++){
            addBlockC(640+(i*64), 120, this.ground);
        }
        for(var i = 0; i < 3; i++){
            addBlockC((21*64)+(i*64), 390, this.ground);
        }
        for(var i = 0; i < 2; i++){
            addBlockC(512+32+(i*64), 568, this.ground);
        }
        for(var i = 0; i < 24; i++){
            addBlockC(704+32+(i*64), 568, this.ground);
        }
        for(var i = 0; i < 10; i++){
            addBlockC((9*64), 504-(i*64), this.ground);
        }
        for(var i = 0; i < 7; i++){
            addBlockC((24*64), 504-(i*64), this.ground);
        }
        for(var i = 0; i < 4; i++){
            addBlockC(480+(i*64), 790, this.ground);
        }
        addBlockC((24*64)+1, 504-(7*64), this.ground);
        addBlockC((20*64)+32, 600-(6*64)-32, this.ground);
        addBlockC((23*64)+32, 600-(5*64), this.ground);
        addBlockC((13*64)+32, 344, this.ground);
        addBlockC((16*64)+32, 504, this.ground);
        addBlockC((16*64)+32, 600 -(6*64)-32, this.ground);
        addBlockC(736, 632, this.ground);
        addBlockC(736, 696, this.ground);
        this.help = addBlockC(752, 232, this.ground);
        this.help.setVisible(false);
        this.physics.add.collider(this.boots, this.ground);
        this.physics.add.collider(this.house, this.ground);
        this.physics.add.overlap(this.house, this.boots, this.main, null, this);
        this.physics.add.overlap(this.gate, this.boots, this.unlock, null, this);
    }

    update() {
        if(!this.gameOver){
            this.playerMovementManager();
        }
        if(this.boots.x > 672 && this.boots.x < 736 && this.boots.y < 32){
            this.key.destroy();
            this.help.destroy();
            this.hasKey = true;
        }
        if(this.boots.x > 672 && this.boots.x < 736 && this.boots.y < 216){
            this.pick.destroy();
            this.hasPick = true;
        }

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        
    }
    playerMovementManager() {
        // Directional movement
        if(this.cursorKeys.left.isDown){
            this.facing = "left";
            this.boots.setVelocityX(-400);
            this.boots.flipX = true;
            this.boots.anims.play("boot_walk", true);
            
        }else if(this.cursorKeys.right.isDown){
            this.facing = "right";
            this.boots.setVelocityX(400);
            this.boots.flipX = false;
            this.boots.anims.play("boot_walk", true);
            if(this.boots.x > 675 && this.boots.x < 676 && this.boots.y > 470){
                this.boots.setVelocityY(-100);
            }
        }else{
            this.boots.setVelocityX(0);
            this.boots.anims.play("boot_side", true);
        }
        if(this.cursorKeys.up.isDown && this.boots.body.touching.down){
            this.boots.setVelocityY(-500);
        }
        if(this.boots.x >= 1640){
            x = 100;
            y = 400;
            this.scene.start('Overworld');
        }
    }
    main(){
        if(this.interactKey.isDown){
            x = this.boots.x;
            y = this.boots.y;
            this.scene.start('Building');
        }
    }
    unlock(){
        if(this.hasKey){
            this.gate.destroy();
        }else{
            this.boots.setVelocityX(0);
        }
    }
}
//export default Game;