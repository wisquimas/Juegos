<?php 
/*HUMANO*/
include("class-Humano.js");
?>
var Raza = function( ser ){
	
	this.nombre = 'Indefinido';
	ser.img.src = 'img/pj/sprite.png';
	
	ser.armas_permitidas = [];
	ser.armas_permitidas.push('desarmado');
    
	ser.armas_permitidas_tipo = [];
	ser.armas_permitidas_tipo.push('melee');
	
	return this.nombre;
};