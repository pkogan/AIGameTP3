/**
 * Comportamiento que sigue derecho en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Derecho}
 */
function Behavior_Derecho(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
        
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    
    return this;
}
Behavior_Derecho.prototype = Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
Behavior_Derecho.prototype.constructor = Behavior_Derecho;

Behavior_Derecho.prototype.update = function () {

    //console.log('entro');
    if (this.target.sprite.body.position.x > this.sprite.body.position.x+10) {

        this.sprite.body.velocity.x = 75;

    } else if (this.target.sprite.body.position.x < this.sprite.body.position.x-10) {
        this.sprite.body.velocity.x = -75;
    } else
        this.sprite.body.velocity.x = 0;
}
;