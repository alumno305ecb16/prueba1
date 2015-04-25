// JavaScript Document

// --------------- en esta parte se inicializa el selctor de fecha --------------------------
$(document).on("pagecreate",function(){
	
	var preguntas1 = "";
    var preguntas2 = "";
	//en español
	
	function error (transaction, err) 
{
  alert ("DB error : " + err.message);
  return false;
}    
		$("input.selectorfechaum", this ).mobipick({
				locale: "es"
			});
	//se dice quien va utilizar el selector de fehca
    var picker = $( "#fechaum", this );
    picker.mobipick();
	
	//formato para el input de fecha
	var picker = $( "#fechaum" ).mobipick({
    dateFormat: "dd-MM-yyyy"
});

    var picker2 = $( "#TxtFNacPaciente", this );
    picker2.mobipick();
	
	//formato para el input de fecha
	var picker2 = $( "#TxtFNacPaciente" ).mobipick({
    dateFormat: "dd-MM-yyyy"
});

    var picker3 = $( "#TxtFConsultaPaciente", this );
    picker2.mobipick();
	
	//formato para el input de fecha
	var picker3 = $( "#TxtFConsultaPaciente" ).mobipick({
    dateFormat: "dd-MM-yyyy"
});



});
// ----------------------- fin del selector de fecha ---------------------------------

