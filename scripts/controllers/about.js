'use strict';

/**
 * @ngdoc function
 * @name oxynum2016App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the oxynum2016App
 */
'use strict';

angular.module('oxynum2016App')
  .controller('AboutCtrl', ['$scope', '$document', function ($scope, $document) {

  	$scope.pageClass = 'main-view';
  	$scope.welcome = true;
    $scope.team = true;

  	if (!sessionStorage.user) {
    	$scope.welcome = false;
    };
    sessionStorage.setItem("user", "on");

	$scope.scrollTo = function(id) {
		var memberID = document.getElementById(id);
		$document.scrollToElementAnimated(angular.element(memberID), 0, 1000, null);
	}
  }]);
