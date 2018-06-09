var sqlConect = require('../ConexionDBs/query.js');


exports.crearProducto = function crearProducto(datos, callback) {
    sqlConect.crearProducto(datos.body, function (resultado) {
        callback(resultado)
    });
}

exports.obtenerProductos = function obtenerProductos(callback) {
    sqlConect.obtenerProductos(function (resultado) {
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

exports.modificarProducto = function modificarProducto(datos, callback) {
    sqlConect.modificarProducto(datos.body, function (resultado) {
        callback(resultado)
    });
}


exports.eliminarProducto = function eliminarProducto(datos, callback) {
    sqlConect.eliminarProducto(datos.params.idProduct, function (resultado) {
        callback(resultado)
    });
}