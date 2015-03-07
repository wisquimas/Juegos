var NPCVivo = function( posicion, source, equipo ){
	//Herencia de clase Objeto
	this.superClase=Vivo;
	this.superClase(posicion, source, equipo);
	delete this.superClase;
	
	/*ACTUALIZACION DE DATOS - COMIENZA LA INTELIGENCIA :) */
	this.update_keys = function(){
		if( !this.realizando_accion ){
			/*COMPROBAMOS QUÉ OBJETO ESTA MAS CERCA*/
			var cercano = this.buscar_cercano();
		};
		
	};
	
	this.interaccion = function( otro_objeto, distancia ){
		if( tipo_objeto[0] == otro_objeto.tipo ){
			/*OBJETO VIVO*/
			/*COMPROBAMOS A QUÉ FACCIÓN PERTENECE*/
			if( otro_objeto.faccion == 2 || this.faccion != otro_objeto.faccion ){
				/*SI ES ENEMIGO PÚBLICO O ES DE UNA FACCIÓN DISTINTA
					comprobamos distancia de golpe
				*/
				/*TENEMOS QUE ACERCANOS AL OBJETIVO*/
				this.mover( otro_objeto, distancia );
			};
		};
		
	};
	
	this.mover = function ( objetivo,distancia_objetivo ){
		var movimiento  = this.velocidad - this.equipo.arma.peso;
		if( movimiento <=0 ){
			/*En caso de perder ya toda la velocidad entra la fuerza en escena*/
			movimiento += this.fuerza;
		};
		if( movimiento <= 0 ){
			if( this.velocidad_defecto + this.fuerza - this.equipo.arma.peso <= 0 ){
				new Mensaje('No puedes moverte por exceso de peso',this.sprites.x_pos,this.sprites.y_pos,this);
			};
			return;
		};
		
		var angulo = this.conseguir_Angulo( objetivo );
		var mov_x = Math.cos(angulo)*movimiento;
		var mov_y = Math.sin(angulo)*movimiento;
		if( mov_x > 0 ){
			this.direccion = 'izquierda';
		}else{
			this.direccion = 'derecha';
		};
		if( mov_y > 7 ){
			this.direccion = 'arriba';
		}else{
			if( mov_y < -7 ){
				this.direccion = 'abajo';
			};
		};
		if( this.equipo.arma.alcance > distancia_objetivo ){
			/*SI PODEMOS GOLPEAMOS*/
			this.golpear();
			return;
		};
		this.estado_actual = this.estados[0];
		this.sprites.x_pos	+= -mov_x;
		this.sprites.y_pos	+= -mov_y;
		
	};
	
	this.conseguir_Angulo = function(objeto){
		if(objeto!=null)
			return (Math.atan2(this.sprites.y_pos - objeto.sprites.y_pos ,this.sprites.x_pos - objeto.sprites.x_pos));
	};
	
	this.buscar_cercano = function(){
		var objetos = objetos_duros;
		var mas_cercano = null;
		var distancia_mas_corta = 999999999999999;/*Colocamos valor alto para comparar*/
		for( var i = 0; i < objetos.length; i++ ){
			if( this.id == objetos[i].id ){
				//Saltamos a nuestro propio objeto
				continue;
			};
			/*RECOGEMOS LA DISTANCIA DE CADA OBJETO*/
			var distancia = this.dentro_Vision( objetos[i] );
			if( distancia < distancia_mas_corta ){
				distancia_mas_corta = distancia;
				mas_cercano = objetos[i];
			};
		};
		if( mas_cercano && this.vision >= distancia_mas_corta ){
			/*Si podemos buscamos interactuar*/
			this.interaccion( mas_cercano, distancia_mas_corta );
		}else{
			/*Si no hay nada a la vista nos vamos a estatico*/
			this.estado_actual = this.estados[3];
		};
	};
	
	this.dentro_Vision = function( objeto ){
		/*Calculamos la distancia del objeto*/
		if(objeto!=null){
			var dx	= this.sprites.x_pos - objeto.sprites.x_pos ;
			var dy	= this.sprites.y_pos - objeto.sprites.y_pos;
			return (Math.sqrt(dx*dx+dy*dy)-( (this.sprites.dimension.ancho_c/2) + (objeto.sprites.dimension.ancho_c /2) ));
		}
	};
};