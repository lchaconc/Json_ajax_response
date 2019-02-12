"use strict";

var arrayJson;

$(document).ready(function () {

//Evento obtener json
  $("#btnGetJson").click(function (e) { 
      e.preventDefault();      
      getJson(  $("#txtIdUsuario").val()  );
    });

    //Actualizar avance json
    $("#btnUpdateJson").click(function (e) { 
      e.preventDefault();
      console.log("actualizacion");
      
      updateArray(arrayJson, $("#txtIdCancion").val(), $("#txtAvance").val() );
    });


})





function getJson(idUsuario) {
  $.getJSON("server/obtener_json.php?id_usr="+idUsuario , 
    function (data, textStatus, jqXHR) {
      //console.log(data[0].avance_json );
      arrayJson = JSON.parse(data[0].avance_json);
      renderData(arrayJson);      
    }
  );
  
}


function renderData(array) {
    var limite = array.length,
    htmlString = $("<ul></ul>");
    console.log("Longitud del array: " + limite);
    

    for (let index = 0; index < limite; index++) { 
      console.log(array[index]);         
      $(htmlString).append( "<li>  ID: <strong>" + array[index].id_cancion  + "</strong> --- Canción: <strong>" + array[index].nombre_cancion + "</strong> ---  Avance: <strong>" + array[index].avance + "</strong> --- Puntos obtenidos: <strong> "  +   array[index].total_puntos +  "</strong> </li>" );
    }

    $("#visor").html(htmlString);


}


function updateArray(array, id, campo ) {
  for (let index = 0; index < array.length; index++) {
    if (array[index].id_cancion == id   ) {
          array[index].avance = campo;      
    }   
  }
  
  sendAjax(array, $("#txtIdUsuario").val());
  
}


function sendAjax( array, idUsuario ) {


    var formData = new FormData ();
    formData.append("array_Json", JSON.stringify(array)  );
    formData.append("id_usuario", idUsuario  );
 

  jQuery.ajax({
    url: "./server/actualizar.php",
    type:'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend:function(){        
        console.log("enviando");
    }
  })
  .done(function(response){
        console.log(response);
        getJson(  $("#txtIdUsuario").val()  );  

  })
  .fail(function(resp){
    console.log(resp.responseText);
    
  })
  .always(function(){
    console.log("complete");
});











  
}