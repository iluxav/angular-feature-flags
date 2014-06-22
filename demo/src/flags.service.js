angular.module('feature-flags').service('flags', function ($http, override) {
	var serverFlagCache = {},
		flags = [],

		get = function () {
			return flags;
		},

		set = function (promise) {
			var method = promise.success || promise.then;

			return method.call(promise, function (response) {
				response.forEach(function (flag) {
					serverFlagCache[flag.key] = flag.active;
					flag.active = isOn(flag.key);
				});
				angular.copy(response, flags);
			});
		},

		enable = function (flag) {
			flag.active = true;
			override.set(flag.key, true);
		},

		disable = function (flag) {
			flag.active = false;
			override.set(flag.key, false);
		},

		reset = function (flag) {
			flag.active = serverFlagCache[flag.key];
			override.remove(flag.key);
		},

		isOverridden = function (key) {
			return override.isPresent(key);
		},
		ifIsOn = function (key) {
			var isON = isOn(key);
			var then = function (callBack) {
				if (isON)
					callBack();
			};
			return {
				then: then
			};
		},
		bangTest = function (val) {
			return (function(key){
				var bang = /(^!)/;
				var not = bang.test(key);
				key = key.replace(bang,'');
				var result = (override.getWithParents(key) == 'true');
				return not ? !result :result;
			})(val);
		},
		ifAreOn = function (keys) {
			var areON = areOn(keys);
			var then = function (callBack) {
				if (areON)
					callBack();
			};
			return {
				then: then
			};
		},
		areOn = function (keys) {
			if (typeof keys === 'object') {
				var res = true;
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					res = res && bangTest(key);
				}
				return res;
			}
			return false;
		},
		isOn = function (key) {
			return isOverridden(key) ? override.getWithParents(key) == 'true' : serverFlagCache[key];
		};


	return {
		set: set,
		get: get,
		enable: enable,
		disable: disable,
		reset: reset,
		isOn: isOn,
		isOverridden: isOverridden,
		ifIsOn: ifIsOn,
		ifAreOn: ifAreOn,
		areOn: areOn
	};
});