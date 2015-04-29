'use strict';

/**
 * @ngdoc overview
 * @name miniZomatoApp
 * @description
 * # miniZomatoApp
 *
 * Main module of the application.
 */
angular.module('miniZomatoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils'
  ])
  .run(function($rootScope, DataService){
  	$rootScope.loadedData = false;
  	$rootScope.restaurants = [];
  	$rootScope.filteredRestaurants = [];
  	var promise = DataService.getRestaurantInformation();
		promise.then(
			function(data) {
				$rootScope.restaurants = data.data;
				$rootScope.loadedData = true;
				$rootScope.filteredRestaurants = $rootScope.restaurants;

				var establishmentFilters = [],
		            costFilterOptions = [],
					cusines = [],
					features = [],
					knownFor = [],
					paymentMode = [],
					rating = [];

				$.each($rootScope.restaurants, function(i, object){
					//console.log("object", object);
					if (object.Establishment_type !== "undefined" && $.inArray(object.Establishment_type, establishmentFilters) == -1) {
						establishmentFilters.push(object.Establishment_type);
					}

					if ( (object.cost_for_two !=="undefined" && object.cost_for_two !== "") && $.inArray(object.cost_for_two, costFilterOptions) == -1) {
						costFilterOptions.push(object.cost_for_two);
					}

					if ( (object.payment_mode !== "undefined" && object.payment_mode !== "") && $.inArray(object.payment_mode, paymentMode) == -1) {
						paymentMode.push(object.payment_mode);
					}

					$.each(object.cusines, function(i, cusine){
						if ( (cusine !=="undefined" && cusine !== "") && $.inArray(cusine, cusines) == -1) {
							cusines.push(cusine);
						}
					});

					$.each(object.features, function(i, feature){
						if ( (feature !=="undefined" && feature !== "") && $.inArray(feature, features) == -1) {
							features.push(feature);
						}
					});
				});

				$rootScope.establishmentFilters = establishmentFilters;
				$rootScope.costFilterOptions = costFilterOptions;
				$rootScope.cusines = cusines;
				$rootScope.features = features;
				$rootScope.paymentMode = paymentMode;
		},
			function(error) {
				$log.error('failure loading restaurants', error);
		});
  });