$(document).ready(function(e) {
	
	var dbTam = 8 * 1024 * 1024; // 8MB
	var db = openDatabase ("Medico", "1.0", "Datos app medico", dbTam);


    db.transaction (function (transaction)
      {
       var sql = "CREATE TABLE IF NOT EXISTS Pacientes2 " +
       " (Cve_Paciente INTEGER  PRIMARY KEY, " +
       "Nombre_Paciente NOT NULL, " +
       "Edad_Paciente NOT NULL, " +
       "Dir_Paciente , " +
       "FNac_Paciente, " +
       "FConsulta_Paciente NOT NULL, " +
	   "Interrogtorio_Directo NOT NULL, " +
  	   "FProbAlum_Paciente, " +
	   "Riesgo_Obstetrico, " +
       "FUMen_Paciente)"
       transaction.executeSql (sql, undefined, function ()
        {
         alert ("Tabla Creada");
        }, error);
      });

      function error (transaction, err)
       {
        alert ("Error de BD: " + err.message);
        return false;
       } 
	   
	   
	
	//la linea 28 se comenta en este momento por que revisa si el dispostivo esta listo
	//como la computadora no es un dipsositvo, nucna esta listo y por lo tanto no podemos acceder al codigo debajo
	//ya cuando se suba y se empaquete en phonegap se quita el comentario de la line 28 para que el codigo sea accesible unicamente
	// cuando el dispositivo (tablet, telefono) este listo (ready) y tambien quitar el ('//') de la ultima linea
	
document.addEventListener("deviceready",function(){


$('#Borrar').on('tap', function (){
	db.transaction (function (transaction) 
  {
    var sql = "DROP TABLE Pacientes2 ";
    transaction.executeSql (sql, undefined, function (){ alert ("borrada");}, error);
  });
});

$(document).on('tap', "li.pacienteseleccionado", function() {
    alert ("pie paciente seleccionado");
    $(".pie").append("<h3>"+  $(this).find('a').text() +"</h3>");
});

$('#Guardar').on('tap', function (){

   db.transaction(function (tx) {
	   
	   
var pnombre = $('#TxtNombrePaciente').val();
var pedad = $('#TxtEdadPaciente').val();
var pdireccion = $('#TxtDirPaciente').val();
var pnacimiento = $('#TxtFNacPaciente').val();
var pconsulta = $('#TxtFConsultaPaciente').val();
var pinterrogatorio = $( "#TxtInterrogatorioDirecto option:selected" ).text();
  
  var sqlagregar = "INSERT INTO Pacientes2 (Nombre_Paciente, Edad_Paciente, Dir_Paciente, FNac_Paciente, FConsulta_Paciente, Interrogtorio_Directo) VALUES (?,?,?,?,?,?)";
 

    tx.executeSql (sqlagregar, [pnombre, pedad, pdireccion, pnacimiento, pconsulta, pinterrogatorio], pacientefooter (), error);
 
	
});
});


function cargarlistapacientes()
{
$('#listapacientes').empty();
 db.transaction (function (ejecutar){
   var sql = "SELECT Nombre_Paciente FROM Pacientes2";
   ejecutar.executeSql (sql, undefined,
   function (ejecutar, resultado){
 

for (var x = 0; x < resultado.rows.length ; x++)
{
	
	var filaP = resultado.rows.item (x);
	

	$("#listapacientes").append('<li class="pacienteseleccionado"><a href="#">'+filaP.Nombre_Paciente+'</a></li>');
$('#listapacientes').listview('refresh');


}

   });

	  });


}


function pacientefooter()
 {
		  db.transaction (function (ejecutar){
   var sql = "SELECT * FROM Pacientes2";
   ejecutar.executeSql (sql, undefined,
   function (ejecutar, resultado){
 

	
	var filaP = resultado.rows.item (resultado.rows.length-1)
  paciente_actual =(filaP.Nombre_Paciente);
  clave_actual =  (filaP.Cve_Paciente);
 //( new question(filaP.CvePregunta,filaP.Pregunta, filaP.R1,filaP.R2, filaP.R3.);	
   $(".pie").append("<h3>"+ paciente_actual +"</h3>");

   });
		  });
 }

$('#Mostrar').on('tap', function(){

	  db.transaction (function (ejecutar){
   var sql = "SELECT * FROM Pacientes2";
   ejecutar.executeSql (sql, undefined,
   function (ejecutar, resultado){
 

for (var x = 0; x < resultado.rows.length ; x++)
{
	
	var filaP = resultado.rows.item (x)
  alert (filaP.Nombre_Paciente);
    alert (filaP.Cve_Paciente);
 //( new question(filaP.CvePregunta,filaP.Pregunta, filaP.R1,filaP.R2, filaP.R3.);	
}

   });

	  });


});


// esta parte se ejecuta cuando se le de click a un imput de tipo check box (cualquier checkbox)
 $('input:checkbox').change(function() {
//por medio de el id de a quien se le hizo click podemos saber a quien hace que cosa
	$quien = $(this).attr('id');	
 //por ejemplo si el checkbox cambio a estar 'checado' cambiamos el css de la etiquera de $quien (que es el elemnto checkbox reconocido por id)
    if ($(this).is(':checked'))
     {
      $("label[for="+$quien+"]").css('color','#0F0');	 
     }
    else
     {
	  $("label[for="+$quien+"]").css('color','#F00');	 
	 }
 });

$('#btnlistadopacientes').on('click', function (){
	alert ("here");
	cargarlistapacientes();
	$( "body" ).pagecontainer( "change", "#seleccion_paciente", { transition: "slide" });
});


//cuando le doy 'tap' al elemento con el id 'calcular' se ejecuta este codigo 
// este evento tendra que cambiar a tap en vez de click una vez que se suba para compilar para la app
$('#calcular').on('tap',function(){
	var suma=0;
	//cehcamos si esta 'checado' el elemento de id 'chc1' que es un checkbox
	if ($('#chc1').is(':checked'))
	 {
 		suma = suma + 1; 
	 }
    if ($('#chc2').is(':checked'))
	 {
		suma = suma + 0.5; 
	 }
	 
	if ($('#chc3').is(':checked'))
	 {
		suma = suma + 3; 
	 }
// se coloca la variable suma que tambien puede ser texto en el elemento que tiene el id 'resultado' en este caso un div
	$("#resultado").text(suma);
});


   $(".preguntas_uno").on('tap', function (){
       preguntas1 = $(this).find('p').text();
	   $( "body" ).pagecontainer( "change", "#page2", { transition: "slide" });
   });
   
   $(".preguntas_dos").on('tap', function (){
       preguntas2 = $(this).find('p').text();
	   $( "body" ).pagecontainer( "change", "#page3", { transition: "slide" });
	   
	   $("#resultado").text("seccion preguntas uno = " + preguntas1 + " seccion preguntas dos = " + preguntas2)
   });



// este metodo de date lo pongo hasta el final por que parece que causa conflicto si lo pongo antes
	picker.on( "change", function() {
    // formatted date, like yyyy-mm-dd              
    var date = $( this ).val();
 
    // JavaScript Date object
    var dateObject = $( this ).mobipick( "option", "date" );
});

	picker2.on( "change", function() {
    // formatted date, like yyyy-mm-dd              
    var date = $( this ).val();
 
    // JavaScript Date object
    var dateObject = $( this ).mobipick( "option", "date" );
});

	picker3.on( "change", function() {
    // formatted date, like yyyy-mm-dd              
    var date = $( this ).val();
 
    // JavaScript Date object
    var dateObject = $( this ).mobipick( "option", "date" );
});

});
});
