var app = angular.module("sitioerp")
    .controller('InvoiceCtrl', function ($scope, requestService) {
        var vm = this;

        vm.taxes = 0;
        vm.subTotal = 0;
        vm.total = 0;
        vm.allProducts = [];
        vm.detail = [];

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

        vm.add = function add(pBill) {
            pBill['detail'] = vm.detail;
            pBill['taxes'] = vm.taxes;
            pBill['subTotal'] = vm.subTotal;
            pBill['total'] = vm.total;

            console.log(pBill);
            var data = {
                params: '',
                data: pBill
            };

            requestService.postRequest(data, {
                url: 'inventories'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron insertar los datos');
                    // return;
                }
                vm.get();
            })
        }

        vm.delete = function deleteN(pIndex) {
            var temp = [];
            for (let index = 0; index < vm.detail.length; index++) {
                if (pIndex !== vm.detail[index].number) {
                    temp.push(vm.detail[index]);
                }
            }
            vm.detail = temp;
        };

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

        vm.addDetail = function addDetail(pProduct) {
            vm.getProduct();
            for (var index = 0; index < vm.allProducts.length; index++) {
                if (pProduct.id === vm.allProducts[index].id) {
                    if (pProduct.quantity > vm.allProducts[index].quantityMin &&
                        pProduct.quantity <= vm.allProducts[index].quantity) {
                        vm.detail.push({
                            idProduct: vm.allProducts[index].id,
                            number: vm.detail.length + 1,
                            name: vm.allProducts[index].name,
                            quantity: pProduct.quantity,
                            price: vm.allProducts[index].price

                        });
                        vm.taxes = vm.taxes + vm.allProducts[index].tax;
                        vm.subTotal = vm.subTotal + (vm.allProducts[index].price * pProduct.quantity);
                        vm.total = vm.taxes + vm.subTotal;
                        return;
                    } else {
                        alert('La cantidad no corresponde');
                    }
                };
            };
        };

        vm.getProduct = function getProduct() {
            requestService.getRequest({
                params: '',
                data: ''
            }, {
                url: 'products'
            }).then(function (res) {
                // vm.allProducts = res;
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
        vm.getProduct();
    });