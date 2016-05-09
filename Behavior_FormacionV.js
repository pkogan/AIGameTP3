/**
 * Comportamiento grupal en el que cada personaje del grupo se ubica detrás y en el medio de dos de sus compañeros ubicados delante suyo
 * Si el personaje no tiene compañeros por delante entonces es uno de los "elementos de mando" y por ende debe mantener cierta distancia
 * con su compañero de al lado que también es un "elemento de mando"
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @param {type} mando_izquierdo
 * @param {type} mando_derecho
 * @returns {Behavior_FormacionV}
 */

/*var grupo = [];
var cant_Integrantes = 0;*/

function Behavior_FormacionV(game, posx, posy, key, frame, target, mando_izquierdo, mando_derecho) {
    Behavior_Separation.call(this, game, posx, posy, key, frame, target);
        
    /*this.distancia_limite = 100;//verificar su valor
    grupo[cant_Integrantes] = this;
    this.mi_posicion = cant_Integrantes;
    cant_Integrantes += 1;*/
    if (mando_izquierdo == null){
		this.mando_izquierdo = -1;//significa que no posee mando izquierdo, por lo tanto, el sprite creado es un elemento de mando	
		}
	else{
		this.mando_izquierdo = mando_izquierdo.mi_posicion;
		}
		
	if (mando_derecho == null){
		this.mando_derecho = -1;//significa que no posee mando derecho, por lo tanto, el sprite creado es un elemento de mando
		}
	else{
		this.mando_derecho = mando_derecho.mi_posicion;
		}
    
    return this;
}
Behavior_FormacionV.prototype = Object.create(Behavior_Separation.prototype);//Defino que es sub clase de Sprite.
Behavior_FormacionV.prototype.constructor = Behavior_FormacionV;


Behavior_FormacionV.prototype.update = function () {

    console.log(this.sprite.body.position);
    this.separation();//se aleja de sus compañeros una cierta distancia
    this.formacion_V();//permite ubicar al personaje en el medio de sus elementos de mando, si los tiene
}

Behavior_FormacionV.prototype.formacion_V = function(){//arrastra el error del separation --> Error: Cannot read property 'body' of undefined 
	
	/*var formacion = this.get_grupo();
	var cant_compañeros = this.get_cantidad();*/
	
	if (this.mando_izquierdo != -1){//es un subordinado
	//se ubica en el centro de sus elementos de mando
		punto_medio = calcular_centro(this.mando_izquierdo,this.mando_derecho);
		this.sprite.body.velocity.add(punto_medio.x, punto_medio.y);
		this.sprite.body.velocity.normalize(this.max_speed);
	}
}

function calcular_centro(pos_mando_izq, pos_mando_der){
//devuelve el punto medio entre los mandos
	var punto = new Phaser.Point(0,0);
	var arreglo_puntos = [];
	
	arreglo_puntos[0] = this.grupo[pos_mando_izq].sprite.body.position;
	arreglo_puntos[1] = this.grupo[pos_mando_der].sprite.body.position;
	punto = Phaser.Point.centroid(arreglo_puntos);
		
	return punto;
}
;
