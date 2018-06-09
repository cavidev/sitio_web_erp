var sqlConect = require('../ConexionDBs/query.js');


exports.crearCliente = function crearCliente(datos, callback) {
    sqlConect.crearCliente(datos.body, function (resultado) {
        callback(resultado)
    });
}

exports.obtenerClientes = function obtenerClientes(callback) {
    sqlConect.obtenerClientes(function (resultado) {
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

exports.modificarCliente = function modificarCliente(datos, callback) {
    sqlConect.modificarCliente(datos.body, function (resultado) {
        callback(resultado)
    });
}


exports.eliminarCliente = function eliminarCliente(datos, callback) {
    console.log(datos.params)
    sqlConect.eliminarCliente(datos.params.idCard, function (resultado) {
        callback(resultado)
    });
}