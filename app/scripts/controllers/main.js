'use strict';

/**
 * @ngdoc function
 * @name oxynum2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oxynum2016App
 */
angular.module('oxynum2016App')
  .controller('MainCtrl', ['$scope', '$document', function ($scope, $document) {

  	$scope.pageClass = 'main-view';

	$scope.scrollTo = function(id) {
		$document.scrollToElementAnimated(angular.element(document.getElementById(id)), 0, 1000, null);
	}
  }]);
