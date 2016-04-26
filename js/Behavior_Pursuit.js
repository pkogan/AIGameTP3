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


function Behavior_Pursuit(game, posx, posy, key, frame, target, targetP) {
    Behavior.call(this, game, posx, posy, key, frame, target); 
    
    // Agrega el otro objetivo.
    this.targetP = targetP;
    
    this.max_vel = 150;
    this.max_force = 10;
    return this;
}
Behavior_Pursuit.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Pursuit.prototype.constructor = Behavior_Pursuit;

// Valor de T estático
//var t=10;



Behavior_Pursuit.prototype.update = function () {
       // Valor de T dinámico 
       var t = Phaser.Math.distance(this.target.sprite.body.position.x,this.target.sprite.body.position.y, this.sprite.body.position.x,this.sprite.body.position.y);
       t = t / this.max_vel;
     
    
    
       // Cambia la velocidad del objetivo a la predicción...  
       this.target.sprite.body.velocity.x=this.target.sprite.body.velocity.x*t;
       this.target.sprite.body.velocity.y=this.target.sprite.body.velocity.y*t;      
       Phaser.Point.add(this.target.sprite.body.position, (this.target.sprite.body.velocity));
       
       // Si está muy cerca, para. Seria incluyendo el arrive?
//       if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) > 10)
//            this.seek();
//       else
//            this.sprite.body.velocity.set(0);      
//       
       this.seek();
        
       this.target.sprite.body.position=this.targetP.sprite.body.position;
}

// Seek
Behavior_Pursuit.prototype.seek = function () {

    // VELOCIDAD DESEADA --> normalize(target - position) * max_velocity
    var velDeseada = Phaser.Point.subtract(this.target.sprite.position, this.sprite.position);
    
    // Se normaliza la velocidad deseada
    velDeseada.normalize();
    
    // Multiplica por maxima velocidad.
    velDeseada.multiply(this.max_vel, this.max_vel);
    //console.log(velDeseada);

    //steering = desired_velocity - velocity
    var vecSteering = Phaser.Point.subtract(velDeseada, this.sprite.body.velocity);
    
    // Verifico que no supere la fuerza máxima --> steering = truncate (steering, max_force)    
    if (vecSteering.getMagnitudeSq() > (this.max_force*this.max_force)){ // sin multiplicar no anduvo
        vecSteering.setMagnitude(this.max_force);
    }
    
    // No tomamos en cuenta la masa. steering = steering / mass
        
    // velocity = truncate (velocity + steering , max_speed)
    this.sprite.body.velocity.add(vecSteering.x, vecSteering.y); // hace la suma: velocity + steering
    
    // luego si, verifica que no supere la velocidad maxima
    if (this.sprite.body.velocity.getMagnitudeSq() > (this.max_vel * this.max_vel)) {
        this.sprite.body.velocity.setMagnitude(this.max_vel);
    }
}
;