var Arma = function(){
	//Herencia de clase Objeto
	this.superClase=Equipo;
	this.superClase();
	delete this.Equipo;
	
	/*CONFIGURACI0N*/
	this.nombre		= 'desarmado';
	this.tipo		= 'melee';
	this.fuerza		= 0;//Aumenta el golpe
	this.alcance	= 10;//Se utiliza para calcular golpear objeto
	
	this.golpear	= function( personaje ){
		var fuerza	= personaje.fuerza + this.fuerza;
		var alcance	= this.alcance;
		this.golpear_objeto( personaje, alcance,fuerza );
	};
	
	this.golpear_objeto = function( golpeador, alcance,fuerza ){
		var objetos = animaciones;
		var este = this;
		
		var direccion	= golpeador.direccion;
		var alcance		= alcance;
		
		var fuerza_golpe = fuerza;
		
		for( var i = 0; i < objetos.length; i++ ){
			if( golpeador.id == objetos[i].id ){
				//Saltamos al que golpea
				continue;
			};
			
			var este = {
				'izquierda'	: golpeador.sprites.x_pos - golpeador.sprites.margenes.izquierda,
				'arriba'	: golpeador.sprites.y_pos - golpeador.sprites.margenes.arriba,
				'derecha'	: (golpeador.sprites.x_pos + golpeador.sprites.dimension.ancho_c) - golpeador.sprites.margenes.derecha,
				'abajo'		: (golpeador.sprites.y_pos + golpeador.sprites.dimension.alto_c) - golpeador.sprites.margenes.abajo,
			};
			
			var otro = {
				'izquierda'	: objetos[i].sprites.x_pos  - objetos[i].sprites.margenes.izquierda,
				'arriba'	: objetos[i].sprites.y_pos  - objetos[i].sprites.margenes.arriba,
				'derecha'	: (objetos[i].sprites.x_pos + objetos[i].sprites.dimension.ancho_c) - objetos[i].sprites.margenes.derecha,
				'abajo'		: (objetos[i].sprites.y_pos + objetos[i].sprites.dimension.alto_c) - objetos[i].sprites.margenes.abajo,
			};
			var ok = false;
			switch( direccion ){
				case 'izquierda':
					if( este.arriba < otro.abajo && este.abajo > otro.arriba && (este.izquierda - alcance) < otro.derecha && este.derecha > otro.derecha ){
						ok = true;
					};
				break;
				case 'arriba':
					if( este.izquierda < otro.derecha && este.derecha > otro.izquierda && (este.arriba - alcance) < otro.abajo && este.abajo > otro.abajo ){
						ok = true;
					};
				break;
				case 'derecha':
					if( este.arriba < otro.abajo && este.abajo > otro.arriba && (este.derecha + alcance) > otro.izquierda && este.izquierda < otro.izquierda ){
						ok = true;
					};
				break;
				case 'abajo':
					if( este.izquierda < otro.derecha && este.derecha > otro.izquierda && (este.abajo + alcance) > otro.arriba && este.arriba < otro.arriba){
						ok = true;
					};
				break;
			};
			if ( ok ){
				if( tipo_objeto[0] == objetos[i].tipo ){
					objetos[i].perder_vida(fuerza_golpe);
				};
				if( tipo_objeto[3] == objetos[i].tipo ){
					objetos[i].interactuar(golpeador.direccion,'No me golpees, por favor.');
				};
			};
		};
	};
};
