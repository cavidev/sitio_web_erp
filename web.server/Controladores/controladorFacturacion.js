var logicaFacturacion = require('../Logica/logicaFacturacion.js');



exports.crearFacturacion = function (rRequest, rResponse) {
    logicaFacturacion.crearFacturacion(function (data) {
        rResponse.send(data);
    });
};

exports.obtenerFacturacion = function (rRequest, rResponse) {
    logicaFacturacion.obtenerFacturacion(function (data) {
        rResponse.send(data);
    });
};


exports.deshabilitarFacturacion = function (rRequest, rResponse) {
    logicaFacturacion.deshabilitarFacturacion(function (data) {
        rResponse.send(data);
    });
};

