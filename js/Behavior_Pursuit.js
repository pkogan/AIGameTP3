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

var targetPred;
function Behavior_Pursuit(game, posx, posy, key, frame, target, targetI) {
    Behavior_Seek.call(this, game, posx, posy, key, frame, target);
    
    targetPred = targetI;
    return this;
}
Behavior_Pursuit.prototype = Object.create(Behavior_Seek.prototype);//Defino que es sub clase de Sprite.
Behavior_Pursuit.prototype.constructor = Behavior_Pursuit;

var t=5;

Behavior_Pursuit.prototype.update = function () {

    // Calcular predicción
    if(t===5){
        
       var vector = Phaser.Point.add(this.target.sprite.body.position, ((this.target.sprite.body.velocity*t)));
       targetPred.sprite.body.velocity = vector;
       
       console.log();
      // console.log(vector + " " + this.target.sprite.body.velocity);
       
       this.seek();
        
                
        
       t=0; 
    }
    else {
        t++;
    }
    // Rotación siguiendo al mouse
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(this.sprite.body.x, this.sprite.body.y,this.target.sprite.body.x, this.target.sprite.body.y) + 90;
    if(targetAngle < 0){                    
        targetAngle += 360;
    }    
    
    this.sprite.angle = targetAngle;
}
;