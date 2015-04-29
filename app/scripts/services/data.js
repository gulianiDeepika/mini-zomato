'use strict';

/**
 * @ngdoc service
 * @name miniZomatoApp.Data
 * @description
 * # Data
 * Service in the miniZomatoApp.
 */
angular.module('miniZomatoApp')
  .service('DataService', function ($http) {

  	return {
  		getRestaurantInformation : function() { return $http.get("../100zomato.json"); }
  	};
    
  });
