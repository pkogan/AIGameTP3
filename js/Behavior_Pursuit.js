/**
 * Comportamiento que sigue derecho en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @param {type} targetP
 * @returns {Behavior_Pursuit}
 */

//var targetI;
function Behavior_Pursuit(game, posx, posy, key, frame, target, targetP) {
    Behavior_Seek.call(this, game, posx, posy, key, frame, target); // Para que siga al target correcto deberia mandarse targetI que tiene la predicción.
    
    // Agrega el otro objetivo.
    this.targetP = targetP;
    return this;
}
Behavior_Pursuit.prototype = Object.create(Behavior_Seek.prototype);//Defino que es sub clase de Sprite.
Behavior_Pursuit.prototype.constructor = Behavior_Pursuit;

var t=5;

Behavior_Pursuit.prototype.update = function () {

    // Calcular predicción
    if(t===5){
        
       // Calcula el vector de velocidad futura 
       this.target.sprite.body.velocity.x=this.target.sprite.body.velocity.x*t;
       this.target.sprite.body.velocity.y=this.target.sprite.body.velocity.y*t
       // Cambia la velocidad del objetivo a la predicción... La multiplicación no anda!!
       Phaser.Point.add(this.target.sprite.body.position, (this.target.sprite.body.velocity));
       
       if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) > 15)
            this.seek();
       else
            this.sprite.body.velocity.set(0);
                
        
       t=0; 
    }
    else {
        t++;
    }
    
    if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) > 15){
        // Rotación siguiendo al mouse
        var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(this.sprite.body.x, this.sprite.body.y,this.target.sprite.body.x, this.target.sprite.body.y) + 90;
        if(targetAngle < 0){                    
            targetAngle += 360;
        }    

        this.sprite.angle = targetAngle;
    }
}
;