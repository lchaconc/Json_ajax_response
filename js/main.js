"use strict";

$(document).ready(function () {

  $("#btnConsultar").click(function () {

      consultar();
    });

    $("#btnGetJson").click(function (e) { 
      e.preventDefault();
      
      getJson(  $("#txtIdUsuario").val()  );
    });
})

function consultar() {
  // var formData = new FormData();
  // formData.append("ajaxProducto", "frutas");


  var datos = {"ajaxProducto":$("#cmbProducto").val()};
  jQuery.ajax({
      url:'main_app/obtener_json.php',
      type:'POST',
      dataType:'json',
      data: datos,
      beforeSend:function(){
        $('.botonlg').val('Validando....');
      }
    })
    .done(function(respuesta){
      console.log(respuesta);
      $("#visor").html(respuesta);
      $('.botonlg').val('Consultar');
    })
    .fail(function(resp){
      console.log(resp);
      $("#visor").html(resp);
    })
    .always(function(){
      console.log("completado");
  });
}



function getJson(idUsuario) {
  $.getJSON("server/obtener_json.php?id_usr="+idUsuario , 
    function (data, textStatus, jqXHR) {
      //console.log(data[0].avance_json );
      renderData(data[0].avance_json);      
    }
  );
  
}


function renderData(dataset) {
    var array =  JSON.parse(dataset),
    limite = array.length,
    htmlString = $("<ul></ul>");
    console.log("Longitud del array: " + limite);
    

    for (let index = 0; index < limite; index++) { 
      //console.log(array[index]);         
      $(htmlString).append( "<li> Canción: <strong>" + array[index].nombre_cancion + "</strong> ---  Avance: <strong>" + array[index].avance + "</strong> --- Puntos obtenidos: <strong> "  +   array[index].total_puntos +  "</strong> </li>" );
    }

    $("#visor").html(htmlString);


}
