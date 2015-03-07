/*OBJETOS CONTRA LOS QUE SE PUEDE CHOCAR*/
var Obstaculo = function(posicion, source){
	//Herencia de clase Objeto
	this.superClase=Objeto;
	this.superClase(posicion, source);
	delete this.superClase;
	
	/*Damos de alta como objeto con fisica*/
	objetos_duros.push(this);
};
