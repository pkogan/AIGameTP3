/**
 * Comportamiento que sigue Seek en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Seek}
 */
function Behavior_Flee(game, posx, posy, key, frame, target) {
    Behavior_Seek.call(this, game, posx, posy, key, frame, target);
this.sentido=-1;
    return this;
}
Behavior_Flee.prototype = Object.create(Behavior_Seek.prototype);//Degfino que es sub clase de Sprite.
Behavior_Flee.prototype.constructor = Behavior_Flee;

Behavior_Flee.prototype.update = function () {

    this.seek();
};
