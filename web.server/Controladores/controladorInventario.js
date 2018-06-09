var logicaInventario = require('../Logica/logicaInventario.js');



exports.crearInventario = function (rRequest, rResponse) {
	logicaInventario.crearInventario(rRequest, function (data) {
		rResponse.send(data);
	});
};

exports.obtenerInventarios = function (rRequest, rResponse) {
	logicaInventario.obtenerInventarios(function (data) {
		rResponse.send(data);
	});
};

exports.modificarInventario = function (rRequest, rResponse) {
	logicaInventario.modificarInventario(rRequest, function (data) {
		rResponse.send(data);
	});
};


exports.eliminarInventario = function (rRequest, rResponse) {
	logicaInventario.eliminarInventario(rRequest, function (data) {
		rResponse.send(data);
	});
};

