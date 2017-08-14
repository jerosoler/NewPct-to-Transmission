var busqueda = $('#nombrebusqueda').val();


$.get( "/getListaBusqueda", {busqueda: busqueda}, function( data ) {
$("#LOADING").hide();
  for (var i=0; i < data.lista.length; i++){
      data.lista[i][0];
      $('table').append('<tr><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0].replace("Más información sobre", "") +'</p></td></tr>');
  }

});
