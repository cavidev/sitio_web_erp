'use strict';
angular.module('sitioerp')
	.factory('requestService', function ($http) {

		return {
			getRequest: function (data, configs) {
				return $http({
						method: 'GET',
						url: configs.url + data.params,
						data: data.data
					})
					.then(function (response) {
							return response.data;

						},
						function errorCallback(response) {
							return {
								success: false,
								data: null
							};
						});
			},

			postRequest: function (data, configs) {
				return $http({
						method: 'POST',
						url: configs.url + data.params,
						data: data.data
					})
					.then(function (response) {
							return response.data;
						},
						function errorCallback(response) {
							return {
								success: false,
								data: null
							};
						});
			},

			putRequest: function (data, configs) {
				return $http({
						method: 'PUT',
						url: configs.url + data.params,
						data: data.data
					})
					.then(function (response) {
							return response.data;
						},
						function errorCallback(response) {
							return {
								success: false,
								data: null
							};
						});
			},

			deleteRequest: function (data, configs) {
				return $http({
						method: 'DELETE',
						url: configs.url + data.params,
						data: data.data
					})
					.then(function (response) {
							return response.data;
						},
						function errorCallback(response) {
							return {
								success: false,
								data: null
							};
						});
			}

		};
	});