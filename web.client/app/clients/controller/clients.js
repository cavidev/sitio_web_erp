var app = angular.module("sitioerp")
    .controller('ClientsCtrl', function ($scope, requestService) {
        var vm = this;
        vm.client = {
            name: '',
            idCard: ''
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
                vm.allClients = [{
                    name: 'Carlos',
                    idCard: '504080112'
                }, {
                    name: 'Esteban',
                    idCard: '206780934'
                }] //res.data;
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
                if (!res.success) {
                    alert('No se pudieron insertar los datos');
                    return;
                }
                vm.get();
                vm.client = {
                    name: '',
                    idCard: ''
                }
            })
        }

        /**
         *Elimina un cliente del sistema.
         *
         * @param {*} pClient información del cliente.
         */
        vm.delete = function deleteN(pIdCard) {
            if (!confirm('Seguro de realizar esta acción?')) {
                return;
            }
            var data = {
                params: pIdCard,
                data: ''
            };
            requestService.deleteRequest(data, {
                url: 'clients/'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron eliminar los datos');
                    return;
                }
                vm.get();
            })
        }

        vm.update = function update(pClient) {
            console.log(pClient);
            requestService.putRequest({
                params: '',
                data: ''
            }, {
                url: 'clients'
            }).then(function (res) {
                if (!res.success) {
                    alert('No se pudieron recuperar los datos.');
                    return;
                }
                vm.allClients = res.data;
            })
        };

        vm.select = function select(pClient) {
            vm.client = {
                name: pClient.name,
                idCard: pClient.idCard
            };
        }
    });