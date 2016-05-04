//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////SOCKET///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var http = require('http');
var fs = require('fs');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

//////////////SIN ESTO NO COJE LOS DATOS DEL FORMULARIO/////////////////////
////////////////////////////////////////////////////////////////////////////
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true }));
////////////////////////////////////////////////////////////////////////////

router.use(express.static(__dirname));
router.use("/css", express.static(__dirname + '/css'));
router.use("/js", express.static(__dirname + '/js'));
router.use("/include", express.static(__dirname+'/include'));
router.use("/bootstrap", express.static(__dirname + '/bootstrap'));
router.use("/fonts", express.static(__dirname + '/fonts'));
router.use("/images", express.static(__dirname + '/images'));
router.use("/images/arms", express.static(__dirname + '/images/arms'));

router.get('/', function(req, res){
   res.sendfile('index.html')
   console.log('Usuario conectado');
});

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gpreis9117',
    database: 'clickerraid'
});

////////////////////////////////////////////////////////////////////////////AL INICIAR SESION
router.post('/startGame', function(req,res){
   var username = req.body.username;
   var password = req.body.password;

   connection.connect();
   connection.query('SELECT username FROM usuarios WHERE username='+username+' AND password='+password, function(err, rows, fields){
       if(rows.length > 0){
	   res.sendfile('game.html');
       }
   });
    
});   
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////REGISTRO
router.post('/register', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

   
});
////////////////////////////////////////////////////////////////////////////
server.listen(8081);

io.on('connection',function(socket){
   
   console.log('usuario conectado');
   
});
