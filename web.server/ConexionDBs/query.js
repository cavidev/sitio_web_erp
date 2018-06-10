var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConect = require('./sqlConect.js');

function requestError(err, requestError, code) {
    var errorMessage;
    if (code == 0) {
        errorMessage = 'Error al realizar la operación. Verifique la conexión con el servidor de datos';
    }
    else {
        errorMessage = 'Fallo en la operación. Verifique la consistencia de los datos';
    }
    return {
        success: false,
        data: err,
        error: requestError,
        title: 'Error',
        message: errorMessage,
        type: 'error'
    }
}

var requestSuccess = {
    success: true,
    title: "Success",
    message: "La operación se realizó de manera exitosa.",
    msgCode: 200
}




/*
    ----------------------------------------------------- Clientes -----------------------------------------------------
 */

/**
 * Obtener los clientes en la BD
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.obtenerClientes = function obtenerClientes(callback) {
    var request = new Request('ObtenerClientes', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)
}

/**
 * Crea un nuevo cliente en la BD
 * @param {*} datos Atributos del nuevo cliente: Cedula, nombre
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.crearCliente = function crearCliente(datos, callback) {
    var request = new Request('CrearCliente', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });

    request.addParameter('cedula', TYPES.VarChar, datos.cedula);
    request.addParameter('nombre', TYPES.VarChar, datos.nombre);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} datos Atributos a modificar del cliente
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.modificarCliente = function modificarCliente(datos, callback) {
    var request = new Request('ModificarCliente', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });

    request.addParameter('cedula', TYPES.VarChar, datos.cedula);
    request.addParameter('nombre', TYPES.VarChar, datos.nombre);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        console.log(resultado)
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} idRegistro Id del cliente a eliminar
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.eliminarCliente = function eliminarCliente(idRegistro, callback) {
    var request = new Request('EliminarCliente', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0))
        }
    });

    request.addParameter('cedula', TYPES.VarChar, idRegistro);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/*
    ----------------------------------------------------- Productos -----------------------------------------------------
 */

/**
 * Obtener los productos en la BD
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.obtenerProductos = function obtenerProductos(callback) {
    var request = new Request('ObtenerProductos', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)
}

/**
 * Crea un nuevo producto en la BD
 * @param {*} datos Atributos del nuevo producto: nombre, precio, impuesto
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.crearProducto = function crearProducto(datos, callback) {
    var request = new Request('CrearProducto', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addParameter('nombre', TYPES.VarChar, datos.nombre);
    request.addParameter('precio', TYPES.Int, datos.precio);
    request.addParameter('impuesto', TYPES.Int, datos.impuesto);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} datos Atributos a modificar del producto
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.modificarProducto = function modificarProducto(datos, callback) {
    var request = new Request('ModificarProducto', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addParameter('id', TYPES.VarChar, datos.id);
    request.addParameter('nombre', TYPES.VarChar, datos.nombre);
    request.addParameter('precio', TYPES.Int, datos.precio);
    request.addParameter('impuesto', TYPES.Int, datos.impuesto);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        console.log(resultado)
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} idRegistro Id del producto a eliminar
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.eliminarProducto = function eliminarProducto(idRegistro, callback) {
    var request = new Request('EliminarProducto', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0))
        }
    });

    request.addParameter('id', TYPES.VarChar, idRegistro);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/*
    ----------------------------------------------------- Productos -----------------------------------------------------
 */

