<script type="text/javascript">
// JavaScript Document

var canvas,buffer_ctx;
var tecla_ingresada = Array();

/*INCLUÍMOS EL RATÓN*/
<?php include("controles/raton.js");?>

//Animaciones en general para el draw del core
var animaciones = Array();
var players = Array();
//Objetos contra los cuales chocar
var objetos_duros = Array();
var id_obj = 0;
//Personajes contra los que luchar
var personajes_vivos = Array();

//Diccionario para interacción de choque, etc...
var tipo_objeto = ['vivo','inmortal','objetos','npc'];
var facciones = ['neutral','enemigo_publico',['otro']];

/*Mensaje*/
var mensajes = [];
/*TINTINEOS*/
var tintineos = [];

/*TIPOGRAFIA*/
var tipografia = 'italic 20px Calibri'


/*EQUIPO*/
<?php include("objetos/equipo/class-Equipo.php");?>
/*CLASES*/
<?php include("pjs/clases/class-Clases.js");?>
/*RAZAS*/
<?php include("pjs/razas/class-Raza.php");?>

/*PERSONAJE MANIPULADO POR EL USUARIO*/
<?php include("pjs/class-PJ.js");?>
/*CLASE SIN INTELIGENCIA PARA PJS QUE PUEDEN GOLPEARSE*/
<?php include("pjs/class-NPCVivo.js");?>
/*CLASE SIN INTELIGENCIA PARA PJS QUE PUEDEN GOLPEARSE*/
<?php include("pjs/class-Vivo.js");?>
/*NPCS*/
<?php include("pjs/class-NPC.js");?>
/*OBJETOS SIN FISICA DE CHOQUE*/
<?php include("objetos/class-Obstaculo.js");?>
/*OBJETOS SIN FISICA DE CHOQUE*/
<?php include("objetos/class-Objeto.js");?>
/*MENSAJES*/
<?php include("core/class-mensaje.js");?>
/*EFECTOS DEL CORE*/
<?php include("core/class-tintineos.js");?>
/*CORE*/
<?php include("core/class-game.js");?>


function init(){
	new NPCVivo( //Npc con movimiento
		{
			'x'			: 100,
			'y'			: 100,
		},
		null,
		{
			faccion		: 4,//pj de otra faccion
			//'arma'		: new Arma,
		}
	);
	
	new PJ( //Personaje enemigo público
		{
			'x'			: 200,
			'y'			: 200,
		},
		null,
		{
			faccion		: 2,//enemigo publico
			//'arma'		: new Arma,
		},
		{
			'izquierda'	: 37,
			'arriba'	: 38,
			'derecha'	: 39,
			'abajo'		: 40,
			golpe		: 16,
		}
	);
	new NPCVivo( //Negro jeringa de una facicon
		{
			'x'			: 500,
			'y'			: 500,
		},
		null,
		{
			//raza		: new Negro_Jeringa,
			faccion		: 1,
			//'arma'		: new Arma,
		}
	);
	
	Game.iniciar();
};
function random(max){
	return ~~(Math.random()*max);
}
</script>