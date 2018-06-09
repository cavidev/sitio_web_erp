var app = angular.module("sitioerp")
    .controller('ClientsCtrl', function ($scope, requestService) {
        var vm = this;
        vm.client = {
            nombre: '',
            cedula: ''
        }
        /**
         * Recupera la información de los clientes.
         *
         */
        vm.get = function get() {
            requestService.getRequest({
                params: '',
                data: ''
            }, {
                    url: 'clients'
                }).then(function (res) {

                    /*if (!res.success) {
                        alert('No se pudieron recuperar los datos.');
                        return;
                    }*/
                    vm.allClients = res.data;
                })
        };
        vm.get();

        /**
         *Inserta un cliente al sistema.
         *
         * @param {*} pClient información del cliente.
         */
        vm.add = function add(pClient) {
            console.log(pClient);
            if (pClient === undefined) {
                alert('Datos inconsostentes');
                return;
            }
            var data = {
                params: '',
                data: pClient
            };

            requestService.postRequest(data, {
                url: 'clients'
            }).then(function (res) {
                console.log(res)
                if (!res.success) {
                    alert(res.message);
                    return;
                }
                vm.get();
                vm.client = {
                    nombre: '',
                    cedula: ''
                }
            })
        }

        /**
         *Elimina un cliente del sistema.
         *
         * @param {*} pClient información del cliente.
         */
        vm.delete = function deleteN(pcedula) {
            if (!confirm('Seguro de realizar esta acción?')) {
                return;
            }
            var data = {
                params: pcedula,
                data: ''
            };
            requestService.deleteRequest(data, {
                url: 'clients/'
            }).then(function (res) {
                if (!res.success) {
                    alert(res.message);
                    return;
                }
                vm.get();
            })
        }

        vm.update = function update(pClient) {
            console.log(pClient);
            requestService.putRequest({
                params: '',
                data: pClient
            }, {
                    url: 'clients'
                }).then(function (res) {
                    if (!res.success) {
                        alert(res.message);
                        return;
                    }
                    vm.get();
                })
        };

        vm.select = function select(pClient) {
            vm.client = {
                nombre: pClient.nombre,
                cedula: pClient.cedula
            };
        }
    });