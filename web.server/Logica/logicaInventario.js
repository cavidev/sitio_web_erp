var sqlConect = require('../ConexionDBs/query.js');


exports.crearInventario = function crearInventario(datos, callback) {
    sqlConect.crearInventario(datos.body, function (resultado) {
        callback(resultado)
    });
}

exports.obtenerInventarios = function obtenerInventarios(callback) {
    sqlConect.obtenerInventarios(function (resultado) {
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

exports.modificarInventario = function modificarInventario(datos, callback) {
    sqlConect.modificarInventario(datos.body, function (resultado) {
        callback(resultado)
    });
}


exports.eliminarInventario = function eliminarInventario(datos, callback) {
    sqlConect.eliminarInventario(datos.params.idInventory, function (resultado) {
        callback(resultado)
    });
}