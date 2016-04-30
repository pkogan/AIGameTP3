/**
 * Comportamiento que deambula por el escenario del juego
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Wander}
 */
function Behavior_Wander(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
    
    this.CIRCLE_DISTANCE = 10;
    this.CIRCLE_RADIUS = 3;//menor que la distancia anterior
    this.ANGLE_CHANGE = 1;
    this.max_force = 5;
    this.wanderAngle = 10;
    this.wanderDate = new Date();
    this.tiempoEspera = 200;
    
    return this;
}
Behavior_Wander.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Wander.prototype.constructor = Behavior_Wander;


Behavior_Wander.prototype.update = function () {

    console.log(this.sprite.body.position);
    var ahora = new Date();
    var tiempoTranscurrido = ahora - this.wanderDate;
    
    if (tiempoTranscurrido > this.tiempoEspera){

    //se determina el punto del círculo en la misma dirección de la velocidad del personaje	
    var circleCenter = this.sprite.body.velocity.clone();
    circleCenter.normalize();
    scaleBy(circleCenter,this.CIRCLE_DISTANCE);//multiplica el vector por la constante que se pasa como argumento
    
    //se determina la fuerza de desplazamiento, responsable del giro hacia la izquierda o derecha
    var abcisa = game.rnd.between(-1, 1);
    var ordenada = game.rnd.between(-1, 1);
    var desplazamiento = new Phaser.Point(abcisa,ordenada);
    scaleBy(desplazamiento,this.CIRCLE_RADIUS);
    
    //se desplaza el ángulo del personaje
    setAngle(desplazamiento,this.wanderAngle);
    
    this.wanderAngle += (Math.random() * this.ANGLE_CHANGE) - (this.ANGLE_CHANGE * 0.5);

    var wanderForce = circleCenter.add(desplazamiento.x,desplazamiento.y);//punto al cual se desplaza el personaje, vector de desplazamiento
    
    truncate(wanderForce,this.max_force);
    //wanderForce = wanderForce / mass;
    this.sprite.body.velocity.add(wanderForce.x,wanderForce.y);
    truncate(this.sprite.body.velocity, this.max_speed);    
	}
	this.sprite.body.position.add(this.sprite.body.velocity.x,this.sprite.body.velocity.y);
    loopWalls(this.sprite.body.position,this.game.world);
}

function scaleBy(punto, constante) {
	
	punto = punto.multiply(constante,constante);
}

function setAngle(vector, valor) {
	
	var longitud_actual = vector.getMagnitude();
	var punto = new Phaser.Point(Math.cos(valor) * longitud_actual, Math.sin(valor) * longitud_actual);
	var longitud_deseada = punto.getMagnitude();
	vector.setMagnitude(longitud_deseada);
	
}

function truncate(vector, maximo) {
//trunca un punto		
        if (vector.getMagnitude() > maximo){
			vector.setMagnitude(maximo);
		}
}
function loopWalls(vector, bounds){
	
    if (vector.x < 0)
    {
      vector.x = bounds.width;
    }
    else if (vector.x > bounds.width)
    {
      vector.x = 0;
    }
    if (vector.y < 0)
    {
      vector.y = bounds.height
    }
    else if (vector.y > bounds.height)
    {
      vector.y = 0
    }
}
;
