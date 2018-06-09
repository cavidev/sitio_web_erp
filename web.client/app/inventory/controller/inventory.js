var app = angular.module("sitioerp")
    .controller('InventoryCtrl', function ($scope, requestService) {
        var vm = this;

        vm.gravadoOExento = function gravadoOExento(value) {
            if (value == true) {
                return 'Gravado';
            }
            else {
                return 'Exento';
            }
        }

        vm.revertGravadoOExento = function gravadoOExento(value) {
            if (value == 'Gravado') {
                return 1;
            }
            else {
                return 0;
            }
        }

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
                    else {
                        vm.allInventory = res.data
                        for (element in vm.allInventory) {
                            vm.allInventory[element].gravadoOExcepto = vm.gravadoOExento(vm.allInventory[element].gravadoOExcepto);
                        }

                    }
                    // vm.allInventory = [{
                    //         id: '1',
                    //         producto: '2',
                    //         nombre: 'Pera',
                    //         cantidad: 300,
                    //         cantidadMin: 2,
                    //         cantidadMax: 500,
                    //         gravadoOExcepto: 'Gravado'
                    //     }, {
                    //         id: '2',
                    //         nombre: 'Sadia',
                    //         cantidad: 200,
                    //         cantidadMin: 10,
                    //         cantidadMax: 450,
                    //         gravadoOExcepto: 'Excento'
                    //     },
                    //     {
                    //         id: '3',
                    //         nombre: 'Banano',
                    //         cantidad: 200,
                    //         cantidadMin: 10,
                    //         cantidadMax: 450,
                    //         gravadoOExcepto: 'Gravado'
                    //     }
                    // ];

                })
        };
        vm.get();

        vm.add = function add(pProduct) {
            console.log(pProduct);
            if (pProduct === undefined) {
                alert('Datos inconsistentes');
                return;
            }
            pProduct.gravadoOExcepto = vm.revertGravadoOExento(pProduct.gravadoOExcepto);

            var data = {
                params: '',
                data: pProduct
            };

            requestService.postRequest(data, {
                url: 'inventories'
            }).then(function (res) {
                if (!res.success) {
                    alert(res.message);
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
                    alert(res.message);
                    return;
                }
                vm.get();
            })
        }

        vm.update = function update(pProduct) {
            console.log(pProduct);
            pProduct.gravadoOExcepto = vm.revertGravadoOExento(pProduct.gravadoOExcepto);
            requestService.putRequest({
                params: '',
                data: pProduct
            }, {
                    url: 'inventories'
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
                producto: pProduct.producto,
                nombre: pProduct.nombre,
                cantidad: pProduct.cantidad,
                cantidadMin: pProduct.cantidadMin,
                cantidadMax: pProduct.cantidadMax,
                gravadoOExcepto: pProduct.gravadoOExcepto
            };
        };

        vm.clearV = function clear() {
            vm.product = {
                id: undefined,
                producto: undefined,
                nombre: undefined,
                cantidad: undefined,
                cantidadMin: undefined,
                cantidadMax: undefined,
                gravadoOExcepto: undefined
            };
        };
    });