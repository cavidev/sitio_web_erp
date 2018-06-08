var sitioErp = angular.module('sitioerp', ['ngRoute']);

sitioErp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/clients/clients.html',
            controller: 'ClientsCtrl as clients'
        })
        .when('/productos', {
            templateUrl: 'app/products/products.html',
            controller: 'ProductsCtrl as products'
        })
        .when('/inventario', {
            templateUrl: 'app/inventory/inventory.html',
            controller: 'InventoryCtrl as inventory'
        })
        .when('/facturacion', {
            templateUrl: 'app/invoice/invoice.html',
            controller: 'InvoiceCtrl as invoice'
        });
});