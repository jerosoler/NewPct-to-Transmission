var busqueda = $('#nombrebusqueda').val();
var pagina = $('#nombrebusquedapagina').val();
var serarchcalidad = $('#nombrebusquedacalidadsearch').val();
$('#nombrebusquedacalidad').val(serarchcalidad);
var calidad = $('#nombrebusquedacalidad').val();


$.get( "/getListaBusqueda", {busqueda: busqueda, page: pagina, calidad: calidad}, function( data ) {
$("#LOADING").hide();
  for (var i=0; i < data.lista.length; i++){
      if(data.lista[i][2] == -1) {
          $('table').append('<tr><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
      } else {
        $('table').append('<tr><td><button class="view" data-url="'+data.lista[i][1]+'">View</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
      }

  }

  for (var i=0; i < data.paginacion.length; i++){
      console.log("test");
        $('.paginacion').append('<li class="'+data.paginacion[i][1]+'"><a href="/s/'+busqueda+'/'+data.paginacion[i][0]+'/'+calidad+'">'+data.paginacion[i][0]+'</a></li>');
  }


});



$("body").on("click", ".view", function() {
  $("#LOADING").show();
  $('table').html("");
  $('.paginacion').html("");
	var busqueda = $(this).attr("data-url");
	$.get("/getListaBusqueda2",  {busqueda: busqueda},  function(data){
    $("#LOADING").hide();
    for (var i=0; i < data.lista.length; i++){
        $('table').append('<tr><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
    }

    var numbusca = busqueda.indexOf('/pg/');
    if(numbusca == -1) {
    } else {
      busqueda = busqueda.substring(0,numbusca);
    }

    for (var i=0; i < data.paginacion.length; i++){
        console.log("test");
          $('.paginacion').append('<li class="'+data.paginacion[i][1]+' serie"><div class="view" data-url="'+busqueda+'/pg/'+data.paginacion[i][0]+'">'+data.paginacion[i][0]+'</div></li>');
    }

  });
});
