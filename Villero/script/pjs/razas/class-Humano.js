var Humano = function( ser ){
	//Herencia de clase Objeto
	this.superClase=Raza;
	this.superClase(ser);
	delete this.superClase;
	
	this.nombre = 'Humano';
	ser.img.src = 'img/pj/humano2.png';
};