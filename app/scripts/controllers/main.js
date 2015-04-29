'use strict';

/**
 * @ngdoc function
 * @name miniZomatoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the miniZomatoApp
 */
angular.module('miniZomatoApp')
  .controller('MainCtrl', function ($rootScope, $scope, DataService, $log) {

      function filterRestaurants() {
        var compareString = "";

        var validCost = $scope.cost !== undefined,
            validEstablishment = $scope.establishment !== undefined,
            validCusine = $scope.cusine !== undefined,
            validFeature = $scope.feature !== undefined,
            validPaymentMode = $scope.payment !== undefined;
        if (validCost) {
            compareString += 'r.cost_for_two == $scope.cost';
        }

        if (validEstablishment) {
          if(compareString !== "") {
              compareString += " && ";    
          }
            compareString += 'r.Establishment_type == $scope.establishment';
        }

        if (validCusine) {
            if(compareString !== "") {
              compareString += " && ";    
          }
            compareString += '$.inArray($scope.cusine, r.cusines) !== -1';
        }

        if (validFeature) {
            if(compareString !== "") {
              compareString += " && ";    
          }
            compareString += '$.inArray($scope.feature, r.features) !== -1';
        }

        if (validPaymentMode) {
            if(compareString !== "") {
              compareString += " && ";    
          }
            compareString += '$scope.payment == r.payment_mode';
        }

        var filteredRestaurants = [];
        if (validFeature
              || validCusine
              || validEstablishment
              || validCost
              || validPaymentMode) {

            $.each($scope.restaurants, function(i, r){
              if (eval(compareString)){
                filteredRestaurants.push(r);
              }
            });
            $scope.filteredRestaurants = filteredRestaurants;
        } else {
           if ($rootScope.restaurants.length > 0) {
              $scope.filteredRestaurants = $rootScope.restaurants
         }
        }
        $('[data-toggle="tooltip"]').tooltip();

      }

  		$scope.$watch('cost', function(){ filterRestaurants();});
      $scope.$watch('establishment', function(){ filterRestaurants();});
      $scope.$watch('cusine', function(){ filterRestaurants();});
      $scope.$watch('feature', function(){ filterRestaurants();});
      $scope.$watch('payment', function(){ filterRestaurants();});  		

  		
  });
