var busqueda = $('#nombrebusqueda').val();


$.get( "/getListaBusqueda", {busqueda: busqueda}, function( data ) {
$("#LOADING").hide();
  for (var i=0; i < data.lista.length; i++){
      if(data.lista[i][2] == -1) {
          $('table').append('<tr><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
      } else {
        $('table').append('<tr><td><button class="view" data-url="'+data.lista[i][1]+'">View</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
      }

  }

});



$("body").on("click", ".view", function() {
  $("#LOADING").hide();
  $('table').html("");
	var busqueda = $(this).attr("data-url");
	$.get("/getListaBusqueda2",  {busqueda: busqueda},  function(data){
    for (var i=0; i < data.lista.length; i++){
        $('table').append('<tr><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
    }

  });
});
