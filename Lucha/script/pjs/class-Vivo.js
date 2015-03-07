var Vivo = function( posicion, source, equipo ){
	//Herencia de clase Objeto
	this.superClase=NPC;
	this.superClase(posicion, source, equipo);
	delete this.superClase;
	
	/*OPCIONES*/
	this.tipo = tipo_objeto[0];
	
	this.golpear = function(){
		if( !this.realizando_accion ){
			this.estado_actual = this.estados[2];//Ahora vamos a golpear
			
			this.velocidad = 0;//Dismunuimos golpe
			
			this.realizando_accion = true;//Obligamos a no cambiar de estado hasta que el mismo se finalice
			
			this.equipo.arma.golpear( this );
		};
	};
	
	this.perder_vida = function(cantidad){
		if( this.estado_actual == this.estados[1] ){
			return;
		};
		if( this.aguante - cantidad < 0 ){
			/*El golpe no se aguanta*/
			this.vida -= cantidad - this.aguante;
			this.damage = 20;
			if( this.vida <= 0 ){
				this.muerte();
			};
			console.log(this.vida);
		}else{
			new Mensaje('Golpe resistido',this.sprites.x_pos,this.sprites.y_pos,this);
		};
	};
	
	this.muerte = function(){
		this.estado_actual = this.estados[1];
		this.update_dir();
		new Mensaje('Has matado a: '+this.nombre,this.sprites.x_pos,this.sprites.y_pos,this);
		for( var i=0;i<objetos_duros.length;i++ ){
			if( objetos_duros[i].id == this.id ){
				objetos_duros.splice(i,1);
				return;
			};
		};
		/*
		for( var i=0;i<animaciones.length;i++ ){
			if( animaciones[i].id == this.id ){
				//Tal vez se pueda sustituir o dejar
				animaciones.splice(i,1);
				return;
			};
		};
		*/
		for( var i=0;i<personajes_vivos.length;i++ ){
			if( personajes_vivos[i].id == this.id ){
				//Tal vez se pueda sustituir o dejar
				personajes_vivos.splice(i,1);
				return;
			};
		};
		
	};
	
	this.recuperandose = function(){
		//RECUPERACION DEL STUNT
		if( this.velocidad < this.velocidad_defecto ){
			this.velocidad = this.velocidad + this.recuperacion;
			if( this.velocidad > this.velocidad_defecto ){
				this.velocidad = this.velocidad_defecto;
			};
			this.stunt = false;
		};
	};
	
	this.sinchoque = function(){
		var objetos = objetos_duros;
		var este = this;
		var ok = true;
		for( var i = 0; i < objetos.length; i++ ){
			if( this.id == objetos[i].id ){
				//Saltamos a nuestro propio objeto
				continue;
			};
			var este = {
				'izquierda'	: this.sprites.x_pos  + this.sprites.margenes.izquierda + this.sprites.padding.izquierda,
				'arriba'	: this.sprites.y_pos  + this.sprites.margenes.arriba + this.sprites.padding.arriba,
				'derecha'	: (this.sprites.x_pos + this.sprites.dimension.ancho_c) - this.sprites.margenes.derecha - this.sprites.padding.derecha,
				'abajo'		: (this.sprites.y_pos + this.sprites.dimension.alto_c) - this.sprites.margenes.abajo - this.sprites.padding.abajo,
			};
			
			var otro = {
				'izquierda'	: objetos[i].sprites.x_pos  + objetos[i].sprites.margenes.izquierda + objetos[i].sprites.padding.izquierda,
				'arriba'	: objetos[i].sprites.y_pos  + objetos[i].sprites.margenes.arriba + objetos[i].sprites.padding.arriba,
				'derecha'	: (objetos[i].sprites.x_pos + objetos[i].sprites.dimension.ancho_c) - objetos[i].sprites.margenes.derecha - objetos[i].sprites.padding.derecha,
				'abajo'		: (objetos[i].sprites.y_pos + objetos[i].sprites.dimension.alto_c) - objetos[i].sprites.margenes.abajo - objetos[i].sprites.padding.abajo,
			};
			
			
			if( este.izquierda < otro.derecha &&
				este.arriba < otro.abajo &&
				este.derecha > otro.izquierda &&
				este.abajo > otro.arriba
			){
				/*EN CASO DE CHOCAR HACEMOS INTERACCION*/
				this.interaccion( objetos[i] );
				ok = false;
				return ok;
			};
		};
		
		return ok;
	};
	
	this.interaccion = function( otro_objeto ){
		
	};
	
	/*ACTUALIZACION DE DATOS*/
	this.update_dir = function(){
		
	};
	this.loop_obj = function(d){
		/*RECUPERANDO DAMAGE,solo para parpadear pj*/
		if( this.damage > 0 ){
			this.damage--;
		};
		
		/*RECUPERACION DEL GOLPE- se refiere a luego de golpear*/
		if( this.estado_actual == this.estados[2] && this.sprites.estado[this.estado_actual][this.direccion].length-1 <= this.sprite_actual ){
			this.estado_actual = this.estados[0];
			this.realizando_accion = false;
		};
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
	personajes_vivos.push(this);
};