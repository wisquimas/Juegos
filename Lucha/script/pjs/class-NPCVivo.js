var NPCVivo = function( posicion, source, equipo ){
	//Herencia de clase Objeto
	this.superClase=Vivo;
	this.superClase(posicion, source, equipo);
	delete this.superClase;
	
};