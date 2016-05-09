/**
 * Comportamiento grupal en el que cada personaje del grupo se aleja de sus compañeros 
 * de manera tal que cada uno busca permanecer solo dentro de su área y, al mismo tiempo, sin invadir el área de otro
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Separation}
 */

var grupo = [];
var cant_Integrantes = 0;

function Behavior_Separation(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
    
    this.distancia_limite = 50;//verificar su valor
    grupo[cant_Integrantes] = this;
    this.mi_posicion = cant_Integrantes;
    cant_Integrantes += 1;
    
    return this;
}
Behavior_Separation.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Separation.prototype.constructor = Behavior_Separation;


Behavior_Separation.prototype.update = function () {

    //console.log(this.sprite.body.position);
    this.separation();
}

//function separation(){//Error: Cannot read property 'body' of undefined 
Behavior_Separation.prototype.separation = function () {
	
	var vector_alejamiento = new Phaser.Point(0,0);
	var cant_invasores = 0;
	
    for (var i = 0; i < cant_Integrantes; i++)
    {
        if(i != this.mi_posicion){//si no es el mismo personaje al que se le ejecutó update()
			if(this.invade_mi_area(grupo[i])){
//console.log('se repelen');

				toAgent = Phaser.Point.subtract(grupo[i].sprite.body.position,this.sprite.body.position)
				vector_alejamiento.add(toAgent.x,toAgent.y);
				cant_invasores += 1;
				}
			}        
    }
//console.log(vector_alejamiento);
    
    if (cant_invasores != 0){
		//vector_alejamiento.divide(cant_invasores,cant_invasores);//probar
		vector_alejamiento.x /= cant_invasores;
		vector_alejamiento.y /= cant_invasores;
		vector_alejamiento.multiply(-1,-1);		
		vector_alejamiento.normalize();
		}
	//console.log(vector_alejamiento);
	this.sprite.body.velocity.add(vector_alejamiento.x, vector_alejamiento.y);
	//this.sprite.body.velocity.normalize(this.max_speed);
}

Behavior_Separation.prototype.invade_mi_area = function (companero){
//verifica si el compañero está dentro del área del personaje que invoca
	var invade = false;
	//  console.log(this.sprite.body.position);
	//console.log(companero.sprite.body.position);
	if (Phaser.Point.distance(this.sprite.body.position,companero.sprite.body.position) <= this.distancia_limite){
		invade = true;
		}	
	return invade;
}

Behavior_Separation.prototype.get_grupo = function () {
	
	return grupo;
}

Behavior_Separation.prototype.get_cantidad = function () {
	
	return cant_Integrantes;
}
;
