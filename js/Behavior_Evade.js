/**
 * Comportamiento que sigue derecho en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} targetP
 * @param {type} targetV
 * @returns {Behavior_Evade}
 */


function Behavior_Evade(game, posx, posy, key, frame, targetP,targetV) {
    Behavior.call(this, game, posx, posy, key, frame, targetP); 
    
    // Agrega el otro objetivo.
    //this.sprite.outOfBoundsKill = true;
    this.targetP = targetP;
    this.targetV = targetV;
    
    this.vecReference = new Phaser.Point(0, 0);
    this.max_vel = 150;
    this.max_force = 10;
    
//    this.sprite.body.collideWorldBounds=true;
//    this.sprite.body.bounce = 0.7;
    return this;
    
    
    //this.sprite.body.collideWorldBounds=true;
    //this.sprite.body.bounce = 0.7;
    //this.sprite.checkWorldBounds = true;
}
Behavior_Evade.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Evade.prototype.constructor = Behavior_Evade;

var t=10;

Behavior_Evade.prototype.update = function () {

    // Calcular predicción
    if(Phaser.Math.distance(this.targetP.sprite.body.position.x,this.targetP.sprite.body.position.y,this.sprite.body.position.x,this.sprite.body.position.y) < 100){
        console.log("evadiendo");
       // Cambia la velocidad del objetivo a la predicción...  
       velocity_x=this.targetP.sprite.body.velocity.x*t;
       velocity_y=this.targetP.sprite.body.velocity.y*t;      
       var puntoFuturo = Phaser.Point.add(this.targetP.sprite.body.position, new Phaser.Point(velocity_x,velocity_y));
       this.seek(puntoFuturo,true);
      
       
//       t=0; 
       //this.target.sprite.body.position=this.targetP.sprite.body.position;
    }
    else{
    //console.log();
    //if(this.sprite.outOfBoundsKill && this.sprite.checkWorldBounds)
      //  console.log("mori")
      console.log("seekeando " );
      // Cambia la velocidad del objetivo a la predicción...  
       velocity_x2=this.targetV.sprite.body.velocity.x*t;
       velocity_y2=this.targetV.sprite.body.velocity.y*t;      
       var puntoFuturo2 = Phaser.Point.add(this.targetV.sprite.body.position, new Phaser.Point(velocity_x2,velocity_y2));
       
        this.seek(puntoFuturo2,false);}
       
       
}

// Seek
Behavior_Evade.prototype.seek = function (futuro,flee) {

    // VELOCIDAD DESEADA --> normalize(target - position) * max_velocity
    if(flee)
        var velDeseada = Phaser.Point.subtract(this.sprite.position, futuro); //Flee
    else
        var velDeseada = Phaser.Point.subtract(futuro, this.sprite.position); // Seek
    
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
    //console.log(this.sprite.body.velocity);
    // luego si, verifica que no supere la velocidad maxima
    if (this.sprite.body.velocity.getMagnitudeSq() > (this.vel * this.vel)) {
        this.sprite.body.velocity.setMagnitude(this.vel);
    }
}
;