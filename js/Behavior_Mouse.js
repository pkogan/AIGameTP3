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
function Behavior_Mouse(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
        
    
    
    return this;
}
Behavior_Mouse.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Mouse.prototype.constructor = Behavior_Mouse;

Behavior_Mouse.prototype.update = function () {
        
         game.physics.arcade.moveToPointer(this.sprite, 200);
                //pezBueno.angle += 2;
                game.input.maxPointers = 1;
                var posx =this.sprite.body.x;
                var posy = this.sprite.body.y;
                //console.log(posx, posy);
                
                
                // Sigue al mouse
                if (Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y))
                {
                    this.sprite.body.velocity.setTo(0, 0);
                }
                
                
                // Rotación siguiendo al mouse
                var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(this.sprite.body.x, this.sprite.body.y,this.game.input.activePointer.x, this.game.input.activePointer.y) + 90;
                if(targetAngle < 0){                    
                    targetAngle += 360;
                }               
                this.sprite.angle = targetAngle;             
    
};