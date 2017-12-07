var express = require('express');
var router = express.Router();

var FeedMe = require('feedme');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var exec = require('child_process').exec;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/s/:busqueda/:page?/:calidad?', function(req, res, next) {


  res.render('busqueda', { title: 'busqueda', busqueda: req.params.busqueda, page: req.params.page, calidad: req.params.calidad });

});

router.post('/addtorrent', function(req, res, next) {
   console.log("LLAMADO" + req.body.url);
  //  console.log(req.body.url);

  request(req.body.url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //item_count2++;
      var $ = cheerio.load(html);
      //var urltorrent = $("#content-torrent > a").attr("href");
      var textofiltrar = $("#tab1 script").html();
      var urltorrent = textofiltrar.match(/http:\/\/.*?\.html/);



      exec('transmission-remote -a ' + urltorrent, function (error, stdout, stderr) {
      //exec('ls ', function (error, stdout, stderr) {
  //      console.log("hey");
      //  console.log(error);
    //    console.log(stderr);
          if(stdout) {
            //  console.log(stdout);
              res.json({ stdout: stdout });
          }
      });
    }
  });




});



router.get('/getLista', function(req, res, next) {
  console.log("GET LISTA");
  var  lista = [];
  var item_count = 0;
  var item_count2 = 0;
  var item_total = 0;


    http.get('http://www.newpct.com/feed', function(res2) {
      var parser = new FeedMe();
      parser.on('title', function(title) {
        //console.log('title of feed is', title);
      });
      parser.on('item', function(item) {

        item_count++;
      //    console.log(item);
          lista.push([item.title, item.link, item.pubdate, item.description, item.enclosure.url]);
                  /*request(item.link, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                      item_count2++;
                      var $ = cheerio.load(html);
                      var urltorrent = $("#content-torrent > a").attr("href");

                      lista.push([item.title, item.link, urltorrent]);
                        if(item_count2 == item_total) {
                          sendtoclient();
                        }
                    }
                  }); */

      });
      res2.pipe(parser);
      parser.on('end', function() {
        item_total = item_count;
        sendtoclient();
      //  res.json({ lista: lista });

      });

    });

    function sendtoclient() {
      res.json({ lista: lista });

    }

});


router.get('/getListaBusqueda', function(req, res, next) {

  if(req.query.busqueda == ' ') {
    req.query.busqueda = '';
  }

  var url = 'http://www.newpct.com/?page=buscar&q='+req.query.busqueda;
  if(!req.query.page) {
     url = 'http://www.newpct.com/?page=buscar&q='+req.query.busqueda+'&calidad='+req.query.calidad;
  } else {
    url = 'http://www.newpct.com/?page=buscar&q='+req.query.busqueda+'&pg='+req.query.page+'&calidad='+req.query.calidad;
  }

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //item_count2++;
      var $ = cheerio.load(html);

      var  lista = [];
      var paginacion = [];

      var listabuscada = $(".buscar-list .info > a").each(function (){
        //var titulo = $(this).attr('title');
        var titulo = $(this).children("h2").html();
        var view = titulo.indexOf("color:red");

        var linkp = $(this).attr('href');
        lista.push([titulo, linkp, view]);
      });

      var paginacionbuscada = $(".pagination > li > a").each(function (){
        //var titulo = $(this).attr('title');
        var pagina = $(this).text();
        var classe = $(this).attr('class');

        if(pagina != "Next" && pagina != "Last" && pagina != "First" && pagina != "Prev") {
          paginacion.push([pagina, classe]);
       }
      });



      res.json({ lista:lista,  paginacion: paginacion  });
    } else {
      console.log("error");
    }
  });

});


router.get('/getListaBusqueda2', function(req, res, next) {

  request(req.query.busqueda, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //item_count2++;
      var $ = cheerio.load(html);

      var  lista = [];
      var paginacion = [];

      var listabuscada = $(".buscar-list .info > a").each(function (){
        //var titulo = $(this).attr('title');
        var titulo = $(this).children("h2").html();


        var linkp = $(this).attr('href');
        lista.push([titulo, linkp]);
      });

      var paginacionbuscada = $(".pagination > li > a").each(function (){
        //var titulo = $(this).attr('title');
        var pagina = $(this).text();
        var classe = $(this).attr('class');

        if(pagina != "Next" && pagina != "Last" && pagina != "First" && pagina != "Prev") {
          paginacion.push([pagina, classe]);
       }
      });




      res.json({ lista:lista, paginacion: paginacion });
    } else {
      console.log("error");
    }
  });

});


module.exports = router;
