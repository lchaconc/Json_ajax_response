"use strict";

$(document).ready(function () {

  $("#btnConsultar").click(function () {

      consultar();
    })
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
      console.log("complete");
  });
}
