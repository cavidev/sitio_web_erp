var clients = require('./clients.js');

/****************************************************************/
//Configuraciones principales del servidor, con esto escucha las peticiones...
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 9000;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Se direccionan las vistas. EL mismos server levanta las vistas, para el caso de AngularJs.
app.use('/', express.static(__dirname + '/../web.client'));


/****************************************************************/
//Inicio de las direcciones. Endpoints!

app.get('/clients', clients.clientsGet);
app.post('/clients', clients.clientsInsert);
app.delete('/clients/:idCard', clients.clientsDelete);


//Pone el servidor en escucha de peticiones,lo levanta en el puerto requerido.
//Para ello se necesita que navegue hacia la ruta y darle "node server" por medio del cmp 
server.listen(port, function () {
    console.log('Servidor escuchando en el puerto: ' + port);
});