<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Documento sin título</title>
        <link rel="stylesheet" title="Desactivado para vista previa en navegador: css/style.css" type="text/css"/>
<style type="text/css">

/* CSS Document */
*{
	margin: 0px;
	padding:0px;
}
body{
	background:black;
}
#canvas{
	max-width: 90%;
	max-height: 90%;
	margin: 6px auto;
	display: inherit;
	box-shadow: 0px 0px 0px 3px rgb(255, 255, 255);
}

</style>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <?php include("script/js_new.php");?>
    </head>
    <body onload="init()">
    	<canvas id="canvas" width="1024" height="768"></canvas>
        <img src="img/fondo.jpg" width="1200" height="891" style="display:none;" id="fondo"/>
        <img src="img/pj/sprite.png" width="411" height="290" style="display:none" id="sprite"/>
    </body>
</html>