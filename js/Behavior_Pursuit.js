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
function Behavior_Pursuit(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
        
    
    
    return this;
}
Behavior_Pursuit.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Pursuit.prototype.constructor = Behavior_Pursuit;

Behavior_Pursuit.prototype.update = function () {

    
    
}
;