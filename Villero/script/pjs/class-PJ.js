var PJ = function(posicion, source, equipo,controls){
	//Herencia de clase Objeto
	this.superClase=Vivo;
	this.superClase(posicion, source, equipo);
	delete this.superClase;
	
	//GUARDAMOS AL JUGADOR
	players.push(this);
	
	
	//CONTROLES
	var controles = controls;
	
	this.interaccion = function( otro_objeto ){
		if( otro_objeto.tipo == tipo_objeto[3] ){
			/*INTERACCIÓN CONTRA NPC O VIVOS*/
			otro_objeto.interactuar( this.direccion , null,this.faccion );
		};
	};
	
	//Recogiendo acciones dependiendo de las teclas apretadas
	this.update_keys = function(tecla_ingresada){
		if( this.realizando_accion ){
			return;
		};
		if( !this.stunt ){
			if(tecla_ingresada[controles.izquierda] || tecla_ingresada[controles.arriba] || tecla_ingresada[controles.derecha] || tecla_ingresada[controles.abajo] || tecla_ingresada[controles.golpe] ){
					this.update_dir(true);
			}else{
				//volvemos al jugador a una postura estática
				this.estado_actual = this.estados[3];
				this.update_dir();
			};
		};
	};
	
	//actualizando direccion de movimiento
	this.update_dir = function(d){
		if( this.realizando_accion ){
			//Mientras se realiza una acccion no se mueve el persona ni cambia de estado
			return;
		};
		//ACTUALIZANDO DIRECCIÓN DEL PJ
		/*Se resta al movimiento y la fuerza el peso del arma*/
		var movimiento  = this.velocidad - this.equipo.arma.peso;
		if( movimiento <=0 ){
			/*En caso de perder ya toda la velocidad entra la fuerza en escena*/
			movimiento += this.fuerza;
		};
		if(d){
			if( movimiento <= 0 ){
				if( this.velocidad_defecto + this.fuerza - this.equipo.arma.peso <= 0 ){
					new Mensaje('No puedes moverte por exceso de peso',this.sprites.x_pos,this.sprites.y_pos,this);
				};
				return;
			};
			this.estado_actual = this.estados[0];
			if ( tecla_ingresada[controles.golpe] ){
				this.golpear();
				return;
			};
			if ( tecla_ingresada[controles.izquierda] ){
				this.direccion = 'izquierda';
				this.sprites.x_pos	-= movimiento;
				if( this.sprites.x_pos + this.sprites.margenes.izquierda < 0 ){
					this.sprites.x_pos = 0 - this.sprites.margenes.izquierda;
				};
				if( !this.sinchoque() ){
					this.sprites.x_pos	+= movimiento+1;
				};
			};
			if ( tecla_ingresada[controles.arriba] ){
				this.direccion = 'arriba';
				this.sprites.y_pos	-= movimiento;
				if( this.sprites.y_pos + this.sprites.margenes.arriba < 0 ){
					this.sprites.y_pos = 0 - this.sprites.margenes.arriba;
				};
				if( !this.sinchoque() ){
					this.sprites.y_pos	+= movimiento+1;
				};
			};
			if ( tecla_ingresada[controles.derecha] ){
				this.direccion = 'derecha';
				this.sprites.x_pos	+= movimiento;
				if( ( this.sprites.x_pos + this.sprites.dimension.ancho_c - this.sprites.margenes.derecha ) > canvas.width ){
					this.sprites.x_pos = canvas.width - this.sprites.dimension.ancho_c + this.sprites.margenes.derecha;
				};
				if( !this.sinchoque() ){
					this.sprites.x_pos	-= movimiento+1;
				};
			};
			if ( tecla_ingresada[controles.abajo] ){
				this.direccion = 'abajo';
				this.sprites.y_pos	+= movimiento;
				if( ( this.sprites.y_pos + this.sprites.dimension.alto_c - this.sprites.margenes.abajo ) > canvas.height ){
					this.sprites.y_pos = canvas.height - this.sprites.dimension.alto_c + this.sprites.margenes.abajo;
				};
				if( !this.sinchoque() ){
					this.sprites.y_pos	-= movimiento+1;
				};
			};
		};
	};
};
