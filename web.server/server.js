/* Archivos donde estan los controladores en el servidor. */

var clienteCtrl = require('./Controladores/controladorCliente');
var productoCtrl = require('./Controladores/controladorProducto');
var inventarioCtrl = require('./Controladores/controladorInventario');
var facturacionCtrl = require('./Controladores/controladorFacturacion');

/****************************************************************/
//Configuracion del servidor.
bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../web.client'));


/****************************************************************/
//Listado de Endpoints


/**
 * Endpoints Clientes
 */
app.post('/clients', clienteCtrl.crearCliente);
app.get('/clients', clienteCtrl.obtenerClientes);
app.put('/clients', clienteCtrl.modificarCliente);
app.delete('/clients/:idCard', clienteCtrl.eliminarCliente);

/**
 * Endpoints Productos
 */

app.post('/products', productoCtrl.crearProducto);
app.get('/products', productoCtrl.obtenerProductos);
app.put('/products', productoCtrl.modificarProducto);
app.delete('/products/:idProduct', productoCtrl.eliminarProducto);

/**
 * Endpoints Inventarios
 */

app.post('/inventories', inventarioCtrl.crearInventario);
app.get('/inventories', inventarioCtrl.obtenerInventarios);
app.put('/inventories', inventarioCtrl.modificarInventario);
app.delete('/inventories/:idInventory', inventarioCtrl.eliminarInventario);

/**
 * Endpoints Facturación
 */

app.post('/invoices', facturacionCtrl.crearFacturacion);
app.get('/invoices', facturacionCtrl.obtenerFacturaciones);
app.delete('/invoices/:idFactura', facturacionCtrl.deshabilitarFacturacion);

// Levantar el servidor, puerto 9000.
server.listen(port, function () {
    console.log('Servidor escuchando en el puerto: ' + port);
});