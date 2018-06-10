var logicaFacturacion = require('../Logica/logicaFacturacion.js');



exports.crearFacturacion = function (rRequest, rResponse) {
    logicaFacturacion.crearFacturacion(rRequest, function (data) {
        rResponse.send(data);
    });
};

exports.obtenerFacturaciones = function (rRequest, rResponse) {
    logicaFacturacion.obtenerFacturaciones(function (data) {
        rResponse.send(data);
    });
};


exports.deshabilitarFacturacion = function (rRequest, rResponse) {
    logicaFacturacion.deshabilitarFacturacion(rRequest, function (data) {
        rResponse.send(data);
    });
};

