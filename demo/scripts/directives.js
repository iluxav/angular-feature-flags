angular.module("my-app")
	.controller("mainCtrl", function ($scope, flags) {
		$scope.output = function () {
			return 'userProfile.firstName: ' + flags.isOn("userProfile.firstName");
		};
		var doStuff = 'aaaa';
		var self=this;
		var dmmy=function(a) {
			console.log(a);
		};

		flags.ifIsOn('userProfile').then(function(){
			dmmy('userProfile');
			flags.ifIsOn('userProfile.lastName').then(function(){
				dmmy('lastName');
			});
		});
		flags.ifAreOn(['userProfile','!userProfile.lastName']).then(function(){
			dmmy('userProfile and userProfile.lastName');
		});



	})
	.directive("activityFeed", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">Activity Feed</div>',
			replace: true
		};
	})
	.directive("messaging", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">Messaging</div>',
			replace: true
		};
	})
	.directive("userProfile", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">User Profile</div>',
			replace: true
		};
	})
	.directive("lastName", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">(userProfile.lastName)Last Name</div>',
			replace: true
		};
	})
	.directive("firstName", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">(userProfile.firstName)First Name</div>',
			replace: true
		};
	})
	.directive("more", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">(userProfile.lastName.more)More</div>',
			replace: true
		};
	})
	.directive("settings", function () {
		return {
			restrict: "A",
			scope: {},
			template: '<div class="panel" ng-class="{selected: selected}" ng-click="selected = !selected;">Settings</div>',
			replace: true
		};
	})
	.run(function (flags, $http) {
		flags.set($http.get('/data/flags.json'));
	});