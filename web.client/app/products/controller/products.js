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
                        alert(res.message);
                        // return;
                    }
                    // vm.allProducts = [{
                    //     id: '1',
                    //     nombre: 'Pera',
                    //     precio: 4009,
                    //     impuesto: 506
                    // }, {
                    //     id: '2',
                    //     nombre: 'Sadia',
                    //     precio: 2009,
                    //     impuesto: 256
                    // }];
                    else {
                        vm.allProducts = res.data;
                    }

                })
        };
        vm.get();

        vm.add = function add(pProduct) {
            console.log(pProduct);
            if (pProduct === undefined) {
                alert('Datos inconsistentes');
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
                    alert(res.message);
                    // return;
                }
                vm.get();
                vm.product = {
                    id: undefined,
                    nombre: undefined,
                    impuesto: undefined
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
                    alert(res.message);
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
                        alert(res.message);
                        return;
                    }
                    vm.get();
                })
        };

        vm.select = function select(pProduct) {
            vm.product = {
                id: pProduct.id,
                nombre: pProduct.nombre,
                precio: pProduct.precio,
                impuesto: pProduct.impuesto
            };
        };

        vm.clearV = function clear() {
            vm.product = {
                id: undefined,
                nombre: undefined,
                impuesto: undefined
            }
        };
    });