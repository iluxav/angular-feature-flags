angular.module('feature-flags').service('override', function ($rootElement) {
	var appName = $rootElement.attr('ng-app');
	var self=this;
	return {
		isPresent: function (key) {
			return localStorage.getItem(appName + '.' + key) !== null;
		},
		get: function (key) {
			return localStorage.getItem(appName + '.' + key);
		},
		set: function (key, value) {
			localStorage.setItem(appName + '.' + key, value);
		},
		remove: function (key) {
			localStorage.removeItem(appName + '.' + key);
		},

		getWithParents: function (key) {
			var keys = key.split(".");
			if (keys.length > 1) {
				var fullName = appName;
				for (k in keys) {
					fullName += '.' + keys[k]
					if (localStorage.getItem(fullName) === 'false')
						return false;
				}
			}
			return localStorage.getItem(appName + '.' + key);
		}
	};
});