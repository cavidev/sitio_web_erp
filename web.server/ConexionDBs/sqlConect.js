var Connection = require('tedious').Connection;
//Configuraciones de conección a la base de datos sql server.

var config = {
    userName: 'sa',
    password: 'blancoz_525',
    server: 'localhost',
    options: {
        database: 'Examen2Web',
        driver: 'SQL Server Native Client 11.0',
        rowCollectionOnDone: true
    }
};

//Crea la conexión, si todo sale bien no tira el mensaje de error en la consola.
var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    }
});

exports.callProcedure = function (request, callback) {
    'use strict';
    var response = {};
    response.data = [],

        connection = new Connection(config);

    connection.on('connect', function (err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                error: "Hubo un problema con la conexión"
            });
        }

        request.on('row', function (columns) {
            var row = {};
            var flag = false;
            columns.forEach(function (column) {
                if (column.value === null) {
                    //console.log('NULL');
                } else {
                    if (column.metadata.colName == "") {
                        flag = true;
                    }
                    row[column.metadata.colName] = column.value;
                }
            });
            if (flag) {
                flag = false;
            }
            else {
                response.data.push(row);
            }

        });

        request.on('returnValue', function (parameterName, value, metadata) {
            connection.close();
            if (parameterName === 'success') {
                response.success = value;
                // callback({
                //     success: true,
                //     data: res
                // });  
            }
            else if (parameterName === 'message') {
                response.message = value;
            }
            else {
                response.success = false;
            };
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            callback(
                response
            );
        });

        connection.callProcedure(request);
    });
};