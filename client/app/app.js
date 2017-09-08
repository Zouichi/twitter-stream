var app = angular.module("twitStream", []);

app.controller('twitCtrl', ['$scope', function($scope){
	$scope.test="fsdfsd";

	socket.on("newTwit", function(socket){
		console.log(socket);
	});
}])

