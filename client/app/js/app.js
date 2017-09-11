var app = angular.module("twitStream", ['angularMoment']);

app.filter('sinceFilter', ['moment', function(moment){
	return function(date){
		console.log("date filter");
		console.log(date);
		return moment(date).fromNow();
	}
}])

app.controller('twitCtrl', ['$scope', function($scope){
	$scope.twitListe=[];
	$scope.load = true;
	
	socket.on("newTwit",function(socket){
			console.log(socket);
			$scope.twitListe.push(socket);
			$scope.load = false;
			$scope.$apply();
    });
}])