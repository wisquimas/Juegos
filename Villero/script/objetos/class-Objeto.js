/*OBJETOS SUELTOS DEL ESCENARIO*/
var Objeto = function(posicion, source){
	this.id = id_obj;
	id_obj++;
	this.tipo = tipo_objeto[2];
	
	this.img = new Image();
	this.img.src = source || 'img/decoracion/piedra.png';
	
	this.sprites = {
		imagen	: this.img,
		dimension : {
			ancho	: 24,
			alto	: 24,
			ancho_c	: 24,
			alto_c	: 24,
		},
		estado	: {
			'normal'	:{
				'izquierda'	:[[0,0]],
				'arriba'	:[[0,0]],
				'derecha'	:[[0,0]],
				'abajo'		:[[0,0]],
			},
		},
		margenes :{
			'izquierda'	: 4,
			'arriba'	: 4,
			'derecha'	: 4,
			'abajo'		: 4,
		},
		padding :{
			'izquierda'	: 0,
			'arriba'	: 10,
			'derecha'	: 0,
			'abajo'		: 0,
		},
		x		:	null,
		y		:	null,
		x_pos	:	posicion.x || 0,
		y_pos	:	posicion.y || 0,
	};
	//variable para comienzo de animaciones
	this.sprite_actual = 0;
	this.estados = ['normal'];
	this.estado_actual = this.estados[0];
	
	//Con estas opciones de abajo seleccionamos direccion de arranque
	//Ademas comprobamos cambios de estado
	this.direccion = 'abajo';
	this.direccion_Anterior = this.direccion;
	
	//Recogiendo acciones dependiendo de las teclas apretadas
	this.update_keys = function(tecla_ingresada){
		
	};
	//actualizando direccion de movimiento
	this.update_dir = function(d){
		
	};
	
	this.loop_obj = function(d){
		if( !this.stunt ){
			//SI SE CAMBIA DE DIRECCIÓN O YA NO HYA MÁS SPRITES SE RESETEA EL SPRITE ACTUAL
			if(this.direccion_Anterior!=this.direccion || this.sprites.estado[this.estado_actual][this.direccion].length-1 <= this.sprite_actual){
				this.sprite_actual = 0;
			}else{
				this.sprite_actual++;
			};
			//ALMACENAMOS DIRECCION
			this.direccion_Anterior = this.direccion;
			//SE ACTUALIZA LA NUEVA POSICION DEL SPRITE
			//TENER EN CUENTA PARA GOLPES
			this.sprites.x = this.sprites.estado[this.estado_actual][this.direccion][this.sprite_actual][0] * this.sprites.dimension.ancho;
			this.sprites.y = this.sprites.estado[this.estado_actual][this.direccion][this.sprite_actual][1] * this.sprites.dimension.alto;
		};
	};
	
	this.draw = function(){
		buffer_ctx.drawImage(
			this.sprites.imagen,
			this.sprites.x,
			this.sprites.y,
			this.sprites.dimension.ancho,
			this.sprites.dimension.alto,
			this.sprites.x_pos,
			this.sprites.y_pos,
			this.sprites.dimension.ancho_c,
			this.sprites.dimension.alto_c
		);
	};
	/*Guardamos en memoria*/
	animaciones.push(this);
};
