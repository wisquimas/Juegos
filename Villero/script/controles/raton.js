var Raton = function(){
	this.x		= 0;
	this.y		= 0;
	this.ancho	= 20;
	this.alto	= 20;
	
	this.color_default = 'black';
	this.color	= 'black';
	this.grosor = 2;
	
	this.draw = function(){
		var x = (this.x*100)/$(canvas).innerWidth();
		x = x * canvas.width / 100;
		var y = (this.y*100)/$(canvas).innerHeight();
		y = y * canvas.height / 100;
		
		buffer_ctx.beginPath();
		buffer_ctx.strokeStyle = this.color;
		buffer_ctx.rect( x-(this.ancho/2), y-(this.alto/2), this.ancho, this.alto);
		buffer_ctx.lineWidth = this.grosor;
		buffer_ctx.stroke();
	};
};
raton = new Raton;