/**
 * Obtener los inventarios en la BD
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.obtenerInventarios = function obtenerInventarios(callback) {
    var request = new Request('ObtenerInventarios', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)
}

/**
 * Crea un nuevo inventario en la BD, solo un inventario por producto.
 * @param {*} datos Atributos del nuevo producto: producto, cantidad, cantidadMin, cantidadMax, gravadoOExcepto
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.crearInventario = function crearInventario(datos, callback) {
    var request = new Request('CrearInventario', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addParameter('producto', TYPES.Int, datos.producto);
    request.addParameter('cantidad', TYPES.Int, datos.cantidad);
    request.addParameter('cantidadMin', TYPES.Int, datos.cantidadMin);
    request.addParameter('cantidadMax', TYPES.Int, datos.cantidadMax);
    request.addParameter('gravadoOExcepto', TYPES.Int, datos.gravadoOExcepto);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} datos Atributos a modificar del inventario
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.modificarInventario = function modificarInventario(datos, callback) {
    var request = new Request('ModificarInventario', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addParameter('id', TYPES.VarChar, datos.id);
    request.addParameter('producto', TYPES.Int, datos.producto);
    request.addParameter('cantidad', TYPES.Int, datos.cantidad);
    request.addParameter('cantidadMin', TYPES.Int, datos.cantidadMin);
    request.addParameter('cantidadMax', TYPES.Int, datos.cantidadMax);
    request.addParameter('gravadoOExcepto', TYPES.Int, datos.gravadoOExcepto);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        console.log(resultado)
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}

/**
 * 
 * @param {*} idRegistro Id del producto a eliminar
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.eliminarInventario = function eliminarProducto(idRegistro, callback) {
    var request = new Request('EliminarInventario', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0))
        }
    });

    request.addParameter('id', TYPES.VarChar, idRegistro);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}


/*
    ----------------------------------------------------- Facturacion -----------------------------------------------------
 */

/**
 * Obtener las facturas en la BD
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.obtenerFacturas = function obtenerFacturas(callback) {
    var request = new Request('ObtenerFacturas', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, callback)
}

/**
 * Crea un nuevo inventario en la BD, solo un inventario por producto.
 * @param {*} datos Atributos del nuevo producto: producto, cantidad, cantidadMin, cantidadMax, gravadoOExcepto
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.crearFactura = function crearFactura(datos, callback) {
    var request = new Request('CrearFactura', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0));
        }
    });
    request.addParameter('cliente', TYPES.VarChar, datos.cliente);
    request.addParameter('fecha', TYPES.VarChar, datos.fecha);
    request.addParameter('montoTotal', TYPES.Int, datos.montoTotal);
    request.addParameter('subtotal', TYPES.Int, datos.subtotal);
    request.addParameter('impuestos', TYPES.Int, datos.impuestos);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            // console.log(resultado)
            // for (i in datos.listaProductos) {
            //     var request = new Request('AsociarProductoAFactura', function (err) {
            //         console.log(err)
            //         if (err) {
            //             callback(requestError(err, request.error, 0));
            //         }
            //     });
            //     request.addParameter('idFactura', TYPES.Int, resultado.data[0].IdFactura);
            //     request.addParameter('idProducto', TYPES.Int, datos.listaProductos[i].idProducto);
            //     request.addParameter('cantidad', TYPES.Int, datos.listaProductos[i].cantidad);
            //     request.addOutputParameter('success', TYPES.Bit);
            //     sqlConect.callProcedure(request, function (resultado) {
            //         if (!resultado.success) {
            //             callback(requestError(resultado, request.error, 1));
            //         }
            //     })
            // }
            callback({
                success: true,
                title: "Success",
                message: "La operación se realizó de manera exitosa.",
                msgCode: 200
            })
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}


/**
 * 
 * @param {*} idRegistro Id del producto a eliminar
 * @param {*} callback Función para retorno del resultado de la operación
 */
exports.deshabilitarFactura = function deshabilitarFactura(idRegistro, callback) {
    var request = new Request('DeshabilitarFactura', function (err) {
        console.log(err)
        if (err) {
            callback(requestError(err, request.error, 0))
        }
    });

    request.addParameter('id', TYPES.VarChar, idRegistro);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConect.callProcedure(request, function (resultado) {
        if (resultado.success) {
            callback(requestSuccess)
        }
        else {
            callback(requestError(resultado, request.error, 1));
        }
    })
}