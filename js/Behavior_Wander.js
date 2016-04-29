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
        
    //this.sprite.body.bounce.y = 0;//0.2;
    //this.sprite.body.gravity.y = 0;//100;
    this.sprite.body.collideWorldBounds = true;
    
    this.CIRCLE_DISTANCE = 500;
    this.CIRCLE_RADIUS = 200;
    this.ANGLE_CHANGE = 300;
    this.max_force = 100;//0
    this.wanderAngle = 1;
    
    return this;
}
Behavior_Wander.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Wander.prototype.constructor = Behavior_Wander;


Behavior_Wander.prototype.update = function () {

    //console.log(this.sprite.body.velocity);
    //se determina el punto del círculo en la misma dirección de la velocidad del personaje
    var circleCenter = this.sprite.body.velocity.clone();
    circleCenter.normalize();
    scaleBy(circleCenter,this.CIRCLE_DISTANCE);//no existe .scaleBy(...), debería multiplicar el
    // vector por la constante que se pasa como argumento
    
    //se determina la fuerza de desplazamiento, responsable del giro hacia la izquierda o derecha
    var desplazamiento = new Phaser.Point(0,-1);
    scaleBy(desplazamiento,this.CIRCLE_RADIUS);
    
    
    //se desplaza el ángulo del personaje
    setAngle(desplazamiento,this.wanderAngle);
    
    this.wanderAngle += (Math.random() * this.ANGLE_CHANGE) - (this.ANGLE_CHANGE * 0.5);
    
    wanderForce = circleCenter.add(desplazamiento);//punto al cual se desplaza el personaje, vector de desplazamiento??
    
    truncate(wanderForce,this.max_force);
    //wanderForce = wanderForce / mass;
    this.sprite.body.velocity.add(wanderForce);
    truncate(this.sprite.body.velocity, this.max_speed);
    this.sprite.body.position.add(this.sprite.body.velocity);  
}

function scaleBy(punto, constante) {
	
	punto.x = punto.x * constante;
	punto.y = punto.y * constante;
}

function setAngle(vector, valor) {
	
	var longit = longitud(vector);
	vector.x = Math.cos(valor) * longit;
	vector.y = Math.sin(valor) * longit;
}

function longitud(vector){
//calcula la hipotenusa desde el origen al vector
	var hipotenusa = catetoOpuesto(vector) * Math.sin(vector);
	return hipotenusa;
}

function catetoOpuesto(vector){
	return vector.y;
}

function catetoAdyacente(vector){
	return vector.x;
}

function truncate(vector, maximo) {
//trunca un punto
//cómo????
//comparo valor hipotenusa (del vector al origen) > maximo??
	var hipotenusa = longitud(vector);
	if (hipotenusa > maximo){
		cateto_opuesto = maximo * Math.sin(vector);
		cateto_adyacente = maximo * Math.cos(vector);
		vector.x = cateto_adyacente;
		vector.y = cateto_opuesto;
		}
}
;
