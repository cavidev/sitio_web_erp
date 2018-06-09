var logicaProducto = require('../Logica/logicaProducto.js');



exports.crearProducto = function (rRequest, rResponse) {
    logicaProducto.crearProducto(rRequest, function (data) {
        rResponse.send(data);
    });
};

exports.obtenerProductos = function (rRequest, rResponse) {
    logicaProducto.obtenerProductos(function (data) {
        rResponse.send(data);
    });
};

exports.modificarProducto = function (rRequest, rResponse) {
    logicaProducto.modificarProducto(rRequest, function (data) {
        rResponse.send(data);
    });
};


exports.eliminarProducto = function (rRequest, rResponse) {
    logicaProducto.eliminarProducto(rRequest, function (data) {
        rResponse.send(data);
    });
};
