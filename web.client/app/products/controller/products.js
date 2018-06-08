var app = angular.module("sitioerp")
    .controller('ProductsCtrl', function ($scope, requestService) {
        var vm = this;
        vm.get = function get() {
            requestService.getRequest({
                params: '',
                data: ''
            }, {
                url: 'products'
            }).then(function (res) {
                // TODO: Cambiar cuando se recuperen los datos.
                if (!res.success) {
                    alert('No se pudieron recuperar los datos.');
                    // return;
                }
                vm.allProducts = [{
                    id: '1',
                    name: 'Pera',
                    price: 4009,
                    tax: 506
                }, {
                    id: '2',
                    name: 'Sadia',
                    price: 2009,
                    tax: 256
                }];
            })
        };
        vm.get();

        vm.add = function add(pProduct) {
            console.log(pProduct);
            if (pProduct === undefined) {
                alert('Datos inconsostentes');
                return;
            }
            var data = {
                params: '',
                data: pProduct
            };

            requestService.postRequest(data, {
                url: 'products'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron insertar los datos');
                    // return;
                }
                vm.get();
                vm.product = {
                    id: undefined,
                    name: undefined,
                    tax: undefined
                }
            })
        }

        vm.delete = function deleteN(pIdProduct) {
            console.log(pIdProduct);
            if (!confirm('Seguro de realizar esta acción?')) {
                return;
            }
            var data = {
                params: pIdProduct,
                data: ''
            };
            requestService.deleteRequest(data, {
                url: 'products/'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron eliminar los datos');
                    return;
                }
                vm.get();
            })
        }

        vm.update = function update(pProduct) {
            console.log(pProduct)
            requestService.putRequest({
                params: '',
                data: pProduct
            }, {
                url: 'products'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron recuperar los datos.');
                    return;
                }
                vm.get();
            })
        };

        vm.select = function select(pProduct) {
            vm.product = {
                id: pProduct.id,
                name: pProduct.name,
                price: pProduct.price,
                tax: pProduct.tax
            };
        };

        vm.clearV = function clear() {
            vm.product = {
                id: undefined,
                name: undefined,
                tax: undefined
            }
        };
    });