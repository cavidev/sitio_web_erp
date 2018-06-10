var sqlConect = require('../ConexionDBs/query.js');


exports.crearFacturacion = function crearFacturacion(datos, callback) {
    sqlConect.crearFactura(datos.body, function (resultado) {
        callback(resultado)
    });
}

exports.obtenerFacturaciones = function obtenerFacturaciones(callback) {
    sqlConect.obtenerFacturas(function (resultado) {
        if (resultado.success) {
            callback({
                success: true,
                data: resultado.data,
                message: "Datos obtenidos con éxito.",
            })
        }
        else {
            callback({
                success: false,
                data: resultado.message,
                message: 400
            })
        }
    });

}

exports.deshabilitarFacturacion = function deshabilitarFacturacion(datos, callback) {
    sqlConect.deshabilitarFactura(datos.params.idFactura, function (resultado) {
        callback(resultado)
    });
}

