var Game = (function(){
	'use strict';
	var buffer_canvas,
	ctx,
	timer,
	fondo;
		
	function loop(){
		update();
		draw();
		timer = setTimeout(function(){window.requestAnimationFrame(loop);},80);
		//timer = window.requestAnimationFrame(loop);
	};
	
	function update(){
		//Personaje
		for(var i = 0; i < animaciones.length; i++){
			animaciones[i].loop_obj();
			animaciones[i].update_keys(tecla_ingresada);
		};
	};
	
	var compare= function(a,b) {
		
		var marg_a = a.sprites.margenes.abajo;
		var marg_b = b.sprites.margenes.abajo;
		
		var a_alto = a.sprites.y_pos + a.sprites.dimension.alto_c;
		var b_alto = b.sprites.y_pos + b.sprites.dimension.alto_c;
		
		var a_bajo = ( a_alto - marg_a );
		var b_bajo = ( b_alto - marg_b );
		
		/*Funcion para ordenar y generar profundidad*/
		if ( a_bajo < b_bajo )
			return -1;
		if ( a_bajo > b_bajo )
			return 1;
		return 0;
	}
	
	function draw(){
		//limpieza canvas
		buffer_ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		//imprimir Fondo
		buffer_ctx.drawImage(fondo,0,0);
		
		/*IMPRIMIR TINTINEOS*/
		for(var i = 0; i < tintineos.length; i++){
			tintineos[i].draw();
		};
		/*IMPRESION PUNTERO*/
		raton.draw();
		
		//ORDENAMOS LAS ANIMACIONES Y LAS IMPRIMIMOS
		animaciones.sort(compare);
		for(var i = 0; i < animaciones.length; i++){
			animaciones[i].draw();
		};
		
		
		//IMPRESION DE MENSAJES
		for(var i = 0; i < mensajes.length; i++){
			mensajes[i].loop();
		};
		
		//impresion del buffer
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(buffer_canvas,0,0);
	};

	function init_cannvas(){
		canvas			= document.getElementById('canvas');
		ctx				= canvas.getContext('2d');
		fondo			= document.getElementById('fondo');
		//Buffer canvas
		buffer_canvas	= document.createElement('canvas');
		buffer_canvas.width  = canvas.width;
		buffer_canvas.height = canvas.height;
		buffer_ctx		=	buffer_canvas.getContext('2d');
		/*añado tintineos*/
		for(var i=0;i<200;i++)
			new Tintineos( random(buffer_canvas.width) ,random(buffer_canvas.height),random(100),'0,255,0');
		for(var i=0;i<50;i++)
			new Tintineos( random(buffer_canvas.width) ,random(buffer_canvas.height),random(100),'255,255,255');
	};
	
	
	function entradas(){
		document.addEventListener('keydown',function(e){
			tecla_ingresada[e.keyCode] = true;
		});
		document.addEventListener('keyup',function(e){
			tecla_ingresada[e.keyCode] = false;
		});
		canvas.addEventListener('mousemove',function(e){
			raton.x = e.offsetX;
			raton.y = e.offsetY;
		},false)
	};
	
	function end_Game(){
		cancelAnimationFrame(timer);
	};
	return {
		'iniciar'	: function(){
			init_cannvas();
			entradas();
			loop();
		},
		'terminar'	: function(){
			end_Game();
		},
	};
})();
