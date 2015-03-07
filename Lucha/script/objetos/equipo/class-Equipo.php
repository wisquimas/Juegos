<?php include('armas/class-Arma.js');?>
var Equipo = function(){
	this.peso		= 0;
	
	this.img	 = new Image();
	this.img.src = ''
	
	this.draw = function(info_poseedor){
		buffer_ctx.drawImage(
			this.img,
			info_poseedor.x,
			info_poseedor.y,
			info_poseedor.dimension.ancho,
			info_poseedor.dimension.alto,
			info_poseedor.x_pos,
			info_poseedor.y_pos,
			info_poseedor.dimension.ancho_c,
			info_poseedor.dimension.alto_c
		);
	};
};