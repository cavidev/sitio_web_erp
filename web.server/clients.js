var mongoDB = require('./mongoDB/connection.js');

exports.clientsGet = function clientsGet(req, res) {
    var data = {
        collection: 'clients',
        query: {}
    }
    mongoDB.findDocuments(data, function (documents) {
        res.send(documents)
    });
}

exports.clientsInsert = function clientsInsert(req, res) {
    var data = {
        collection: 'clients',
        query: req.body
    };
    mongoDB.addDocument(data, function (documents) {
        res.send(documents);
    });
}

exports.clientsDelete = function clientsDelete(req, res) {
    var data = {
        collection: 'clients',
        query: req.params
    };
    mongoDB.deleteDocument(data, function (documents) {
        res.send(documents);
    });
}