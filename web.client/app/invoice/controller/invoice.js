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
                    url: 'invoices'
                }).then(function (res) {
                    if (!res.success) {
                        alert('No se pudieron recuperar los datos.');
                    }
                    else {
                        vm.allInvoices = res.data;
                        vm.allProducts = requestService.allInventories;
                        console.log(vm.allInvoices);
                        console.log(requestService.allInventories);
                    }

                })
        };
        vm.get();

        vm.add = function add(pBill) {
            if (pBill == undefined || pBill.fecha == undefined || pBill.cliente == undefined) {
                alert('Debe selecionar un cliente y una fecha')
                return;
            }
            pBill['listaProductos'] = vm.detail;
            pBill['impuestos'] = vm.taxes;
            pBill['subtotal'] = vm.subTotal;
            pBill['montoTotal'] = vm.total;
            if (pBill.listaProductos.length == 0) {
                alert('No hay productos asociados a la factura')
                return
            }
            var data = {
                params: '',
                data: pBill
            };

            requestService.postRequest(data, {
                url: 'invoices'
            }).then(function (res) {
                console.log(res)
                if (!res.success) {
                    alert('No se pudieron insertar los datos');
                    // return;
                }
                vm.get();
            })
        }

        vm.delete = function deleteN(pIndex) {
            console.log(pIndex)
            vm.taxes = vm.taxes - vm.detail[pIndex].impuesto;
            vm.subTotal = vm.subTotal - (vm.detail[pIndex].precio * vm.detail[pIndex].cantidad);
            vm.total = vm.taxes + vm.subTotal;
            vm.detail.splice(pIndex, 1)
        };

        vm.deleteF = function deleteF(pIdInvoice) {
            console.log(pIdInvoice)
            if (!confirm('Seguro de realizar esta acción?')) {
                return;
            }
            var data = {
                params: pIdInvoice,
                data: ''
            };
            requestService.deleteRequest(data, {
                url: 'invoices/'
            }).then(function (res) {
                if (!res.success) {
                    alert(res.message);
                    return;
                }
                vm.get();
            })
        }


        vm.addDetail = function addDetail(pProduct) {
            for (var i = 0; i < vm.detail.length; i++) {
                if (vm.detail[i].idProducto == pProduct.id) {
                    alert('El producto ya fue insertado');
                    return;
                }
            }
            var flag = 0;
            for (var index = 0; index < vm.allProducts.length; index++) {
                if (pProduct.id == vm.allProducts[index].producto) {
                    flag = 1;
                    if (pProduct.cantidad > vm.allProducts[index].cantidadMin &&
                        pProduct.cantidad <= vm.allProducts[index].cantidad) {
                        vm.detail.push({
                            idProducto: vm.allProducts[index].producto,
                            nombre: vm.allProducts[index].nombre,
                            cantidad: pProduct.cantidad,
                            precio: vm.allProducts[index].precio,
                            impuesto: vm.allProducts[index].impuesto

                        });
                        vm.taxes = vm.taxes + vm.allProducts[index].impuesto;
                        vm.subTotal = vm.subTotal + (vm.allProducts[index].precio * pProduct.cantidad);
                        vm.total = vm.taxes + vm.subTotal;
                        flag = 0;
                        return;
                    }
                    else {
                        alert('La cantidad no corresponde');
                    }
                }

            };
            if (!flag) {
                alert('El producto especificado no existe o no tiene un inventario asignado');
            }
        };





    });