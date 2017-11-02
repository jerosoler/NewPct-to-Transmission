


$('body').on("click", ".addtorrent", function() {
	console.log("CLICKED");
  var url= $(this).attr("data-url");

  $.post("/addtorrent",  {url: url},  function(data){


      alert("added");
  });

});




$('body').on("click", ".info", function() {

  var info= $(this).attr("data-info");
  var href= $(this).attr("data-href");
  console.log(this);
  $("body").append('<div class="floatdiv" style="position:fixed;  width: 100%; height: 100%; background: white;  z-index: 2; left: 0px; top: 0px; "><div class="close" style="position:relative; top: 20px; right: 20px; float: right; background: black; border-radius: 50%; color: white;     width: 20px;    height: 20px;    text-align: center;    line-height: 20px;">x</div>'+info+' <br><a href="'+href+'">Link</a></div>');

});


$('body').on("click", ".close", function() {
  $(".floatdiv").remove();
});


$("#submitbusqueda").click( function(){
    var busqueda = $('#nombrebusqueda').val();
		if(busqueda == "") {
		window.location.replace('/');
		} else {
    window.location.replace('/s/'+busqueda+'');
		}

});


$('#nombrebusqueda').keyup(function(e){
    if(e.keyCode == 13)
    {
        $("#submitbusqueda").click();
    }
});
