$.get( "getLista", function( data ) {
  $("#LOADING").hide();

  for (var i=0; i < data.lista.length; i++){

      data.lista[i][0];
      $('table').append('<tr><td>'+moment(data.lista[i][2]).format('DD/MM/YY HH:mm')+'</td><td><button class="addtorrent" data-url="'+data.lista[i][1]+'">Add</button></td><td><p   class="info" data-info="'+data.lista[i][3].replace(/"/g, '&quot;')+'" data-href="'+ data.lista[i][1] +'">'+ data.lista[i][0] +'</p></td></tr>');
  }

});
