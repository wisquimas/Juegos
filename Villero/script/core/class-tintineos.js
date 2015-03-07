var Tintineos = function(x,y,timer,color){
	this.x=(x==null)?0:x;
	this.y=(y==null)?0:y;
	this.timer=(timer==null)?0:timer;
	
	this.draw = function(){
		this.timer += 1;
		if( this.timer > 100){
			this.timer-=200;
		};
		var c = this.timer/100;
		c = Math.abs(c);
		
		buffer_ctx.fillStyle='rgba('+color+','+c+')';
		buffer_ctx.fillRect(x,y,2,2);
	};
	tintineos.push(this);
};
