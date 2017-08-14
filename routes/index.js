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

router.get('/s/:busqueda', function(req, res, next) {


  res.render('busqueda', { title: 'busqueda', busqueda: req.params.busqueda });

});

router.post('/addtorrent', function(req, res, next) {
   console.log("LLAMADO" + req.body.url);
  //  console.log(req.body.url);

  request(req.body.url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //item_count2++;
      var $ = cheerio.load(html);
      var urltorrent = $("#content-torrent > a").attr("href");

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

  request('http://www.newpct.com/buscar-descargas/'+req.query.busqueda, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //item_count2++;
      var $ = cheerio.load(html);

      var  lista = [];

      var listabuscada = $("#categoryTable a").each(function (){
        var titulo = $(this).attr('title');
        var linkp = $(this).attr('href');
        lista.push([titulo, linkp]);
      });




      res.json({ lista:lista });
    } else {
      console.log("error");
    }
  });

});


module.exports = router;
