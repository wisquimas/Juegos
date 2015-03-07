var Mensaje = function(texto,x,y,creador){
	this.id = id_obj;
	id_obj++;
	mensajes.push(this);
	
	this.creador = creador;
	
	this.texto	= texto	|| '';
	this.x		= x		|| 0;
	this.y		= y		|| 0;
	
	this.y_inicial = this.y;
	
	this.loop = function(){
		this.y -= 0.1;
		if( this.y + 5 < this.y_inicial ){
			this.eliminar();
			return;
		};
		this.draw();
	};
	
	this.draw = function(){
		var text = this.texto;
		var metrics = buffer_ctx.measureText(text);
		buffer_ctx.font = tipografia;
		
		buffer_ctx.fillStyle="#FFFFFF";
		buffer_ctx.fillRect( this.x-5, this.y-20, metrics.width+10,30);
		
		buffer_ctx.fillStyle="#000000";
		buffer_ctx.fillText(text,this.x,this.y);
	};
	this.eliminar = function(){
		for( var i=0;i<mensajes.length;i++ ){
			if( mensajes[i].id == this.id ){
				mensajes.splice(i,1);
				this.creador.realizando_accion = false;
				return;
			};
		};
	};
};
