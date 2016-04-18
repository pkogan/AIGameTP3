//Crea el objeto comportamiento que hereda de sprite y le agrega algunas variables más

function Behavior(game, posx, posy, key, frame,target){
    Phaser.Sprite.call(this, game, posx, posy, key, frame); //llama a la clase sprite con sus parametros.
    this.target=target;
    

    this.game.add.sprite(200,posy,key);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    
    return this;
    //this.game.physics.arcade.enable(this);
    /*this.esp_speed=esp_speed;
    this.max_speed=max_speed;
    this.min_speed=min_speed;
    this.min_distance= min_distance;
    this.max_distance=max_distance;*/
}
Behavior.prototype= Object.create(Phaser.Sprite.prototype);//Degfino que es sub clase de Sprite.
Behavior.prototype.constructor=Behavior;

Behavior.prototype.update=function(){
        
    };