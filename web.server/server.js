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
app.put('/clients', clients.clientsUpdate);
app.delete('/clients/:idCard', clients.clientsDelete);

app.get('/products', clients.clientsGet);
app.post('/products', clients.clientsInsert);
app.put('/clients', clients.clientsUpdate);
app.delete('/products/:idProduct', clients.clientsDelete);

app.get('/inventories', clients.clientsGet);
app.post('/inventories', clients.clientsInsert);
app.put('/inventories', clients.clientsUpdate);
app.delete('/inventories/:idInventory', clients.clientsDelete);

app.get('/bills', clients.clientsGet);
app.post('/bills', clients.clientsInsert);
app.put('/bills', clients.clientsUpdate);
app.delete('/bills/:idBill', clients.clientsDelete);


//Pone el servidor en escucha de peticiones,lo levanta en el puerto requerido.
//Para ello se necesita que navegue hacia la ruta y darle "node server" por medio del cmp 
server.listen(port, function () {
    console.log('Servidor escuchando en el puerto: ' + port);
});