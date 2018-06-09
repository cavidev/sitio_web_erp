var logicaCliente = require('../Logica/logicaCliente.js');


exports.crearCliente = function (rRequest, rResponse) {
    logicaCliente.crearCliente(rRequest, function (data) {
        rResponse.send(data);
    });
};

exports.obtenerClientes = function (rRequest, rResponse) {
    logicaCliente.obtenerClientes(function (data) {
        rResponse.send(data);
    });
};

exports.modificarCliente = function (rRequest, rResponse) {
    logicaCliente.modificarCliente(rRequest, function (data) {
        rResponse.send(data);
    });
};

exports.eliminarCliente = function (rRequest, rResponse) {
    logicaCliente.eliminarCliente(rRequest,function (data) {
        rResponse.send(data);
    });
};