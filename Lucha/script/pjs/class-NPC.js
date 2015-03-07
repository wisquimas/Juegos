/*CLASE USADA PARA INTERACTUAR CON MERCADERES*/
var NPC =  function(posicion, source,opciones){
	//Herencia de clase Objeto
	this.superClase=Obstaculo;
	this.superClase(posicion, source);
	delete this.superClase;
	
	/*OPCIONES*/
	this.nombre = 'Anónimo';
	this.tipo = tipo_objeto[3];
	this.img.src = '';
	
	/*ESTADISTICAS*/
	this.vida			= 100;//Vida maxima
	this.velocidad		= 10;//Velocidad de movimiento, a esta se le restara el peso del arma y la armadura
	this.fuerza			= 1;//Fuerza para los golpes
	this.vision			= 20;//Vision, se usara para asestar golpes con armas de larga distancia
	this.recuperacion	= 0.2;//Velocidad de recuperacion luego de un stunt, al dar golpe o por un efecto
	this.aguante		=	0;//Valor de defenza personal
	
	this.velocidad_defecto		= this.velocidad;
	this.vida_defecto			= this.vida;
	this.fuerza_defecto			= this.fuerza;
	this.vision_defecto			= this.vision;
	this.recuperacion_defecto	= this.recuperacion;
	this.aguante_defecto		= this.aguante;

	
	/*EQUIPO*/
	this.equipo = {
		arma		: new Arma,
		armadura	: '',
	};
	if( opciones.equipo ){
		if( this.equipo.arma ){
			/*GUARDAMOS EL ARMA*/
			this.equipo.arma = opciones.equipo.arma;
		};
		if( this.equipo.armadura ){
			/*GUARDAMOS ROPA*/
			this.equipo.armadura = opciones.equipo.armadura;
		};
	};
	/*RAZA*/
	this.raza = new Humano(this);
	if( opciones.raza ){
		this.raza = opciones.raza;
	};
	
	/*CLASE*/
	this.clase = new Clase(this);
	if( opciones.clase ){
		this.clase = opciones.clase;
	};
	
	/*BOLSA*/
	//Pendiente de crear
	
	/*ESTADOS*/
	this.estados	= ['normal','muerto','golpe','estatico'];
	this.stunt		= false;
	this.invencible	= false;
	this.estado_actual = this.estados[3];
	this.realizando_accion = false;//Impide realizar otras acciones simultaneas
	this.damage = 0;//Esto lo usamos para ver el daño recibido en el juego a modo de bind
	
	/*SPRITES*/
	this.sprites.estado	= {
		'normal'	:{
			'izquierda'	:[[1,1],[0,1],[2,1],[0,1],[1,1],[0,1]],
			'arriba'	:[[1,3],[2,3],[2,3],[1,3]],
			'derecha'	:[[1,2],[0,2],[2,2],[0,2],[1,2],[0,2]],
			'abajo'		:[[1,0],[2,0],[2,0],[1,0]],
		},
		'muerto'	:{
			'izquierda'	:[[12,4]],
			'arriba'	:[[12,4]],
			'derecha'	:[[12,4]],
			'abajo'		:[[12,4]],
		},
		'golpe'	:{
			'izquierda'	:[[3,1],[4,1],[5,1],[6,1],[10,1],[6,1],[5,1],[4,1],[3,1]],
			'arriba'	:[[3,3],[4,3],[5,3],[6,3],[10,3],[6,3],[5,3],[4,3],[3,3]],
			'derecha'	:[[3,2],[4,2],[5,2],[6,2],[10,2],[6,2],[5,2],[4,2],[3,2]],
			'abajo'		:[[3,0],[4,0],[5,0],[6,0],[10,0],[6,0],[5,0],[4,0],[3,0]],
		},
		'estatico'	:{
			'izquierda'	:[[0,1]],
			'arriba'	:[[0,3]],
			'derecha'	:[[0,2]],
			'abajo'		:[[0,0]],
		},
	};
	this.sprites.dimension = {
		'ancho'		: 49,
		'alto'		: 84.4285,
		'ancho_c'	: 52.8947,
		'alto_c'	: 84.4285,
	};
	this.sprites.margenes = {
		'izquierda'	: 20,
		'arriba'	: 20,
		'derecha'	: 15,
		'abajo'		: 7,
	};
	this.sprites.padding = {
		'izquierda'	: 17,
		'arriba'	: 50,
		'derecha'	: 20,
		'abajo'		: 0,
	};
	this.interactuar = function(direccion_otro,mensaje){
		if( !this.realizando_accion ){
			switch(direccion_otro){
				case	'izquierda'	:
				this.direccion = 'derecha';
				break;
				case	'arriba'	: 
				this.direccion = 'abajo';
				break;
				case	'derecha'	:
				this.direccion = 'izquierda';
				break;
				case	'abajo'		:
				this.direccion = 'arriba';
				break;
			};
			var mensaje = mensaje || 'Hola, ¡qué bueno verte!';
			new Mensaje(mensaje,this.sprites.x_pos,this.sprites.y_pos,this);
			this.realizando_accion = true;
		};
	};
	
	this.draw = function(){
		console.log();
		if( this.damage % 2 != 0 ){
			return;
		};
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
		//this.equipo.arma.draw(this.sprites);
	};
};
