var app = angular.module("sitioerp")
    .controller('InventoryCtrl', function ($scope, requestService) {
        var vm = this;
        vm.get = function get() {
            requestService.getRequest({
                params: '',
                data: ''
            }, {
                url: 'inventories'
            }).then(function (res) {
                // TODO: Cambiar cuando se recuperen los datos.
                if (!res.success) {
                    alert('No se pudieron recuperar los datos.');
                    // return;
                }
                vm.allInventory = [{
                        id: '1',
                        name: 'Pera',
                        quantity: 300,
                        quantityMin: 2,
                        quantityMax: 500,
                        detail: 'Gravado'
                    }, {
                        id: '2',
                        name: 'Sadia',
                        quantity: 200,
                        quantityMin: 10,
                        quantityMax: 450,
                        detail: 'Excento'
                    },
                    {
                        id: '3',
                        name: 'Banano',
                        quantity: 200,
                        quantityMin: 10,
                        quantityMax: 450,
                        detail: 'Gravado'
                    }
                ];
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
                url: 'inventories'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron insertar los datos');
                    // return;
                }
                vm.get();
                vm.clearV();
            })
        }

        vm.delete = function deleteN(pIdInventory) {
            console.log(pIdInventory);
            if (!confirm('Seguro de realizar esta acción?')) {
                return;
            }
            var data = {
                params: pIdInventory,
                data: ''
            };
            requestService.deleteRequest(data, {
                url: 'inventories/'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron eliminar los datos');
                    return;
                }
                vm.get();
            })
        }

        vm.update = function update(pProduct) {
            console.log(pProduct);
            requestService.putRequest({
                params: '',
                data: pProduct
            }, {
                url: 'inventories'
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
                quantity: pProduct.quantity,
                quantityMin: pProduct.quantityMin,
                quantityMax: pProduct.quantityMax,
                detail: pProduct.detail
            };
        };

        vm.clearV = function clear() {
            vm.product = {
                id: undefined,
                name: undefined,
                quantity: undefined,
                quantityMin: undefined,
                quantityMax: undefined,
                detail: undefined
            };
        };
    });