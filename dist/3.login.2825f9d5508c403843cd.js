webpackJsonp([3],{

/***/ 700:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(701);

/***/ },

/***/ 701:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	var bind = __webpack_require__(703);
	var Axios = __webpack_require__(704);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance();
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return createInstance(defaultConfig);
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(722);
	axios.CancelToken = __webpack_require__(723);
	axios.isCancel = __webpack_require__(719);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(724);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },

/***/ 702:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(703);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },

/***/ 703:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },

/***/ 704:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(705);
	var utils = __webpack_require__(702);
	var InterceptorManager = __webpack_require__(716);
	var dispatchRequest = __webpack_require__(717);
	var isAbsoluteURL = __webpack_require__(720);
	var combineURLs = __webpack_require__(721);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 */
	function Axios(defaultConfig) {
	  this.defaults = utils.merge(defaults, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ },

/***/ 705:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(702);
	var normalizeHeaderName = __webpack_require__(706);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(707);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(707);
	  }
	  return adapter;
	}
	
	module.exports = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },

/***/ 706:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },

/***/ 707:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	var settle = __webpack_require__(708);
	var buildURL = __webpack_require__(711);
	var parseHeaders = __webpack_require__(712);
	var isURLSameOrigin = __webpack_require__(713);
	var createError = __webpack_require__(709);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(714);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("development") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(715);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ },

/***/ 708:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(709);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },

/***/ 709:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(710);
	
	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },

/***/ 710:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },

/***/ 711:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ },

/***/ 712:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },

/***/ 713:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },

/***/ 714:
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },

/***/ 715:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },

/***/ 716:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },

/***/ 717:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	var transformData = __webpack_require__(718);
	var isCancel = __webpack_require__(719);
	var defaults = __webpack_require__(705);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ },

/***/ 718:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(702);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },

/***/ 719:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },

/***/ 720:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },

/***/ 721:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },

/***/ 722:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ },

/***/ 723:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(722);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ },

/***/ 724:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },

/***/ 729:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Divider = __webpack_require__(730);
	
	var _Divider2 = _interopRequireDefault(_Divider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Divider2.default;

/***/ },

/***/ 730:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Divider = function Divider(props, context) {
	  var inset = props.inset;
	  var style = props.style;
	  var other = (0, _objectWithoutProperties3.default)(props, ['inset', 'style']);
	  var _context$muiTheme = context.muiTheme;
	  var baseTheme = _context$muiTheme.baseTheme;
	  var prepareStyles = _context$muiTheme.prepareStyles;
	
	
	  var styles = {
	    root: {
	      margin: 0,
	      marginTop: -1,
	      marginLeft: inset ? 72 : 0,
	      height: 1,
	      border: 'none',
	      backgroundColor: baseTheme.palette.borderColor
	    }
	  };
	
	  return _react2.default.createElement('hr', (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }));
	};
	
	Divider.muiName = 'Divider';
	
	 true ? Divider.propTypes = {
	  /**
	   * If true, the `Divider` will be indented.
	   */
	  inset: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	
	Divider.defaultProps = {
	  inset: false
	};
	
	Divider.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	
	exports.default = Divider;

/***/ },

/***/ 731:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Avatar = __webpack_require__(732);
	
	var _Avatar2 = _interopRequireDefault(_Avatar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Avatar2.default;

/***/ },

/***/ 732:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var backgroundColor = props.backgroundColor;
	  var color = props.color;
	  var size = props.size;
	  var avatar = context.muiTheme.avatar;
	
	
	  var styles = {
	    root: {
	      color: color || avatar.color,
	      backgroundColor: backgroundColor || avatar.backgroundColor,
	      userSelect: 'none',
	      display: 'inline-flex',
	      alignItems: 'center',
	      justifyContent: 'center',
	      fontSize: size / 2,
	      borderRadius: '50%',
	      height: size,
	      width: size
	    },
	    icon: {
	      color: color || avatar.color,
	      width: size * 0.6,
	      height: size * 0.6,
	      fontSize: size * 0.6,
	      margin: size * 0.2
	    }
	  };
	
	  return styles;
	}
	
	var Avatar = function (_Component) {
	  (0, _inherits3.default)(Avatar, _Component);
	
	  function Avatar() {
	    (0, _classCallCheck3.default)(this, Avatar);
	    return (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Avatar, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var backgroundColor = _props.backgroundColor;
	      var icon = _props.icon;
	      var src = _props.src;
	      var style = _props.style;
	      var className = _props.className;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['backgroundColor', 'icon', 'src', 'style', 'className']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	
	      if (src) {
	        return _react2.default.createElement('img', (0, _extends3.default)({
	          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
	        }, other, {
	          src: src,
	          className: className
	        }));
	      } else {
	        return _react2.default.createElement(
	          'div',
	          (0, _extends3.default)({}, other, {
	            style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)),
	            className: className
	          }),
	          icon && _react2.default.cloneElement(icon, {
	            color: styles.icon.color,
	            style: (0, _simpleAssign2.default)(styles.icon, icon.props.style)
	          }),
	          this.props.children
	        );
	      }
	    }
	  }]);
	  return Avatar;
	}(_react.Component);
	
	Avatar.muiName = 'Avatar';
	Avatar.defaultProps = {
	  size: 40
	};
	Avatar.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? Avatar.propTypes = {
	  /**
	   * The backgroundColor of the avatar. Does not apply to image avatars.
	   */
	  backgroundColor: _react.PropTypes.string,
	  /**
	   * Can be used, for instance, to render a letter inside the avatar.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root `div` or `img` element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * The icon or letter's color.
	   */
	  color: _react.PropTypes.string,
	  /**
	   * This is the SvgIcon or FontIcon to be used inside the avatar.
	   */
	  icon: _react.PropTypes.element,
	  /**
	   * This is the size of the avatar in pixels.
	   */
	  size: _react.PropTypes.number,
	  /**
	   * If passed in, this component will render an img element. Otherwise, a div will be rendered.
	   */
	  src: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = Avatar;

/***/ },

/***/ 741:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _TextField = __webpack_require__(742);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _TextField2.default;

/***/ },

/***/ 742:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(57);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _shallowEqual = __webpack_require__(573);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _colorManipulator = __webpack_require__(632);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _EnhancedTextarea = __webpack_require__(743);
	
	var _EnhancedTextarea2 = _interopRequireDefault(_EnhancedTextarea);
	
	var _TextFieldHint = __webpack_require__(744);
	
	var _TextFieldHint2 = _interopRequireDefault(_TextFieldHint);
	
	var _TextFieldLabel = __webpack_require__(745);
	
	var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);
	
	var _TextFieldUnderline = __webpack_require__(746);
	
	var _TextFieldUnderline2 = _interopRequireDefault(_TextFieldUnderline);
	
	var _warning = __webpack_require__(217);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getStyles = function getStyles(props, context, state) {
	  var _context$muiTheme = context.muiTheme;
	  var baseTheme = _context$muiTheme.baseTheme;
	  var _context$muiTheme$tex = _context$muiTheme.textField;
	  var floatingLabelColor = _context$muiTheme$tex.floatingLabelColor;
	  var focusColor = _context$muiTheme$tex.focusColor;
	  var textColor = _context$muiTheme$tex.textColor;
	  var disabledTextColor = _context$muiTheme$tex.disabledTextColor;
	  var backgroundColor = _context$muiTheme$tex.backgroundColor;
	  var hintColor = _context$muiTheme$tex.hintColor;
	  var errorColor = _context$muiTheme$tex.errorColor;
	
	
	  var styles = {
	    root: {
	      fontSize: 16,
	      lineHeight: '24px',
	      width: props.fullWidth ? '100%' : 256,
	      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
	      display: 'inline-block',
	      position: 'relative',
	      backgroundColor: backgroundColor,
	      fontFamily: baseTheme.fontFamily,
	      transition: _transitions2.default.easeOut('200ms', 'height')
	    },
	    error: {
	      position: 'relative',
	      bottom: 2,
	      fontSize: 12,
	      lineHeight: '12px',
	      color: errorColor,
	      transition: _transitions2.default.easeOut()
	    },
	    floatingLabel: {
	      color: hintColor,
	      pointerEvents: 'none'
	    },
	    input: {
	      padding: 0,
	      position: 'relative',
	      width: '100%',
	      border: 'none',
	      outline: 'none',
	      backgroundColor: 'rgba(0,0,0,0)',
	      color: props.disabled ? disabledTextColor : textColor,
	      cursor: props.disabled ? 'not-allowed' : 'initial',
	      font: 'inherit',
	      appearance: 'textfield', // Improve type search style.
	      WebkitTapHighlightColor: 'rgba(0,0,0,0)' }
	  };
	
	  (0, _simpleAssign2.default)(styles.error, props.errorStyle);
	
	  styles.textarea = (0, _simpleAssign2.default)({}, styles.input, {
	    marginTop: props.floatingLabelText ? 36 : 12,
	    marginBottom: props.floatingLabelText ? -36 : -12,
	    boxSizing: 'border-box',
	    font: 'inherit'
	  });
	
	  // Do not assign a height to the textarea as he handles it on his own.
	  styles.input.height = '100%';
	
	  if (state.hasValue) {
	    styles.floatingLabel.color = (0, _colorManipulator.fade)(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
	  }
	
	  if (state.isFocused) {
	    styles.floatingLabel.color = focusColor;
	  }
	
	  if (props.floatingLabelText) {
	    styles.input.boxSizing = 'border-box';
	
	    if (!props.multiLine) {
	      styles.input.marginTop = 14;
	    }
	
	    if (state.errorText) {
	      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
	    }
	  }
	
	  if (state.errorText) {
	    if (state.isFocused) {
	      styles.floatingLabel.color = styles.error.color;
	    }
	  }
	
	  return styles;
	};
	
	/**
	 * Check if a value is valid to be displayed inside an input.
	 *
	 * @param The value to check.
	 * @returns True if the string provided is valid, false otherwise.
	 */
	function isValid(value) {
	  return value !== '' && value !== undefined && value !== null;
	}
	
	var TextField = function (_Component) {
	  (0, _inherits3.default)(TextField, _Component);
	
	  function TextField() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, TextField);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TextField.__proto__ || (0, _getPrototypeOf2.default)(TextField)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      isFocused: false,
	      errorText: undefined,
	      hasValue: false,
	      isClean: true
	    }, _this.handleInputBlur = function (event) {
	      _this.setState({ isFocused: false });
	      if (_this.props.onBlur) _this.props.onBlur(event);
	    }, _this.handleInputChange = function (event) {
	      _this.setState({ hasValue: isValid(event.target.value), isClean: false });
	      if (_this.props.onChange) _this.props.onChange(event, event.target.value);
	    }, _this.handleInputFocus = function (event) {
	      if (_this.props.disabled) {
	        return;
	      }
	      _this.setState({ isFocused: true });
	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }
	    }, _this.handleHeightChange = function (event, height) {
	      var newHeight = height + 24;
	      if (_this.props.floatingLabelText) {
	        newHeight += 24;
	      }
	      _reactDom2.default.findDOMNode(_this).style.height = newHeight + 'px';
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(TextField, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props;
	      var children = _props.children;
	      var name = _props.name;
	      var hintText = _props.hintText;
	      var floatingLabelText = _props.floatingLabelText;
	      var id = _props.id;
	
	
	      var propsLeaf = children ? children.props : this.props;
	
	      this.setState({
	        errorText: this.props.errorText,
	        hasValue: isValid(propsLeaf.value) || isValid(propsLeaf.defaultValue)
	      });
	
	       true ? (0, _warning2.default)(name || hintText || floatingLabelText || id, 'We don\'t have enough information\n      to build a robust unique id for the TextField component. Please provide an id or a name.') : void 0;
	
	      var uniqueId = name + '-' + hintText + '-' + floatingLabelText + '-' + Math.floor(Math.random() * 0xFFFF);
	      this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.errorText !== this.props.errorText) {
	        this.setState({
	          errorText: nextProps.errorText
	        });
	      }
	
	      if (nextProps.children && nextProps.children.props) {
	        nextProps = nextProps.children.props;
	      }
	
	      if (nextProps.hasOwnProperty('value')) {
	        var hasValue = isValid(nextProps.value) || this.state.isClean && isValid(nextProps.defaultValue);
	
	        this.setState({
	          hasValue: hasValue
	        });
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
	    }
	  }, {
	    key: 'blur',
	    value: function blur() {
	      if (this.input) this.getInputNode().blur();
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      if (this.input) this.getInputNode().focus();
	    }
	  }, {
	    key: 'select',
	    value: function select() {
	      if (this.input) this.getInputNode().select();
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.input ? this.getInputNode().value : undefined;
	    }
	  }, {
	    key: 'getInputNode',
	    value: function getInputNode() {
	      return this.props.children || this.props.multiLine ? this.input.getInputNode() : _reactDom2.default.findDOMNode(this.input);
	    }
	  }, {
	    key: '_isControlled',
	    value: function _isControlled() {
	      return this.props.hasOwnProperty('value');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props2 = this.props;
	      var children = _props2.children;
	      var className = _props2.className;
	      var disabled = _props2.disabled;
	      var errorStyle = _props2.errorStyle;
	      var errorText = _props2.errorText;
	      var floatingLabelFixed = _props2.floatingLabelFixed;
	      var floatingLabelFocusStyle = _props2.floatingLabelFocusStyle;
	      var floatingLabelStyle = _props2.floatingLabelStyle;
	      var floatingLabelText = _props2.floatingLabelText;
	      var fullWidth = _props2.fullWidth;
	      var hintText = _props2.hintText;
	      var hintStyle = _props2.hintStyle;
	      var id = _props2.id;
	      var inputStyle = _props2.inputStyle;
	      var multiLine = _props2.multiLine;
	      var onBlur = _props2.onBlur;
	      var onChange = _props2.onChange;
	      var onFocus = _props2.onFocus;
	      var style = _props2.style;
	      var type = _props2.type;
	      var underlineDisabledStyle = _props2.underlineDisabledStyle;
	      var underlineFocusStyle = _props2.underlineFocusStyle;
	      var underlineShow = _props2.underlineShow;
	      var underlineStyle = _props2.underlineStyle;
	      var rows = _props2.rows;
	      var rowsMax = _props2.rowsMax;
	      var textareaStyle = _props2.textareaStyle;
	      var other = (0, _objectWithoutProperties3.default)(_props2, ['children', 'className', 'disabled', 'errorStyle', 'errorText', 'floatingLabelFixed', 'floatingLabelFocusStyle', 'floatingLabelStyle', 'floatingLabelText', 'fullWidth', 'hintText', 'hintStyle', 'id', 'inputStyle', 'multiLine', 'onBlur', 'onChange', 'onFocus', 'style', 'type', 'underlineDisabledStyle', 'underlineFocusStyle', 'underlineShow', 'underlineStyle', 'rows', 'rowsMax', 'textareaStyle']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context, this.state);
	      var inputId = id || this.uniqueId;
	
	      var errorTextElement = this.state.errorText && _react2.default.createElement(
	        'div',
	        { style: prepareStyles(styles.error) },
	        this.state.errorText
	      );
	
	      var floatingLabelTextElement = floatingLabelText && _react2.default.createElement(
	        _TextFieldLabel2.default,
	        {
	          muiTheme: this.context.muiTheme,
	          style: (0, _simpleAssign2.default)(styles.floatingLabel, this.props.floatingLabelStyle),
	          shrinkStyle: this.props.floatingLabelFocusStyle,
	          htmlFor: inputId,
	          shrink: this.state.hasValue || this.state.isFocused || floatingLabelFixed,
	          disabled: disabled
	        },
	        floatingLabelText
	      );
	
	      var inputProps = {
	        id: inputId,
	        ref: function ref(elem) {
	          return _this2.input = elem;
	        },
	        disabled: this.props.disabled,
	        onBlur: this.handleInputBlur,
	        onChange: this.handleInputChange,
	        onFocus: this.handleInputFocus
	      };
	
	      var inputStyleMerged = (0, _simpleAssign2.default)(styles.input, inputStyle);
	
	      var inputElement = void 0;
	      if (children) {
	        inputElement = _react2.default.cloneElement(children, (0, _extends3.default)({}, inputProps, children.props, {
	          style: (0, _simpleAssign2.default)(inputStyleMerged, children.props.style)
	        }));
	      } else {
	        inputElement = multiLine ? _react2.default.createElement(_EnhancedTextarea2.default, (0, _extends3.default)({}, other, inputProps, {
	          style: inputStyleMerged,
	          rows: rows,
	          rowsMax: rowsMax,
	          onHeightChange: this.handleHeightChange,
	          textareaStyle: (0, _simpleAssign2.default)(styles.textarea, textareaStyle)
	        })) : _react2.default.createElement('input', (0, _extends3.default)({}, other, inputProps, {
	          style: prepareStyles(inputStyleMerged),
	          type: type
	        }));
	      }
	
	      var rootProps = {};
	
	      if (children) {
	        rootProps = other;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, rootProps, {
	          className: className,
	          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
	        }),
	        floatingLabelTextElement,
	        hintText ? _react2.default.createElement(_TextFieldHint2.default, {
	          muiTheme: this.context.muiTheme,
	          show: !(this.state.hasValue || floatingLabelText && !this.state.isFocused) || !this.state.hasValue && floatingLabelText && floatingLabelFixed && !this.state.isFocused,
	          style: hintStyle,
	          text: hintText
	        }) : null,
	        inputElement,
	        underlineShow ? _react2.default.createElement(_TextFieldUnderline2.default, {
	          disabled: disabled,
	          disabledStyle: underlineDisabledStyle,
	          error: !!this.state.errorText,
	          errorStyle: errorStyle,
	          focus: this.state.isFocused,
	          focusStyle: underlineFocusStyle,
	          muiTheme: this.context.muiTheme,
	          style: underlineStyle
	        }) : null,
	        errorTextElement
	      );
	    }
	  }]);
	  return TextField;
	}(_react.Component);
	
	TextField.defaultProps = {
	  disabled: false,
	  floatingLabelFixed: false,
	  multiLine: false,
	  fullWidth: false,
	  type: 'text',
	  underlineShow: true,
	  rows: 1
	};
	TextField.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? TextField.propTypes = {
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * The text string to use for the default value.
	   */
	  defaultValue: _react.PropTypes.any,
	  /**
	   * Disables the text field if set to true.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * The style object to use to override error styles.
	   */
	  errorStyle: _react.PropTypes.object,
	  /**
	   * The error content to display.
	   */
	  errorText: _react.PropTypes.node,
	  /**
	   * If true, the floating label will float even when there is no value.
	   */
	  floatingLabelFixed: _react.PropTypes.bool,
	  /**
	   * The style object to use to override floating label styles when focused.
	   */
	  floatingLabelFocusStyle: _react.PropTypes.object,
	  /**
	   * The style object to use to override floating label styles.
	   */
	  floatingLabelStyle: _react.PropTypes.object,
	  /**
	   * The content to use for the floating label element.
	   */
	  floatingLabelText: _react.PropTypes.node,
	  /**
	   * If true, the field receives the property width 100%.
	   */
	  fullWidth: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the TextField's hint text element.
	   */
	  hintStyle: _react.PropTypes.object,
	  /**
	   * The hint content to display.
	   */
	  hintText: _react.PropTypes.node,
	  /**
	   * The id prop for the text field.
	   */
	  id: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the TextField's input element.
	   * When multiLine is false: define the style of the input element.
	   * When multiLine is true: define the style of the container of the textarea.
	   */
	  inputStyle: _react.PropTypes.object,
	  /**
	   * If true, a textarea element will be rendered.
	   * The textarea also grows and shrinks according to the number of lines.
	   */
	  multiLine: _react.PropTypes.bool,
	  /**
	   * Name applied to the input.
	   */
	  name: _react.PropTypes.string,
	  /** @ignore */
	  onBlur: _react.PropTypes.func,
	  /**
	   * Callback function that is fired when the textfield's value changes.
	   */
	  onChange: _react.PropTypes.func,
	  /** @ignore */
	  onFocus: _react.PropTypes.func,
	  /**
	   * Number of rows to display when multiLine option is set to true.
	   */
	  rows: _react.PropTypes.number,
	  /**
	   * Maximum number of rows to display when
	   * multiLine option is set to true.
	   */
	  rowsMax: _react.PropTypes.number,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the TextField's textarea element.
	   * The TextField use either a textarea or an input,
	   * this property has effects only when multiLine is true.
	   */
	  textareaStyle: _react.PropTypes.object,
	  /**
	   * Specifies the type of input to display
	   * such as "password" or "text".
	   */
	  type: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the
	   * TextField's underline element when disabled.
	   */
	  underlineDisabledStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the TextField's
	   * underline element when focussed.
	   */
	  underlineFocusStyle: _react.PropTypes.object,
	  /**
	   * If true, shows the underline for the text field.
	   */
	  underlineShow: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the TextField's underline element.
	   */
	  underlineStyle: _react.PropTypes.object,
	  /**
	   * The value of the text field.
	   */
	  value: _react.PropTypes.any
	} : void 0;
	exports.default = TextField;

/***/ },

/***/ 743:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactEventListener = __webpack_require__(621);
	
	var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rowsHeight = 24;
	
	function getStyles(props, context, state) {
	  return {
	    root: {
	      position: 'relative' },
	    textarea: {
	      height: state.height,
	      width: '100%',
	      resize: 'none',
	      font: 'inherit',
	      padding: 0,
	      cursor: props.disabled ? 'not-allowed' : 'initial'
	    },
	    shadow: {
	      resize: 'none',
	      // Overflow also needed to here to remove the extra row
	      // added to textareas in Firefox.
	      overflow: 'hidden',
	      // Visibility needed to hide the extra text area on ipads
	      visibility: 'hidden',
	      position: 'absolute',
	      height: 'initial'
	    }
	  };
	}
	
	var EnhancedTextarea = function (_Component) {
	  (0, _inherits3.default)(EnhancedTextarea, _Component);
	
	  function EnhancedTextarea() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, EnhancedTextarea);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedTextarea.__proto__ || (0, _getPrototypeOf2.default)(EnhancedTextarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      height: null
	    }, _this.handleResize = function (event) {
	      _this.syncHeightWithShadow(undefined, event);
	    }, _this.handleChange = function (event) {
	      _this.syncHeightWithShadow(event.target.value);
	
	      if (_this.props.hasOwnProperty('valueLink')) {
	        _this.props.valueLink.requestChange(event.target.value);
	      }
	
	      if (_this.props.onChange) {
	        _this.props.onChange(event);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(EnhancedTextarea, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        height: this.props.rows * rowsHeight
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.syncHeightWithShadow();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== this.props.value) {
	        this.syncHeightWithShadow(nextProps.value);
	      }
	    }
	  }, {
	    key: 'getInputNode',
	    value: function getInputNode() {
	      return this.refs.input;
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      this.getInputNode().value = value;
	      this.syncHeightWithShadow(value);
	    }
	  }, {
	    key: 'syncHeightWithShadow',
	    value: function syncHeightWithShadow(newValue, event) {
	      var shadow = this.refs.shadow;
	
	      if (newValue !== undefined) {
	        shadow.value = newValue;
	      }
	
	      var newHeight = shadow.scrollHeight;
	
	      // Guarding for jsdom, where scrollHeight isn't present.
	      // See https://github.com/tmpvar/jsdom/issues/1013
	      if (newHeight === undefined) return;
	
	      if (this.props.rowsMax >= this.props.rows) {
	        newHeight = Math.min(this.props.rowsMax * rowsHeight, newHeight);
	      }
	
	      newHeight = Math.max(newHeight, rowsHeight);
	
	      if (this.state.height !== newHeight) {
	        this.setState({
	          height: newHeight
	        });
	
	        if (this.props.onHeightChange) {
	          this.props.onHeightChange(event, newHeight);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var onChange = _props.onChange;
	      var onHeightChange = _props.onHeightChange;
	      var rows = _props.rows;
	      var rowsMax = _props.rowsMax;
	      var shadowStyle = _props.shadowStyle;
	      var style = _props.style;
	      var textareaStyle = _props.textareaStyle;
	      var valueLink = _props.valueLink;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'onHeightChange', 'rows', 'rowsMax', 'shadowStyle', 'style', 'textareaStyle', 'valueLink']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context, this.state);
	      var rootStyles = (0, _simpleAssign2.default)(styles.root, style, {
	        appearance: 'none' });
	      var textareaStyles = (0, _simpleAssign2.default)(styles.textarea, textareaStyle);
	      var shadowStyles = (0, _simpleAssign2.default)({}, textareaStyles, styles.shadow, shadowStyle);
	
	      if (this.props.hasOwnProperty('valueLink')) {
	        other.value = this.props.valueLink.value;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { style: prepareStyles(rootStyles) },
	        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
	        _react2.default.createElement('textarea', {
	          ref: 'shadow',
	          style: prepareStyles(shadowStyles),
	          tabIndex: '-1',
	          rows: this.props.rows,
	          defaultValue: this.props.defaultValue,
	          readOnly: true,
	          value: this.props.value,
	          valueLink: this.props.valueLink
	        }),
	        _react2.default.createElement('textarea', (0, _extends3.default)({}, other, {
	          ref: 'input',
	          rows: this.props.rows,
	          style: prepareStyles(textareaStyles),
	          onChange: this.handleChange
	        }))
	      );
	    }
	  }]);
	  return EnhancedTextarea;
	}(_react.Component);
	
	EnhancedTextarea.defaultProps = {
	  rows: 1
	};
	EnhancedTextarea.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? EnhancedTextarea.propTypes = {
	  defaultValue: _react.PropTypes.any,
	  disabled: _react.PropTypes.bool,
	  onChange: _react.PropTypes.func,
	  onHeightChange: _react.PropTypes.func,
	  rows: _react.PropTypes.number,
	  rowsMax: _react.PropTypes.number,
	  shadowStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  textareaStyle: _react.PropTypes.object,
	  value: _react.PropTypes.string,
	  valueLink: _react.PropTypes.object
	} : void 0;
	exports.default = EnhancedTextarea;

/***/ },

/***/ 744:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props) {
	  var hintColor = props.muiTheme.textField.hintColor;
	  var show = props.show;
	
	
	  return {
	    root: {
	      position: 'absolute',
	      opacity: show ? 1 : 0,
	      color: hintColor,
	      transition: _transitions2.default.easeOut(),
	      bottom: 12
	    }
	  };
	}
	
	var TextFieldHint = function TextFieldHint(props) {
	  var prepareStyles = props.muiTheme.prepareStyles;
	  var style = props.style;
	  var text = props.text;
	
	
	  var styles = getStyles(props);
	
	  return _react2.default.createElement(
	    'div',
	    { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
	    text
	  );
	};
	
	 true ? TextFieldHint.propTypes = {
	  /**
	   * @ignore
	   * The material-ui theme applied to this component.
	   */
	  muiTheme: _react.PropTypes.object.isRequired,
	  /**
	   * True if the hint text should be visible.
	   */
	  show: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The hint text displayed.
	   */
	  text: _react.PropTypes.node
	} : void 0;
	
	TextFieldHint.defaultProps = {
	  show: true
	};
	
	exports.default = TextFieldHint;

/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props) {
	  var defaultStyles = {
	    position: 'absolute',
	    lineHeight: '22px',
	    top: 38,
	    transition: _transitions2.default.easeOut(),
	    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
	    cursor: props.disabled ? 'not-allowed' : 'text',
	    transform: 'scale(1) translate(0, 0)',
	    transformOrigin: 'left top',
	    pointerEvents: 'auto',
	    userSelect: 'none'
	  };
	
	  var shrinkStyles = props.shrink ? (0, _simpleAssign2.default)({
	    transform: 'scale(0.75) translate(0, -28px)',
	    pointerEvents: 'none'
	  }, props.shrinkStyle) : null;
	
	  return {
	    root: (0, _simpleAssign2.default)(defaultStyles, props.style, shrinkStyles)
	  };
	}
	
	var TextFieldLabel = function TextFieldLabel(props) {
	  var muiTheme = props.muiTheme;
	  var className = props.className;
	  var children = props.children;
	  var htmlFor = props.htmlFor;
	  var onTouchTap = props.onTouchTap;
	  var prepareStyles = muiTheme.prepareStyles;
	
	  var styles = getStyles(props);
	
	  return _react2.default.createElement(
	    'label',
	    {
	      className: className,
	      style: prepareStyles(styles.root),
	      htmlFor: htmlFor,
	      onTouchTap: onTouchTap
	    },
	    children
	  );
	};
	
	 true ? TextFieldLabel.propTypes = {
	  /**
	   * The label contents.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * Disables the label if set to true.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * The id of the target element that this label should refer to.
	   */
	  htmlFor: _react.PropTypes.string,
	  /**
	   * @ignore
	   * The material-ui theme applied to this component.
	   */
	  muiTheme: _react.PropTypes.object.isRequired,
	  /**
	   * Callback function for when the label is selected via a touch tap.
	   */
	  onTouchTap: _react.PropTypes.func,
	  /**
	   * True if the floating label should shrink.
	   */
	  shrink: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element when focused.
	   */
	  shrinkStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	
	TextFieldLabel.defaultProps = {
	  disabled: false,
	  shrink: false
	};
	
	exports.default = TextFieldLabel;

/***/ },

/***/ 746:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  /**
	   * True if the parent `TextField` is disabled.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the underline when parent `TextField` is disabled.
	   */
	  disabledStyle: _react.PropTypes.object,
	  /**
	   * True if the parent `TextField` has an error.
	   */
	  error: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the underline when parent `TextField` has an error.
	   */
	  errorStyle: _react.PropTypes.object,
	  /**
	   * True if the parent `TextField` is focused.
	   */
	  focus: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the underline when parent `TextField` is focused.
	   */
	  focusStyle: _react.PropTypes.object,
	  /**
	   * @ignore
	   * The material-ui theme applied to this component.
	   */
	  muiTheme: _react.PropTypes.object.isRequired,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	};
	
	var defaultProps = {
	  disabled: false,
	  disabledStyle: {},
	  error: false,
	  errorStyle: {},
	  focus: false,
	  focusStyle: {},
	  style: {}
	};
	
	var TextFieldUnderline = function TextFieldUnderline(props) {
	  var disabled = props.disabled;
	  var disabledStyle = props.disabledStyle;
	  var error = props.error;
	  var errorStyle = props.errorStyle;
	  var focus = props.focus;
	  var focusStyle = props.focusStyle;
	  var muiTheme = props.muiTheme;
	  var style = props.style;
	  var errorStyleColor = errorStyle.color;
	  var prepareStyles = muiTheme.prepareStyles;
	  var _muiTheme$textField = muiTheme.textField;
	  var borderColor = _muiTheme$textField.borderColor;
	  var disabledTextColor = _muiTheme$textField.disabledTextColor;
	  var errorColor = _muiTheme$textField.errorColor;
	  var focusColor = _muiTheme$textField.focusColor;
	
	
	  var styles = {
	    root: {
	      border: 'none',
	      borderBottom: 'solid 1px',
	      borderColor: borderColor,
	      bottom: 8,
	      boxSizing: 'content-box',
	      margin: 0,
	      position: 'absolute',
	      width: '100%'
	    },
	    disabled: {
	      borderBottom: 'dotted 2px',
	      borderColor: disabledTextColor,
	      cursor: 'not-allowed'
	    },
	    focus: {
	      borderBottom: 'solid 2px',
	      borderColor: focusColor,
	      transform: 'scaleX(0)',
	      transition: _transitions2.default.easeOut()
	    },
	    error: {
	      borderColor: errorStyleColor ? errorStyleColor : errorColor,
	      transform: 'scaleX(1)'
	    }
	  };
	
	  var underline = (0, _simpleAssign2.default)({}, styles.root, style);
	  var focusedUnderline = (0, _simpleAssign2.default)({}, underline, styles.focus, focusStyle);
	
	  if (disabled) underline = (0, _simpleAssign2.default)({}, underline, styles.disabled, disabledStyle);
	  if (focus) focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, { transform: 'scaleX(1)' });
	  if (error) focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, styles.error);
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement('hr', { style: prepareStyles(underline) }),
	    _react2.default.createElement('hr', { style: prepareStyles(focusedUnderline) })
	  );
	};
	
	 true ? TextFieldUnderline.propTypes = propTypes : void 0;
	TextFieldUnderline.defaultProps = defaultProps;
	
	exports.default = TextFieldUnderline;

/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _SelectField = __webpack_require__(748);
	
	var _SelectField2 = _interopRequireDefault(_SelectField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _SelectField2.default;

/***/ },

/***/ 748:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TextField = __webpack_require__(741);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _DropDownMenu = __webpack_require__(749);
	
	var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props) {
	  return {
	    label: {
	      paddingLeft: 0,
	      top: props.floatingLabelText ? 6 : -4
	    },
	    icon: {
	      right: 0,
	      top: props.floatingLabelText ? 22 : 14
	    },
	    hideDropDownUnderline: {
	      borderTop: 'none'
	    },
	    dropDownMenu: {
	      display: 'block'
	    }
	  };
	}
	
	var SelectField = function (_Component) {
	  (0, _inherits3.default)(SelectField, _Component);
	
	  function SelectField() {
	    (0, _classCallCheck3.default)(this, SelectField);
	    return (0, _possibleConstructorReturn3.default)(this, (SelectField.__proto__ || (0, _getPrototypeOf2.default)(SelectField)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(SelectField, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var autoWidth = _props.autoWidth;
	      var children = _props.children;
	      var style = _props.style;
	      var labelStyle = _props.labelStyle;
	      var iconStyle = _props.iconStyle;
	      var id = _props.id;
	      var underlineDisabledStyle = _props.underlineDisabledStyle;
	      var underlineFocusStyle = _props.underlineFocusStyle;
	      var underlineStyle = _props.underlineStyle;
	      var errorStyle = _props.errorStyle;
	      var disabled = _props.disabled;
	      var floatingLabelFixed = _props.floatingLabelFixed;
	      var floatingLabelText = _props.floatingLabelText;
	      var floatingLabelStyle = _props.floatingLabelStyle;
	      var hintStyle = _props.hintStyle;
	      var hintText = _props.hintText;
	      var fullWidth = _props.fullWidth;
	      var errorText = _props.errorText;
	      var maxHeight = _props.maxHeight;
	      var menuStyle = _props.menuStyle;
	      var onFocus = _props.onFocus;
	      var onBlur = _props.onBlur;
	      var onChange = _props.onChange;
	      var value = _props.value;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['autoWidth', 'children', 'style', 'labelStyle', 'iconStyle', 'id', 'underlineDisabledStyle', 'underlineFocusStyle', 'underlineStyle', 'errorStyle', 'disabled', 'floatingLabelFixed', 'floatingLabelText', 'floatingLabelStyle', 'hintStyle', 'hintText', 'fullWidth', 'errorText', 'maxHeight', 'menuStyle', 'onFocus', 'onBlur', 'onChange', 'value']);
	
	
	      var styles = getStyles(this.props, this.context);
	
	      return _react2.default.createElement(
	        _TextField2.default,
	        (0, _extends3.default)({}, other, {
	          style: style,
	          disabled: disabled,
	          floatingLabelFixed: floatingLabelFixed,
	          floatingLabelText: floatingLabelText,
	          floatingLabelStyle: floatingLabelStyle,
	          hintStyle: hintStyle,
	          hintText: !hintText && !floatingLabelText ? ' ' : hintText,
	          fullWidth: fullWidth,
	          errorText: errorText,
	          underlineStyle: underlineStyle,
	          errorStyle: errorStyle,
	          onFocus: onFocus,
	          onBlur: onBlur,
	          id: id,
	          underlineDisabledStyle: underlineDisabledStyle,
	          underlineFocusStyle: underlineFocusStyle
	        }),
	        _react2.default.createElement(
	          _DropDownMenu2.default,
	          {
	            disabled: disabled,
	            style: (0, _simpleAssign2.default)(styles.dropDownMenu, menuStyle),
	            labelStyle: (0, _simpleAssign2.default)(styles.label, labelStyle),
	            iconStyle: (0, _simpleAssign2.default)(styles.icon, iconStyle),
	            underlineStyle: styles.hideDropDownUnderline,
	            autoWidth: autoWidth,
	            value: value,
	            onChange: onChange,
	            maxHeight: maxHeight
	          },
	          children
	        )
	      );
	    }
	  }]);
	  return SelectField;
	}(_react.Component);
	
	SelectField.defaultProps = {
	  autoWidth: false,
	  disabled: false,
	  fullWidth: false
	};
	SelectField.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? SelectField.propTypes = {
	  /**
	   * If true, the width will automatically be set according to the
	   * items inside the menu.
	   * To control the width in CSS instead, leave this prop set to `false`.
	   */
	  autoWidth: _react.PropTypes.bool,
	  /**
	   * The `MenuItem` elements to populate the select field with.
	   * If the menu items have a `label` prop, that value will
	   * represent the selected menu item in the rendered select field.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * If true, the select field will be disabled.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the error element.
	   */
	  errorStyle: _react.PropTypes.object,
	  /**
	   * The error content to display.
	   */
	  errorText: _react.PropTypes.node,
	  /**
	   * If true, the floating label will float even when no value is selected.
	   */
	  floatingLabelFixed: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the floating label.
	   */
	  floatingLabelStyle: _react.PropTypes.object,
	  /**
	   * The content of the floating label.
	   */
	  floatingLabelText: _react.PropTypes.node,
	  /**
	   * If true, the select field will take up the full width of its container.
	   */
	  fullWidth: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the hint element.
	   */
	  hintStyle: _react.PropTypes.object,
	  /**
	   * The hint content to display.
	   */
	  hintText: _react.PropTypes.node,
	  /**
	   * Override the inline-styles of the icon element.
	   */
	  iconStyle: _react.PropTypes.object,
	  /**
	   * The id prop for the text field.
	   */
	  id: _react.PropTypes.string,
	  /**
	   * Override the label style when the select field is inactive.
	   */
	  labelStyle: _react.PropTypes.object,
	  /**
	   * Override the default max-height of the underlying `DropDownMenu` element.
	   */
	  maxHeight: _react.PropTypes.number,
	  /**
	   * Override the inline-styles of the underlying `DropDownMenu` element.
	   */
	  menuStyle: _react.PropTypes.object,
	  /** @ignore */
	  onBlur: _react.PropTypes.func,
	  /**
	   * Callback function fired when a menu item is selected.
	   *
	   * @param {object} event TouchTap event targeting the menu item
	   * that was selected.
	   * @param {number} key The index of the selected menu item.
	   * @param {any} payload The `value` prop of the selected menu item.
	   */
	  onChange: _react.PropTypes.func,
	  /** @ignore */
	  onFocus: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the underline element when the select
	   * field is disabled.
	   */
	  underlineDisabledStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the underline element when the select field
	   * is focused.
	   */
	  underlineFocusStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the underline element.
	   */
	  underlineStyle: _react.PropTypes.object,
	  /**
	   * The value that is currently selected.
	   */
	  value: _react.PropTypes.any
	} : void 0;
	exports.default = SelectField;

/***/ },

/***/ 749:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.MenuItem = exports.DropDownMenu = undefined;
	
	var _DropDownMenu2 = __webpack_require__(750);
	
	var _DropDownMenu3 = _interopRequireDefault(_DropDownMenu2);
	
	var _MenuItem2 = __webpack_require__(629);
	
	var _MenuItem3 = _interopRequireDefault(_MenuItem2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.DropDownMenu = _DropDownMenu3.default;
	exports.MenuItem = _MenuItem3.default;
	exports.default = _DropDownMenu3.default;

/***/ },

/***/ 750:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _arrowDropDown = __webpack_require__(751);
	
	var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);
	
	var _Menu = __webpack_require__(614);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _ClearFix = __webpack_require__(752);
	
	var _ClearFix2 = _interopRequireDefault(_ClearFix);
	
	var _Popover = __webpack_require__(620);
	
	var _Popover2 = _interopRequireDefault(_Popover);
	
	var _PopoverAnimationVertical = __webpack_require__(754);
	
	var _PopoverAnimationVertical2 = _interopRequireDefault(_PopoverAnimationVertical);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var anchorOrigin = {
	  vertical: 'top',
	  horizontal: 'left'
	};
	
	function getStyles(props, context) {
	  var disabled = props.disabled;
	
	  var spacing = context.muiTheme.baseTheme.spacing;
	  var palette = context.muiTheme.baseTheme.palette;
	  var accentColor = context.muiTheme.dropDownMenu.accentColor;
	  return {
	    control: {
	      cursor: disabled ? 'not-allowed' : 'pointer',
	      height: '100%',
	      position: 'relative',
	      width: '100%'
	    },
	    icon: {
	      fill: accentColor,
	      position: 'absolute',
	      right: spacing.desktopGutterLess,
	      top: (spacing.desktopToolbarHeight - 24) / 2
	    },
	    label: {
	      color: disabled ? palette.disabledColor : palette.textColor,
	      lineHeight: spacing.desktopToolbarHeight + 'px',
	      opacity: 1,
	      position: 'relative',
	      paddingLeft: spacing.desktopGutter,
	      paddingRight: spacing.iconSize + spacing.desktopGutterLess + spacing.desktopGutterMini,
	      top: 0
	    },
	    labelWhenOpen: {
	      opacity: 0,
	      top: spacing.desktopToolbarHeight / 8
	    },
	    root: {
	      display: 'inline-block',
	      fontSize: spacing.desktopDropDownMenuFontSize,
	      height: spacing.desktopSubheaderHeight,
	      fontFamily: context.muiTheme.baseTheme.fontFamily,
	      outline: 'none',
	      position: 'relative',
	      transition: _transitions2.default.easeOut()
	    },
	    rootWhenOpen: {
	      opacity: 1
	    },
	    underline: {
	      borderTop: 'solid 1px ' + accentColor,
	      bottom: 1,
	      left: 0,
	      margin: '-1px ' + spacing.desktopGutter + 'px',
	      right: 0,
	      position: 'absolute'
	    }
	  };
	}
	
	var DropDownMenu = function (_Component) {
	  (0, _inherits3.default)(DropDownMenu, _Component);
	
	  function DropDownMenu() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, DropDownMenu);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDownMenu.__proto__ || (0, _getPrototypeOf2.default)(DropDownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      open: false
	    }, _this.handleTouchTapControl = function (event) {
	      event.preventDefault();
	      if (!_this.props.disabled) {
	        _this.setState({
	          open: !_this.state.open,
	          anchorEl: _this.refs.root
	        });
	      }
	    }, _this.handleRequestCloseMenu = function () {
	      _this.setState({
	        open: false,
	        anchorEl: null
	      });
	    }, _this.handleItemTouchTap = function (event, child, index) {
	      event.persist();
	      _this.setState({
	        open: false
	      }, function () {
	        if (_this.props.onChange) {
	          _this.props.onChange(event, index, child.props.value);
	        }
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  // The nested styles for drop-down-menu are modified by toolbar and possibly
	  // other user components, so it will give full access to its js styles rather
	  // than just the parent.
	
	
	  (0, _createClass3.default)(DropDownMenu, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      if (this.props.autoWidth) {
	        this.setWidth();
	      }
	      if (this.props.openImmediately) {
	        // TODO: Temporary fix to make openImmediately work with popover.
	        /* eslint-disable react/no-did-mount-set-state */
	        setTimeout(function () {
	          return _this2.setState({ open: true, anchorEl: _this2.refs.root });
	        });
	        setTimeout(function () {
	          return _this2.setState({
	            open: true,
	            anchorEl: _this2.refs.root
	          });
	        }, 0);
	        /* eslint-enable react/no-did-mount-set-state */
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      if (this.props.autoWidth) {
	        this.setWidth();
	      }
	    }
	
	    /**
	     * This method is deprecated but still here because the TextField
	     * need it in order to work. TODO: That will be addressed later.
	     */
	
	  }, {
	    key: 'getInputNode',
	    value: function getInputNode() {
	      var _this3 = this;
	
	      var root = this.refs.root;
	
	      root.focus = function () {
	        if (!_this3.props.disabled) {
	          _this3.setState({
	            open: !_this3.state.open,
	            anchorEl: _this3.refs.root
	          });
	        }
	      };
	
	      return root;
	    }
	  }, {
	    key: 'setWidth',
	    value: function setWidth() {
	      var el = this.refs.root;
	      if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
	        el.style.width = 'auto';
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var animated = _props.animated;
	      var animation = _props.animation;
	      var autoWidth = _props.autoWidth;
	      var children = _props.children;
	      var className = _props.className;
	      var iconStyle = _props.iconStyle;
	      var labelStyle = _props.labelStyle;
	      var listStyle = _props.listStyle;
	      var maxHeight = _props.maxHeight;
	      var menuStyleProp = _props.menuStyle;
	      var openImmediately = _props.openImmediately;
	      var style = _props.style;
	      var underlineStyle = _props.underlineStyle;
	      var value = _props.value;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['animated', 'animation', 'autoWidth', 'children', 'className', 'iconStyle', 'labelStyle', 'listStyle', 'maxHeight', 'menuStyle', 'openImmediately', 'style', 'underlineStyle', 'value']);
	      var _state = this.state;
	      var anchorEl = _state.anchorEl;
	      var open = _state.open;
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	
	      var displayValue = '';
	      _react2.default.Children.forEach(children, function (child) {
	        if (child && value === child.props.value) {
	          // This will need to be improved (in case primaryText is a node)
	          displayValue = child.props.label || child.props.primaryText;
	        }
	      });
	
	      var menuStyle = void 0;
	      if (anchorEl && !autoWidth) {
	        menuStyle = (0, _simpleAssign2.default)({
	          width: anchorEl.clientWidth
	        }, menuStyleProp);
	      } else {
	        menuStyle = menuStyleProp;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, {
	          ref: 'root',
	          className: className,
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, open && styles.rootWhenOpen, style))
	        }),
	        _react2.default.createElement(
	          _ClearFix2.default,
	          { style: styles.control, onTouchTap: this.handleTouchTapControl },
	          _react2.default.createElement(
	            'div',
	            {
	              style: prepareStyles((0, _simpleAssign2.default)({}, styles.label, open && styles.labelWhenOpen, labelStyle))
	            },
	            displayValue
	          ),
	          _react2.default.createElement(_arrowDropDown2.default, { style: (0, _simpleAssign2.default)({}, styles.icon, iconStyle) }),
	          _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, styles.underline, underlineStyle)) })
	        ),
	        _react2.default.createElement(
	          _Popover2.default,
	          {
	            anchorOrigin: anchorOrigin,
	            anchorEl: anchorEl,
	            animation: animation || _PopoverAnimationVertical2.default,
	            open: open,
	            animated: animated,
	            onRequestClose: this.handleRequestCloseMenu
	          },
	          _react2.default.createElement(
	            _Menu2.default,
	            {
	              maxHeight: maxHeight,
	              desktop: true,
	              value: value,
	              style: menuStyle,
	              listStyle: listStyle,
	              onItemTouchTap: this.handleItemTouchTap
	            },
	            children
	          )
	        )
	      );
	    }
	  }]);
	  return DropDownMenu;
	}(_react.Component);
	
	DropDownMenu.muiName = 'DropDownMenu';
	DropDownMenu.defaultProps = {
	  animated: true,
	  autoWidth: true,
	  disabled: false,
	  openImmediately: false,
	  maxHeight: 500
	};
	DropDownMenu.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? DropDownMenu.propTypes = {
	  /**
	   * If true, the popover will apply transitions when
	   * it gets added to the DOM.
	   */
	  animated: _react.PropTypes.bool,
	  /**
	   * Override the default animation component used.
	   */
	  animation: _react.PropTypes.func,
	  /**
	   * The width will automatically be set according to the items inside the menu.
	   * To control this width in css instead, set this prop to `false`.
	   */
	  autoWidth: _react.PropTypes.bool,
	  /**
	   * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
	   * prop `label` that value will be used to render the representation of that
	   * item within the field.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * Disables the menu.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * Overrides the styles of icon element.
	   */
	  iconStyle: _react.PropTypes.object,
	  /**
	   * Overrides the styles of label when the `DropDownMenu` is inactive.
	   */
	  labelStyle: _react.PropTypes.object,
	  /**
	   * The style object to use to override underlying list style.
	   */
	  listStyle: _react.PropTypes.object,
	  /**
	   * The maximum height of the `Menu` when it is displayed.
	   */
	  maxHeight: _react.PropTypes.number,
	  /**
	   * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
	   */
	  menuStyle: _react.PropTypes.object,
	  /**
	   * Callback function fired when a menu item is clicked, other than the one currently selected.
	   *
	   * @param {object} event TouchTap event targeting the menu item that was clicked.
	   * @param {number} key The index of the clicked menu item in the `children` collection.
	   * @param {any} payload The `value` prop of the clicked menu item.
	   */
	  onChange: _react.PropTypes.func,
	  /**
	   * Set to true to have the `DropDownMenu` automatically open on mount.
	   */
	  openImmediately: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Overrides the inline-styles of the underline.
	   */
	  underlineStyle: _react.PropTypes.object,
	  /**
	   * The value that is currently selected.
	   */
	  value: _react.PropTypes.any
	} : void 0;
	exports.default = DropDownMenu;

/***/ },

/***/ 751:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NavigationArrowDropDown = function NavigationArrowDropDown(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' })
	  );
	};
	NavigationArrowDropDown = (0, _pure2.default)(NavigationArrowDropDown);
	NavigationArrowDropDown.displayName = 'NavigationArrowDropDown';
	NavigationArrowDropDown.muiName = 'SvgIcon';
	
	exports.default = NavigationArrowDropDown;

/***/ },

/***/ 752:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BeforeAfterWrapper = __webpack_require__(753);
	
	var _BeforeAfterWrapper2 = _interopRequireDefault(_BeforeAfterWrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	  before: {
	    content: "' '",
	    display: 'table'
	  },
	  after: {
	    content: "' '",
	    clear: 'both',
	    display: 'table'
	  }
	};
	
	var ClearFix = function ClearFix(_ref) {
	  var style = _ref.style;
	  var children = _ref.children;
	  var other = (0, _objectWithoutProperties3.default)(_ref, ['style', 'children']);
	  return _react2.default.createElement(
	    _BeforeAfterWrapper2.default,
	    (0, _extends3.default)({}, other, {
	      beforeStyle: styles.before,
	      afterStyle: styles.after,
	      style: style
	    }),
	    children
	  );
	};
	
	ClearFix.muiName = 'ClearFix';
	
	 true ? ClearFix.propTypes = {
	  children: _react.PropTypes.node,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	
	exports.default = ClearFix;

/***/ },

/***/ 753:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *  BeforeAfterWrapper
	 *    An alternative for the ::before and ::after css pseudo-elements for
	 *    components whose styles are defined in javascript instead of css.
	 *
	 *  Usage: For the element that we want to apply before and after elements to,
	 *    wrap its children with BeforeAfterWrapper. For example:
	 *
	 *                                            <Paper>
	 *  <Paper>                                     <div> // See notice
	 *    <BeforeAfterWrapper>        renders         <div/> // before element
	 *      [children of paper]       ------>         [children of paper]
	 *    </BeforeAfterWrapper>                       <div/> // after element
	 *  </Paper>                                    </div>
	 *                                            </Paper>
	 *
	 *  Notice: Notice that this div bundles together our elements. If the element
	 *    that we want to apply before and after elements is a HTML tag (i.e. a
	 *    div, p, or button tag), we can avoid this extra nesting by passing using
	 *    the BeforeAfterWrapper in place of said tag like so:
	 *
	 *  <p>
	 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
	 *      [children of p]          ------>         [children of p]
	 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper>
	 *  </p>
	 *
	 *  BeforeAfterWrapper features spread functionality. This means that we can
	 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
	 *
	 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement
	 *  and afterElement have a defined style position.
	 */
	
	var styles = {
	  box: {
	    boxSizing: 'border-box'
	  }
	};
	
	var BeforeAfterWrapper = function (_Component) {
	  (0, _inherits3.default)(BeforeAfterWrapper, _Component);
	
	  function BeforeAfterWrapper() {
	    (0, _classCallCheck3.default)(this, BeforeAfterWrapper);
	    return (0, _possibleConstructorReturn3.default)(this, (BeforeAfterWrapper.__proto__ || (0, _getPrototypeOf2.default)(BeforeAfterWrapper)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(BeforeAfterWrapper, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var beforeStyle = _props.beforeStyle;
	      var afterStyle = _props.afterStyle;
	      var beforeElementType = _props.beforeElementType;
	      var afterElementType = _props.afterElementType;
	      var elementType = _props.elementType;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['beforeStyle', 'afterStyle', 'beforeElementType', 'afterElementType', 'elementType']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	
	      var beforeElement = void 0;
	      var afterElement = void 0;
	
	      if (beforeStyle) {
	        beforeElement = _react2.default.createElement(this.props.beforeElementType, {
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.box, beforeStyle)),
	          key: '::before'
	        });
	      }
	
	      if (afterStyle) {
	        afterElement = _react2.default.createElement(this.props.afterElementType, {
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.box, afterStyle)),
	          key: '::after'
	        });
	      }
	
	      var children = [beforeElement, this.props.children, afterElement];
	
	      var props = other;
	      props.style = prepareStyles((0, _simpleAssign2.default)({}, this.props.style));
	
	      return _react2.default.createElement(this.props.elementType, props, children);
	    }
	  }]);
	  return BeforeAfterWrapper;
	}(_react.Component);
	
	BeforeAfterWrapper.defaultProps = {
	  beforeElementType: 'div',
	  afterElementType: 'div',
	  elementType: 'div'
	};
	BeforeAfterWrapper.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? BeforeAfterWrapper.propTypes = {
	  afterElementType: _react.PropTypes.string,
	  afterStyle: _react.PropTypes.object,
	  beforeElementType: _react.PropTypes.string,
	  beforeStyle: _react.PropTypes.object,
	  children: _react.PropTypes.node,
	  elementType: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = BeforeAfterWrapper;

/***/ },

/***/ 754:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Paper = __webpack_require__(610);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _propTypes = __webpack_require__(565);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context, state) {
	  var targetOrigin = props.targetOrigin;
	  var open = state.open;
	  var muiTheme = context.muiTheme;
	
	  var horizontal = targetOrigin.horizontal.replace('middle', 'vertical');
	
	  return {
	    root: {
	      opacity: open ? 1 : 0,
	      transform: open ? 'scaleY(1)' : 'scaleY(0)',
	      transformOrigin: horizontal + ' ' + targetOrigin.vertical,
	      position: 'fixed',
	      zIndex: muiTheme.zIndex.popover,
	      transition: _transitions2.default.easeOut('450ms', ['transform', 'opacity']),
	      maxHeight: '100%'
	    }
	  };
	}
	
	var PopoverAnimationVertical = function (_Component) {
	  (0, _inherits3.default)(PopoverAnimationVertical, _Component);
	
	  function PopoverAnimationVertical() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, PopoverAnimationVertical);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PopoverAnimationVertical.__proto__ || (0, _getPrototypeOf2.default)(PopoverAnimationVertical)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      open: false
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(PopoverAnimationVertical, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ open: true }); // eslint-disable-line react/no-did-mount-set-state
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({
	        open: nextProps.open
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var className = _props.className;
	      var style = _props.style;
	      var zDepth = _props.zDepth;
	
	
	      var styles = getStyles(this.props, this.context, this.state);
	
	      return _react2.default.createElement(
	        _Paper2.default,
	        {
	          style: (0, _simpleAssign2.default)(styles.root, style),
	          zDepth: zDepth,
	          className: className
	        },
	        this.props.children
	      );
	    }
	  }]);
	  return PopoverAnimationVertical;
	}(_react.Component);
	
	PopoverAnimationVertical.defaultProps = {
	  style: {},
	  zDepth: 1
	};
	PopoverAnimationVertical.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? PopoverAnimationVertical.propTypes = {
	  children: _react.PropTypes.node,
	  className: _react.PropTypes.string,
	  open: _react.PropTypes.bool.isRequired,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  targetOrigin: _propTypes2.default.origin.isRequired,
	  zDepth: _propTypes2.default.zDepth
	} : void 0;
	exports.default = PopoverAnimationVertical;

/***/ },

/***/ 942:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(496);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },

/***/ 944:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(422);
	
	var _actions = __webpack_require__(945);
	
	var _login = __webpack_require__(953);
	
	var _login2 = _interopRequireDefault(_login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapDispatchToProps = {
	  loginUser: _actions.loginUser,
	  signupUser: _actions.signupUser
	};
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {};
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_login2.default);

/***/ },

/***/ 945:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LOGOUT_FAILURE = exports.LOGOUT_SUCCESS = exports.LOGOUT_REQUEST = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = undefined;
	exports.loginUser = loginUser;
	exports.signupUser = signupUser;
	
	var _utils = __webpack_require__(946);
	
	var _axios = __webpack_require__(700);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _jwtDecode = __webpack_require__(947);
	
	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);
	
	var _isomorphicFetch = __webpack_require__(950);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _formDataToObject = __webpack_require__(952);
	
	var _formDataToObject2 = _interopRequireDefault(_formDataToObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
	
	function requestLogin(data) {
	  return {
	    type: LOGIN_REQUEST,
	    isFetching: true,
	    isAuthenticated: false,
	    data: data
	  };
	}
	
	function receiveLogin(response) {
	  return {
	    type: LOGIN_SUCCESS,
	    isFetching: false,
	    isAuthenticated: true,
	    id_token: response.data.id_token
	  };
	}
	
	function loginError(message) {
	  return {
	    type: LOGIN_FAILURE,
	    isFetching: false,
	    isAuthenticated: false,
	    message: message
	  };
	}
	
	// Three possible states for our logout process as well.
	// Since we are using JWTs, we just need to remove the token
	// from localStorage. These actions are more useful if we
	// were calling the API to log the user out
	var LOGOUT_REQUEST = exports.LOGOUT_REQUEST = 'LOGOUT_REQUEST';
	var LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
	var LOGOUT_FAILURE = exports.LOGOUT_FAILURE = 'LOGOUT_FAILURE';
	
	function requestLogout() {
	  return {
	    type: LOGOUT_REQUEST,
	    isFetching: true,
	    isAuthenticated: true
	  };
	}
	
	function receiveLogout() {
	  return {
	    type: LOGOUT_SUCCESS,
	    isFetching: false,
	    isAuthenticated: false
	  };
	}
	
	function loginUser(data) {
	  return function (dispatch) {
	    (0, _axios2.default)({
	      method: 'post',
	      url: '/api/login',
	      headers: { 'Content-Type': 'application/json' },
	      data: data
	    }).then(function (response) {
	      console.log(response);
	      localStorage.setItem('auth_token', response.data.auth_token);
	      dispatch(receiveLogin(response));
	      window.location.href = '/';
	    }).catch(function (error) {
	      console.log(error);
	    });
	  };
	}
	
	function signupUser(data) {
	  return function (dispatch) {
	    (0, _axios2.default)({
	      method: 'post',
	      url: '/api/users',
	      headers: { 'Content-Type': 'application/json' },
	      data: data
	    }).then(function (response) {
	      console.log(response);
	      localStorage.setItem('auth_token', response.data.auth_token);
	      dispatch(receiveLogin(response));
	      window.location.href = '/';
	    }).catch(function (error) {
	      console.log(error);
	    });
	  };
	}

/***/ },

/***/ 946:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkHttpStatus = checkHttpStatus;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function checkHttpStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    var error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	}

/***/ },

/***/ 947:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base64_url_decode = __webpack_require__(948);
	
	module.exports = function (token,options) {
	  if (typeof token !== 'string') {
	    throw new Error('Invalid token specified');
	  }
	
	  options = options || {};
	  var pos = options.header === true ? 0 : 1;
	  return JSON.parse(base64_url_decode(token.split('.')[pos]));
	};


/***/ },

/***/ 948:
/***/ function(module, exports, __webpack_require__) {

	var atob = __webpack_require__(949);
	
	function b64DecodeUnicode(str) {
	  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
	    var code = p.charCodeAt(0).toString(16).toUpperCase();
	    if (code.length < 2) {
	      code = '0' + code;
	    }
	    return '%' + code;
	  }));
	}
	
	module.exports = function(str) {
	  var output = str.replace(/-/g, "+").replace(/_/g, "/");
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += "==";
	      break;
	    case 3:
	      output += "=";
	      break;
	    default:
	      throw "Illegal base64url string!";
	  }
	
	  try{
	    return b64DecodeUnicode(output);
	  } catch (err) {
	    return atob(output);
	  }
	};


/***/ },

/***/ 949:
/***/ function(module, exports) {

	/**
	 * The code was extracted from:
	 * https://github.com/davidchambers/Base64.js
	 */
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function InvalidCharacterError(message) {
	  this.message = message;
	}
	
	InvalidCharacterError.prototype = new Error();
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	function polyfill (input) {
	  var str = String(input).replace(/=+$/, '');
	  if (str.length % 4 == 1) {
	    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	  }
	  for (
	    // initialize result and counters
	    var bc = 0, bs, buffer, idx = 0, output = '';
	    // get next character
	    buffer = str.charAt(idx++);
	    // character found in table? initialize bit storage and add its ascii value;
	    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	      // and if not first of each 4 characters,
	      // convert the first 8 bits to one ascii character
	      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	  ) {
	    // try to find character in table (0-63, not found => -1)
	    buffer = chars.indexOf(buffer);
	  }
	  return output;
	}
	
	
	module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ },

/***/ 950:
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(951);
	module.exports = self.fetch.bind(self);


/***/ },

/***/ 951:
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },

/***/ 952:
/***/ function(module, exports) {

	function toObj(source) {
	  return Object.keys(source).reduce(function (output, key) {
	    var parentKey = key.match(/[^\[]*/i);
	    var paths = key.match(/\[.*?\]/g) || [];
	    paths = [parentKey[0]].concat(paths).map(function (key) {
	      return key.replace(/\[|\]/g, '');
	    });
	    var currentPath = output;
	    while (paths.length) {
	      var pathKey = paths.shift();
	
	      if (pathKey in currentPath) {
	        currentPath = currentPath[pathKey];
	      } else {
	        currentPath[pathKey] = paths.length ? isNaN(paths[0]) ? {} : [] : source[key];
	        currentPath = currentPath[pathKey];
	      }
	    }
	
	    return output;
	  }, {});
	}
	
	function fromObj(obj) {
	  function recur(newObj, propName, currVal) {
	    if (Array.isArray(currVal) || Object.prototype.toString.call(currVal) === '[object Object]') {
	      Object.keys(currVal).forEach(function(v) {
	        recur(newObj, propName + "[" + v + "]", currVal[v]);
	      });
	      return newObj;
	    }
	
	    newObj[propName] = currVal;
	    return newObj;
	  }
	
	  var keys = Object.keys(obj);
	  return keys.reduce(function(newObj, propName) {
	    return recur(newObj, propName, obj[propName]);
	  }, {});
	}
	
	module.exports = {
	  fromObj: fromObj,
	  toObj: toObj
	}

/***/ },

/***/ 953:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSwipeableViews = __webpack_require__(954);
	
	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);
	
	var _loginForm = __webpack_require__(974);
	
	var _loginForm2 = _interopRequireDefault(_loginForm);
	
	var _signupForm = __webpack_require__(996);
	
	var _signupForm2 = _interopRequireDefault(_signupForm);
	
	var _reduxForm = __webpack_require__(299);
	
	var _Card = __webpack_require__(985);
	
	var _Tabs = __webpack_require__(642);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Login = function Login(props) {
	  var handleSubmit = props.handleSubmit;
	  var pristine = props.pristine;
	  var reset = props.reset;
	  var submitting = props.submitting;
	
	  return _react2.default.createElement(
	    _Card.Card,
	    { style: { width: '450px' } },
	    _react2.default.createElement(
	      _Tabs.Tabs,
	      null,
	      _react2.default.createElement(
	        _Tabs.Tab,
	        { label: 'Login' },
	        _react2.default.createElement(_Card.CardHeader, {
	          style: { background: 'rgba(241,241,241,.8)', minHeight: '100px' },
	          title: 'JobHub Login'
	        }),
	        _react2.default.createElement(_loginForm2.default, { onSubmit: function onSubmit(data) {
	            props.loginUser(data);
	          } })
	      ),
	      _react2.default.createElement(
	        _Tabs.Tab,
	        { label: 'Sign Up' },
	        _react2.default.createElement(_Card.CardHeader, {
	          style: { background: 'rgba(241,241,241,.8)', minHeight: '100px' },
	          title: 'JobHub Signup'
	        }),
	        _react2.default.createElement(_signupForm2.default, { onSubmit: function onSubmit(data) {
	            props.signupUser(data);
	          } })
	      )
	    )
	  );
	};
	
	exports.default = Login;

/***/ },

/***/ 954:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SwipeableViews = __webpack_require__(955);
	
	var _SwipeableViews2 = _interopRequireDefault(_SwipeableViews);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _SwipeableViews2.default; //  weak

/***/ },

/***/ 955:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _assign = __webpack_require__(277);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMotion = __webpack_require__(956);
	
	var _warning = __webpack_require__(217);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _constant = __webpack_require__(970);
	
	var _checkIndexBounds = __webpack_require__(971);
	
	var _checkIndexBounds2 = _interopRequireDefault(_checkIndexBounds);
	
	var _computeIndex2 = __webpack_require__(972);
	
	var _computeIndex3 = _interopRequireDefault(_computeIndex2);
	
	var _getDisplaySameSlide = __webpack_require__(973);
	
	var _getDisplaySameSlide2 = _interopRequireDefault(_getDisplaySameSlide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	  container: {
	    display: 'flex',
	    willChange: 'transform'
	  },
	  slide: {
	    width: '100%',
	    flexShrink: 0,
	    overflow: 'auto'
	  }
	}; /* eslint-disable flowtype/require-valid-file-annotation */
	
	var axisProperties = {
	  root: {
	    x: {
	      overflowX: 'hidden'
	    },
	    'x-reverse': {
	      overflowX: 'hidden'
	    },
	    y: {
	      overflowY: 'hidden'
	    },
	    'y-reverse': {
	      overflowY: 'hidden'
	    }
	  },
	  flexDirection: {
	    x: 'row',
	    'x-reverse': 'row-reverse',
	    y: 'column',
	    'y-reverse': 'column-reverse'
	  },
	  transform: {
	    x: function x(translate) {
	      return 'translate(' + -translate + '%, 0)';
	    },
	    'x-reverse': function xReverse(translate) {
	      return 'translate(' + translate + '%, 0)';
	    },
	    y: function y(translate) {
	      return 'translate(0, ' + -translate + '%)';
	    },
	    'y-reverse': function yReverse(translate) {
	      return 'translate(0, ' + translate + '%)';
	    }
	  },
	  length: {
	    x: 'width',
	    'x-reverse': 'width',
	    y: 'height',
	    'y-reverse': 'height'
	  },
	  rotationMatrix: {
	    x: {
	      x: [1, 0],
	      y: [0, 1]
	    },
	    'x-reverse': {
	      x: [-1, 0],
	      y: [0, 1]
	    },
	    y: {
	      x: [0, 1],
	      y: [1, 0]
	    },
	    'y-reverse': {
	      x: [0, -1],
	      y: [1, 0]
	    }
	  }
	};
	
	// We are using a 2x2 rotation matrix.
	function applyRotationMatrix(touch, axis) {
	  var rotationMatrix = axisProperties.rotationMatrix[axis];
	
	  return {
	    pageX: rotationMatrix.x[0] * touch.pageX + rotationMatrix.x[1] * touch.pageY,
	    pageY: rotationMatrix.y[0] * touch.pageX + rotationMatrix.y[1] * touch.pageY
	  };
	}
	
	function getDomTreeShapes(element, rootNode) {
	  var domTreeShapes = [];
	
	  while (element && element !== rootNode.firstChild) {
	    // Ignore the nodes that have no width.
	    if (element.clientWidth > 0) {
	      domTreeShapes.push({
	        element: element,
	        scrollWidth: element.scrollWidth,
	        clientWidth: element.clientWidth,
	        scrollLeft: element.scrollLeft
	      });
	    }
	
	    element = element.parentNode;
	  }
	
	  return domTreeShapes.slice(0, -2) // Remove internal elements.
	  .filter(function (shape) {
	    return shape.scrollWidth > shape.clientWidth;
	  }); // Keep elements with a scroll.
	}
	
	// We can only have one node at the time claiming ownership for handling the swipe.
	// Otherwise, the UX would be confusing.
	var nodeHowClaimedTheScroll = null;
	
	var SwipeableViews = function (_Component) {
	  (0, _inherits3.default)(SwipeableViews, _Component);
	
	  function SwipeableViews() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, SwipeableViews);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SwipeableViews.__proto__ || (0, _getPrototypeOf2.default)(SwipeableViews)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.viewLength = 0, _this.startX = 0, _this.lastX = 0, _this.vx = 0, _this.startY = 0, _this.isSwiping = undefined, _this.started = false, _this.handleTouchStart = function (event) {
	      var _this$props = _this.props;
	      var axis = _this$props.axis;
	      var onTouchStart = _this$props.onTouchStart;
	
	
	      if (onTouchStart) {
	        onTouchStart(event);
	      }
	
	      var touch = applyRotationMatrix(event.touches[0], axis);
	
	      _this.viewLength = _this.node.getBoundingClientRect()[axisProperties.length[axis]];
	      _this.startX = touch.pageX;
	      _this.lastX = touch.pageX;
	      _this.vx = 0;
	      _this.startY = touch.pageY;
	      _this.isSwiping = undefined;
	      _this.started = true;
	    }, _this.handleTouchMove = function (event) {
	      if (_this.props.onTouchMove) {
	        _this.props.onTouchMove(event);
	      }
	
	      // The touch start event can be cancel.
	      // Makes sure we set a starting point.
	      if (!_this.started) {
	        _this.handleTouchStart(event);
	        return;
	      }
	
	      // We are not supposed to hanlde this touch move.
	      if (nodeHowClaimedTheScroll !== null && nodeHowClaimedTheScroll !== _this.node) {
	        return;
	      }
	
	      var _this$props2 = _this.props;
	      var axis = _this$props2.axis;
	      var children = _this$props2.children;
	      var onSwitching = _this$props2.onSwitching;
	      var resistance = _this$props2.resistance;
	
	
	      var touch = applyRotationMatrix(event.touches[0], axis);
	
	      // We don't know yet.
	      if (_this.isSwiping === undefined) {
	        var dx = Math.abs(_this.startX - touch.pageX);
	        var dy = Math.abs(_this.startY - touch.pageY);
	
	        var isSwiping = dx > dy && dx > _constant.UNCERTAINTY_THRESHOLD;
	
	        // We are likely to be swiping, let's prevent the scroll event.
	        if (dx > dy) {
	          event.preventDefault();
	        }
	
	        if (isSwiping === true || dy > _constant.UNCERTAINTY_THRESHOLD) {
	          _this.isSwiping = isSwiping;
	          _this.startX = touch.pageX; // Shift the starting point.
	
	          return; // Let's wait the next touch event to move something.
	        }
	      }
	
	      if (_this.isSwiping !== true) {
	        return;
	      }
	
	      // We are swiping, let's prevent the scroll event.
	      event.preventDefault();
	
	      // Low Pass filter.
	      _this.vx = _this.vx * 0.5 + (touch.pageX - _this.lastX) * 0.5;
	      _this.lastX = touch.pageX;
	
	      var _computeIndex = (0, _computeIndex3.default)({
	        children: children,
	        resistance: resistance,
	        pageX: touch.pageX,
	        indexLatest: _this.state.indexLatest,
	        startX: _this.startX,
	        viewLength: _this.viewLength
	      });
	
	      var index = _computeIndex.index;
	      var startX = _computeIndex.startX;
	
	      // Add support for native scroll elements.
	
	      if (nodeHowClaimedTheScroll === null) {
	        var domTreeShapes = getDomTreeShapes(event.target, _this.node);
	
	        var hasFoundNativeHandler = domTreeShapes.some(function (shape) {
	          if (index >= _this.state.indexCurrent && shape.scrollLeft + shape.clientWidth < shape.scrollWidth || index <= _this.state.indexCurrent && shape.scrollLeft > 0) {
	            nodeHowClaimedTheScroll = shape.element;
	            return true;
	          } else {
	            return false;
	          }
	        });
	
	        // We abort the touch move handler.
	        if (hasFoundNativeHandler) {
	          return;
	        }
	      }
	
	      // We are moving toward the edges.
	      if (startX) {
	        _this.startX = startX;
	      } else if (nodeHowClaimedTheScroll === null) {
	        nodeHowClaimedTheScroll = _this.node;
	      }
	
	      _this.setState({
	        isDragging: true,
	        indexCurrent: index
	      }, function () {
	        if (onSwitching) {
	          onSwitching(index, 'move');
	        }
	      });
	    }, _this.handleTouchEnd = function (event) {
	      if (_this.props.onTouchEnd) {
	        _this.props.onTouchEnd(event);
	      }
	
	      nodeHowClaimedTheScroll = null;
	
	      // The touch start event can be cancel.
	      // Makes sure that a starting point is set.
	      if (!_this.started) {
	        return;
	      }
	
	      _this.started = false;
	
	      if (_this.isSwiping !== true) {
	        return;
	      }
	
	      var indexLatest = _this.state.indexLatest;
	      var indexCurrent = _this.state.indexCurrent;
	
	      var indexNew = void 0;
	
	      // Quick movement
	      if (Math.abs(_this.vx) > _this.props.threshold) {
	        if (_this.vx > 0) {
	          indexNew = Math.floor(indexCurrent);
	        } else {
	          indexNew = Math.ceil(indexCurrent);
	        }
	      } else {
	        // Some hysteresis with indexLatest
	        if (Math.abs(indexLatest - indexCurrent) > 0.6) {
	          indexNew = Math.round(indexCurrent);
	        } else {
	          indexNew = indexLatest;
	        }
	      }
	
	      var indexMax = _react.Children.count(_this.props.children) - 1;
	
	      if (indexNew < 0) {
	        indexNew = 0;
	      } else if (indexNew > indexMax) {
	        indexNew = indexMax;
	      }
	
	      _this.setState({
	        indexCurrent: indexNew,
	        indexLatest: indexNew,
	        isDragging: false,
	        displaySameSlide: false
	      }, function () {
	        if (_this.props.onSwitching) {
	          _this.props.onSwitching(indexNew, 'end');
	        }
	
	        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
	          _this.props.onChangeIndex(indexNew, indexLatest);
	        }
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(SwipeableViews, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      if (true) {
	        (0, _checkIndexBounds2.default)(this.props);
	      }
	
	      this.setState({
	        indexCurrent: this.props.index,
	        indexLatest: this.props.index,
	        isDragging: false,
	        isFirstRender: true,
	        heightLatest: 0
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /* eslint-disable react/no-did-mount-set-state */
	      this.setState({
	        isFirstRender: false
	      });
	      /* eslint-enable react/no-did-mount-set-state */
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var index = nextProps.index;
	
	
	      if (typeof index === 'number' && index !== this.props.index) {
	        if (true) {
	          (0, _checkIndexBounds2.default)(nextProps);
	        }
	
	        this.setState({
	          indexCurrent: index,
	          indexLatest: index,
	          // If true, we are going to display the same slide. We shoudn't animate it.
	          displaySameSlide: (0, _getDisplaySameSlide2.default)(this.props, nextProps)
	        });
	      }
	    }
	  }, {
	    key: 'updateHeight',
	    value: function updateHeight(node) {
	      if (node !== null) {
	        var child = node.children[0];
	        if (child !== undefined && child.offsetHeight !== undefined && this.state.heightLatest !== child.offsetHeight) {
	          this.setState({
	            heightLatest: child.offsetHeight
	          });
	        }
	      }
	    }
	  }, {
	    key: 'renderContainer',
	    value: function renderContainer(interpolatedStyle, animateHeight, childrenToRender) {
	      var _props = this.props;
	      var axis = _props.axis;
	      var containerStyle = _props.containerStyle;
	
	
	      var transform = axisProperties.transform[axis](interpolatedStyle.translate);
	
	      var styleNew = {
	        WebkitTransform: transform,
	        transform: transform,
	        height: null,
	        flexDirection: axisProperties.flexDirection[axis]
	      };
	
	      if (animateHeight) {
	        styleNew.height = interpolatedStyle.height;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { style: (0, _assign2.default)({}, styleNew, styles.container, containerStyle) },
	        childrenToRender
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props2 = this.props;
	      var animateHeight = _props2.animateHeight;
	      var animateTransitions = _props2.animateTransitions;
	      var axis = _props2.axis;
	      var children = _props2.children;
	      var containerStyle = _props2.containerStyle;
	      var disabled = _props2.disabled;
	      var index = _props2.index;
	      var onChangeIndex = _props2.onChangeIndex;
	      var onSwitching = _props2.onSwitching;
	      var resistance = _props2.resistance;
	      var slideStyle = _props2.slideStyle;
	      var springConfig = _props2.springConfig;
	      var style = _props2.style;
	      var threshold = _props2.threshold;
	      var other = (0, _objectWithoutProperties3.default)(_props2, ['animateHeight', 'animateTransitions', 'axis', 'children', 'containerStyle', 'disabled', 'index', 'onChangeIndex', 'onSwitching', 'resistance', 'slideStyle', 'springConfig', 'style', 'threshold']);
	      var _state = this.state;
	      var displaySameSlide = _state.displaySameSlide;
	      var heightLatest = _state.heightLatest;
	      var indexCurrent = _state.indexCurrent;
	      var isDragging = _state.isDragging;
	      var isFirstRender = _state.isFirstRender;
	
	
	      var translate = indexCurrent * 100;
	      var height = heightLatest;
	
	      var motionStyle = isDragging || !animateTransitions || displaySameSlide ? {
	        translate: translate,
	        height: height
	      } : {
	        translate: (0, _reactMotion.spring)(translate, springConfig),
	        height: height !== 0 ? (0, _reactMotion.spring)(height, springConfig) : 0
	      };
	
	      var touchEvents = disabled ? {} : {
	        onTouchStart: this.handleTouchStart,
	        onTouchMove: this.handleTouchMove,
	        onTouchEnd: this.handleTouchEnd
	      };
	
	      // There is no point to animate if we are already providing a height.
	       true ? (0, _warning2.default)(!animateHeight || !containerStyle || !containerStyle.height && !containerStyle.maxHeight && !containerStyle.minHeight, 'react-swipeable-view: You are setting animateHeight to true but you are also providing a custom height.\n      The custom height has a higher priority than the animateHeight property.\n      So animateHeight is most likely having no effect at all.') : void 0;
	
	      var slideStyleObj = (0, _assign2.default)({}, styles.slide, slideStyle);
	
	      var childrenToRender = _react.Children.map(children, function (child, indexChild) {
	        if (isFirstRender && indexChild > 0) {
	          return null;
	        }
	
	        var ref = void 0;
	
	        if (animateHeight && indexChild === _this2.state.indexLatest) {
	          ref = function ref(node) {
	            return _this2.updateHeight(node);
	          };
	          slideStyleObj.overflowY = 'hidden';
	        }
	
	        return _react2.default.createElement(
	          'div',
	          { ref: ref, style: slideStyleObj },
	          child
	        );
	      });
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({
	          ref: function ref(node) {
	            return _this2.node = node;
	          },
	          style: (0, _assign2.default)({}, axisProperties.root[axis], style)
	        }, other, touchEvents),
	        _react2.default.createElement(
	          _reactMotion.Motion,
	          { style: motionStyle },
	          function (interpolatedStyle) {
	            return _this2.renderContainer(interpolatedStyle, animateHeight, childrenToRender);
	          }
	        )
	      );
	    }
	  }]);
	  return SwipeableViews;
	}(_react.Component);
	
	SwipeableViews.defaultProps = {
	  animateHeight: false,
	  animateTransitions: true,
	  axis: 'x',
	  index: 0,
	  threshold: 5,
	  resistance: false,
	  disabled: false,
	  springConfig: {
	    stiffness: 300,
	    damping: 30
	  }
	};
	 true ? SwipeableViews.propTypes = {
	  /**
	   * If `true`, the height of the container will be animated to match the current slide height.
	   * Animating another style property has a negative impact regarding performance.
	   */
	  animateHeight: _react.PropTypes.bool,
	  /**
	   * If `false`, changes to the index prop will not cause an animated transition.
	   */
	  animateTransitions: _react.PropTypes.bool,
	  /**
	   * The axis on which the slides will slide.
	   */
	  axis: _react.PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
	  /**
	   * Use this property to provide your slides.
	   */
	  children: _react.PropTypes.node.isRequired,
	  /**
	   * This is the inlined style that will be applied
	   * to each slide container.
	   */
	  containerStyle: _react.PropTypes.object,
	  /**
	   * If `true`, it will disable touch events.
	   * This is useful when you want to prohibit the user from changing slides.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * This is the index of the slide to show.
	   * This is useful when you want to change the default slide shown.
	   * Or when you have tabs linked to each slide.
	   */
	  index: _react.PropTypes.number,
	  /**
	   * This is callback prop. It's call by the
	   * component when the shown slide change after a swipe made by the user.
	   * This is useful when you have tabs linked to each slide.
	   *
	   * @param {integer} index This is the current index of the slide.
	   * @param {integer} indexLatest This is the oldest index of the slide.
	   */
	  onChangeIndex: _react.PropTypes.func,
	  /**
	   * This is callback prop. It's called by the
	   * component when the slide switching.
	   * This is useful when you want to implement something corresponding to the current slide position.
	   *
	   * @param {integer} index This is the current index of the slide.
	   * @param {string} type Can be either `move` or `end`.
	   */
	  onSwitching: _react.PropTypes.func,
	  /**
	   * @ignore
	   */
	  onTouchEnd: _react.PropTypes.func,
	  /**
	   * @ignore
	   */
	  onTouchMove: _react.PropTypes.func,
	  /**
	   * @ignore
	   */
	  onTouchStart: _react.PropTypes.func,
	  /**
	   * If `true`, it will add bounds effect on the edges.
	   */
	  resistance: _react.PropTypes.bool,
	  /**
	   * This is the inlined style that will be applied
	   * on the slide component.
	   */
	  slideStyle: _react.PropTypes.object,
	  /**
	   * This is the config given to react-motion for the spring.
	   * This is useful to change the dynamic of the transition.
	   */
	  springConfig: _react.PropTypes.object,
	  /**
	   * This is the inlined style that will be applied
	   * on the root component.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * This is the threshold used for detecting a quick swipe.
	   * If the computed speed is above this value, the index change.
	   */
	  threshold: _react.PropTypes.number
	} : void 0;
	exports.default = SwipeableViews;

/***/ },

/***/ 956:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }
	
	var _Motion = __webpack_require__(957);
	
	exports.Motion = _interopRequire(_Motion);
	
	var _StaggeredMotion = __webpack_require__(964);
	
	exports.StaggeredMotion = _interopRequire(_StaggeredMotion);
	
	var _TransitionMotion = __webpack_require__(965);
	
	exports.TransitionMotion = _interopRequire(_TransitionMotion);
	
	var _spring = __webpack_require__(967);
	
	exports.spring = _interopRequire(_spring);
	
	var _presets = __webpack_require__(968);
	
	exports.presets = _interopRequire(_presets);
	
	// deprecated, dummy warning function
	
	var _reorderKeys = __webpack_require__(969);
	
	exports.reorderKeys = _interopRequire(_reorderKeys);

/***/ },

/***/ 957:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(958);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(959);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(960);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _performanceNow = __webpack_require__(961);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(962);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(963);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	var Motion = _react2['default'].createClass({
	  displayName: 'Motion',
	
	  propTypes: {
	    // TOOD: warn against putting a config in here
	    defaultStyle: _react.PropTypes.objectOf(_react.PropTypes.number),
	    style: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object])).isRequired,
	    children: _react.PropTypes.func.isRequired,
	    onRest: _react.PropTypes.func
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyle = _props.defaultStyle;
	    var style = _props.style;
	
	    var currentStyle = defaultStyle || _stripStyle2['default'](style);
	    var currentVelocity = _mapToZero2['default'](currentStyle);
	    return {
	      currentStyle: currentStyle,
	      currentVelocity: currentVelocity,
	      lastIdealStyle: currentStyle,
	      lastIdealVelocity: currentVelocity
	    };
	  },
	
	  wasAnimating: false,
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyle: null,
	  // after checking for unreadPropStyle != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(destStyle) {
	    var dirty = false;
	    var _state = this.state;
	    var currentStyle = _state.currentStyle;
	    var currentVelocity = _state.currentVelocity;
	    var lastIdealStyle = _state.lastIdealStyle;
	    var lastIdealVelocity = _state.lastIdealVelocity;
	
	    for (var key in destStyle) {
	      if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
	        continue;
	      }
	
	      var styleValue = destStyle[key];
	      if (typeof styleValue === 'number') {
	        if (!dirty) {
	          dirty = true;
	          currentStyle = _extends({}, currentStyle);
	          currentVelocity = _extends({}, currentVelocity);
	          lastIdealStyle = _extends({}, lastIdealStyle);
	          lastIdealVelocity = _extends({}, lastIdealVelocity);
	        }
	
	        currentStyle[key] = styleValue;
	        currentVelocity[key] = 0;
	        lastIdealStyle[key] = styleValue;
	        lastIdealVelocity[key] = 0;
	      }
	    }
	
	    if (dirty) {
	      this.setState({ currentStyle: currentStyle, currentVelocity: currentVelocity, lastIdealStyle: lastIdealStyle, lastIdealVelocity: lastIdealVelocity });
	    }
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function (timestamp) {
	      // check if we need to animate in the first place
	      var propsStyle = _this.props.style;
	      if (_shouldStopAnimation2['default'](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
	        if (_this.wasAnimating && _this.props.onRest) {
	          _this.props.onRest();
	        }
	
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.wasAnimating = false;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      _this.wasAnimating = true;
	
	      var currentTime = timestamp || _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var newLastIdealStyle = {};
	      var newLastIdealVelocity = {};
	      var newCurrentStyle = {};
	      var newCurrentVelocity = {};
	
	      for (var key in propsStyle) {
	        if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
	          continue;
	        }
	
	        var styleValue = propsStyle[key];
	        if (typeof styleValue === 'number') {
	          newCurrentStyle[key] = styleValue;
	          newCurrentVelocity[key] = 0;
	          newLastIdealStyle[key] = styleValue;
	          newLastIdealVelocity[key] = 0;
	        } else {
	          var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
	          var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
	          for (var i = 0; i < framesToCatchUp; i++) {
	            var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            newLastIdealStyleValue = _stepper[0];
	            newLastIdealVelocityValue = _stepper[1];
	          }
	
	          var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	          var nextIdealX = _stepper2[0];
	          var nextIdealV = _stepper2[1];
	
	          newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	          newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	          newLastIdealStyle[key] = newLastIdealStyleValue;
	          newLastIdealVelocity[key] = newLastIdealVelocityValue;
	        }
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyle: newCurrentStyle,
	        currentVelocity: newCurrentVelocity,
	        lastIdealStyle: newLastIdealStyle,
	        lastIdealVelocity: newLastIdealVelocity
	      });
	
	      _this.unreadPropStyle = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyle != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyle);
	    }
	
	    this.unreadPropStyle = props.style;
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var renderedChildren = this.props.children(this.state.currentStyle);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = Motion;
	module.exports = exports['default'];

/***/ },

/***/ 958:
/***/ function(module, exports) {

	
	
	// currently used to initiate the velocity style object to 0
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mapToZero;
	
	function mapToZero(obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      ret[key] = 0;
	    }
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 959:
/***/ function(module, exports) {

	
	// turn {x: {val: 1, stiffness: 1, damping: 2}, y: 2} generated by
	// `{x: spring(1, {stiffness: 1, damping: 2}), y: 2}` into {x: 1, y: 2}
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = stripStyle;
	
	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!Object.prototype.hasOwnProperty.call(style, key)) {
	      continue;
	    }
	    ret[key] = typeof style[key] === 'number' ? style[key] : style[key].val;
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 960:
/***/ function(module, exports) {

	
	
	// stepper is used a lot. Saves allocation to return the same array wrapper.
	// This is fine and danger-free against mutations because the callsite
	// immediately destructures it and gets the numbers inside without passing the
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = stepper;
	
	var reusedTuple = [0, 0];
	
	function stepper(secondPerFrame, x, v, destX, k, b, precision) {
	  // Spring stiffness, in kg / s^2
	
	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);
	
	  // Damping, in kg / s
	  var Fdamper = -b * v;
	
	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;
	
	  var newV = v + a * secondPerFrame;
	  var newX = x + newV * secondPerFrame;
	
	  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
	    reusedTuple[0] = destX;
	    reusedTuple[1] = 0;
	    return reusedTuple;
	  }
	
	  reusedTuple[0] = newX;
	  reusedTuple[1] = newV;
	  return reusedTuple;
	}
	
	module.exports = exports["default"];
	// array reference around.

/***/ },

/***/ 961:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },

/***/ 962:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(961)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]
	
	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 963:
/***/ function(module, exports) {

	
	
	// usage assumption: currentStyle values have already been rendered but it says
	// nothing of whether currentStyle is stale (see unreadPropStyle)
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shouldStopAnimation;
	
	function shouldStopAnimation(currentStyle, style, currentVelocity) {
	  for (var key in style) {
	    if (!Object.prototype.hasOwnProperty.call(style, key)) {
	      continue;
	    }
	
	    if (currentVelocity[key] !== 0) {
	      return false;
	    }
	
	    var styleValue = typeof style[key] === 'number' ? style[key] : style[key].val;
	    // stepper will have already taken care of rounding precision errors, so
	    // won't have such thing as 0.9999 !=== 1
	    if (currentStyle[key] !== styleValue) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 964:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(958);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(959);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(960);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _performanceNow = __webpack_require__(961);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(962);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(963);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
	  for (var i = 0; i < currentStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], styles[i], currentVelocities[i])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	var StaggeredMotion = _react2['default'].createClass({
	  displayName: 'StaggeredMotion',
	
	  propTypes: {
	    // TOOD: warn against putting a config in here
	    defaultStyles: _react.PropTypes.arrayOf(_react.PropTypes.objectOf(_react.PropTypes.number)),
	    styles: _react.PropTypes.func.isRequired,
	    children: _react.PropTypes.func.isRequired
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;
	
	    var currentStyles = defaultStyles || styles().map(_stripStyle2['default']);
	    var currentVelocities = currentStyles.map(function (currentStyle) {
	      return _mapToZero2['default'](currentStyle);
	    });
	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: currentStyles,
	      lastIdealVelocities: currentVelocities
	    };
	  },
	
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyles: null,
	  // after checking for unreadPropStyles != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(unreadPropStyles) {
	    var _state = this.state;
	    var currentStyles = _state.currentStyles;
	    var currentVelocities = _state.currentVelocities;
	    var lastIdealStyles = _state.lastIdealStyles;
	    var lastIdealVelocities = _state.lastIdealVelocities;
	
	    var someDirty = false;
	    for (var i = 0; i < unreadPropStyles.length; i++) {
	      var unreadPropStyle = unreadPropStyles[i];
	      var dirty = false;
	
	      for (var key in unreadPropStyle) {
	        if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
	          continue;
	        }
	
	        var styleValue = unreadPropStyle[key];
	        if (typeof styleValue === 'number') {
	          if (!dirty) {
	            dirty = true;
	            someDirty = true;
	            currentStyles[i] = _extends({}, currentStyles[i]);
	            currentVelocities[i] = _extends({}, currentVelocities[i]);
	            lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	            lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	          }
	          currentStyles[i][key] = styleValue;
	          currentVelocities[i][key] = 0;
	          lastIdealStyles[i][key] = styleValue;
	          lastIdealVelocities[i][key] = 0;
	        }
	      }
	    }
	
	    if (someDirty) {
	      this.setState({ currentStyles: currentStyles, currentVelocities: currentVelocities, lastIdealStyles: lastIdealStyles, lastIdealVelocities: lastIdealVelocities });
	    }
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function (timestamp) {
	      var destStyles = _this.props.styles(_this.state.lastIdealStyles);
	
	      // check if we need to animate in the first place
	      if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      var currentTime = timestamp || _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var newLastIdealStyles = [];
	      var newLastIdealVelocities = [];
	      var newCurrentStyles = [];
	      var newCurrentVelocities = [];
	
	      for (var i = 0; i < destStyles.length; i++) {
	        var destStyle = destStyles[i];
	        var newCurrentStyle = {};
	        var newCurrentVelocity = {};
	        var newLastIdealStyle = {};
	        var newLastIdealVelocity = {};
	
	        for (var key in destStyle) {
	          if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
	            continue;
	          }
	
	          var styleValue = destStyle[key];
	          if (typeof styleValue === 'number') {
	            newCurrentStyle[key] = styleValue;
	            newCurrentVelocity[key] = 0;
	            newLastIdealStyle[key] = styleValue;
	            newLastIdealVelocity[key] = 0;
	          } else {
	            var newLastIdealStyleValue = _this.state.lastIdealStyles[i][key];
	            var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i][key];
	            for (var j = 0; j < framesToCatchUp; j++) {
	              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	              newLastIdealStyleValue = _stepper[0];
	              newLastIdealVelocityValue = _stepper[1];
	            }
	
	            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            var nextIdealX = _stepper2[0];
	            var nextIdealV = _stepper2[1];
	
	            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	            newLastIdealStyle[key] = newLastIdealStyleValue;
	            newLastIdealVelocity[key] = newLastIdealVelocityValue;
	          }
	        }
	
	        newCurrentStyles[i] = newCurrentStyle;
	        newCurrentVelocities[i] = newCurrentVelocity;
	        newLastIdealStyles[i] = newLastIdealStyle;
	        newLastIdealVelocities[i] = newLastIdealVelocity;
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities,
	        lastIdealStyles: newLastIdealStyles,
	        lastIdealVelocities: newLastIdealVelocities
	      });
	
	      _this.unreadPropStyles = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }
	
	    this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var renderedChildren = this.props.children(this.state.currentStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = StaggeredMotion;
	module.exports = exports['default'];

/***/ },

/***/ 965:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapToZero = __webpack_require__(958);
	
	var _mapToZero2 = _interopRequireDefault(_mapToZero);
	
	var _stripStyle = __webpack_require__(959);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var _stepper3 = __webpack_require__(960);
	
	var _stepper4 = _interopRequireDefault(_stepper3);
	
	var _mergeDiff = __webpack_require__(966);
	
	var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
	
	var _performanceNow = __webpack_require__(961);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(962);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _shouldStopAnimation = __webpack_require__(963);
	
	var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var msPerFrame = 1000 / 60;
	
	// the children function & (potential) styles function asks as param an
	// Array<TransitionPlainStyle>, where each TransitionPlainStyle is of the format
	// {key: string, data?: any, style: PlainStyle}. However, the way we keep
	// internal states doesn't contain such a data structure (check the state and
	// TransitionMotionState). So when children function and others ask for such
	// data we need to generate them on the fly by combining mergedPropsStyles and
	// currentStyles/lastIdealStyles
	function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
	  // Copy the value to a `const` so that Flow understands that the const won't
	  // change and will be non-nullable in the callback below.
	  var cUnreadPropStyles = unreadPropStyles;
	  if (cUnreadPropStyles == null) {
	    return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	      return {
	        key: mergedPropsStyle.key,
	        data: mergedPropsStyle.data,
	        style: plainStyles[i]
	      };
	    });
	  }
	  return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	    for (var j = 0; j < cUnreadPropStyles.length; j++) {
	      if (cUnreadPropStyles[j].key === mergedPropsStyle.key) {
	        return {
	          key: cUnreadPropStyles[j].key,
	          data: cUnreadPropStyles[j].data,
	          style: plainStyles[i]
	        };
	      }
	    }
	    return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i] };
	  });
	}
	
	function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
	  if (mergedPropsStyles.length !== destStyles.length) {
	    return false;
	  }
	
	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (mergedPropsStyles[i].key !== destStyles[i].key) {
	      return false;
	    }
	  }
	
	  // we have the invariant that mergedPropsStyles and
	  // currentStyles/currentVelocities/last* are synced in terms of cells, see
	  // mergeAndSync comment for more info
	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], destStyles[i].style, currentVelocities[i])) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	// core key merging logic
	
	// things to do: say previously merged style is {a, b}, dest style (prop) is {b,
	// c}, previous current (interpolating) style is {a, b}
	// **invariant**: current[i] corresponds to merged[i] in terms of key
	
	// steps:
	// turn merged style into {a?, b, c}
	//    add c, value of c is destStyles.c
	//    maybe remove a, aka call willLeave(a), then merged is either {b, c} or {a, b, c}
	// turn current (interpolating) style from {a, b} into {a?, b, c}
	//    maybe remove a
	//    certainly add c, value of c is willEnter(c)
	// loop over merged and construct new current
	// dest doesn't change, that's owner's
	function mergeAndSync(willEnter, willLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
	  var newMergedPropsStyles = _mergeDiff2['default'](oldMergedPropsStyles, destStyles, function (oldIndex, oldMergedPropsStyle) {
	    var leavingStyle = willLeave(oldMergedPropsStyle);
	    if (leavingStyle == null) {
	      return null;
	    }
	    if (_shouldStopAnimation2['default'](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
	      return null;
	    }
	    return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
	  });
	
	  var newCurrentStyles = [];
	  var newCurrentVelocities = [];
	  var newLastIdealStyles = [];
	  var newLastIdealVelocities = [];
	  for (var i = 0; i < newMergedPropsStyles.length; i++) {
	    var newMergedPropsStyleCell = newMergedPropsStyles[i];
	    var foundOldIndex = null;
	    for (var j = 0; j < oldMergedPropsStyles.length; j++) {
	      if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
	        foundOldIndex = j;
	        break;
	      }
	    }
	    // TODO: key search code
	    if (foundOldIndex == null) {
	      var plainStyle = willEnter(newMergedPropsStyleCell);
	      newCurrentStyles[i] = plainStyle;
	      newLastIdealStyles[i] = plainStyle;
	
	      var velocity = _mapToZero2['default'](newMergedPropsStyleCell.style);
	      newCurrentVelocities[i] = velocity;
	      newLastIdealVelocities[i] = velocity;
	    } else {
	      newCurrentStyles[i] = oldCurrentStyles[foundOldIndex];
	      newLastIdealStyles[i] = oldLastIdealStyles[foundOldIndex];
	      newCurrentVelocities[i] = oldCurrentVelocities[foundOldIndex];
	      newLastIdealVelocities[i] = oldLastIdealVelocities[foundOldIndex];
	    }
	  }
	
	  return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
	}
	
	var TransitionMotion = _react2['default'].createClass({
	  displayName: 'TransitionMotion',
	
	  propTypes: {
	    defaultStyles: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      key: _react.PropTypes.string.isRequired,
	      data: _react.PropTypes.any,
	      style: _react.PropTypes.objectOf(_react.PropTypes.number).isRequired
	    })),
	    styles: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      key: _react.PropTypes.string.isRequired,
	      data: _react.PropTypes.any,
	      style: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object])).isRequired
	    }))]).isRequired,
	    children: _react.PropTypes.func.isRequired,
	    willLeave: _react.PropTypes.func,
	    willEnter: _react.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      willEnter: function willEnter(styleThatEntered) {
	        return _stripStyle2['default'](styleThatEntered.style);
	      },
	      // recall: returning null makes the current unmounting TransitionStyle
	      // disappear immediately
	      willLeave: function willLeave() {
	        return null;
	      }
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;
	    var willEnter = _props.willEnter;
	    var willLeave = _props.willLeave;
	
	    var destStyles = typeof styles === 'function' ? styles(defaultStyles) : styles;
	
	    // this is special. for the first time around, we don't have a comparison
	    // between last (no last) and current merged props. we'll compute last so:
	    // say default is {a, b} and styles (dest style) is {b, c}, we'll
	    // fabricate last as {a, b}
	    var oldMergedPropsStyles = undefined;
	    if (defaultStyles == null) {
	      oldMergedPropsStyles = destStyles;
	    } else {
	      oldMergedPropsStyles = defaultStyles.map(function (defaultStyleCell) {
	        // TODO: key search code
	        for (var i = 0; i < destStyles.length; i++) {
	          if (destStyles[i].key === defaultStyleCell.key) {
	            return destStyles[i];
	          }
	        }
	        return defaultStyleCell;
	      });
	    }
	    var oldCurrentStyles = defaultStyles == null ? destStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    });
	    var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    });
	
	    var _mergeAndSync = mergeAndSync(
	    // Because this is an old-style React.createClass component, Flow doesn't
	    // understand that the willEnter and willLeave props have default values
	    // and will always be present.
	    willEnter, willLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, // oldLastIdealStyles really
	    oldCurrentVelocities);
	
	    var mergedPropsStyles = _mergeAndSync[0];
	    var currentStyles = _mergeAndSync[1];
	    var currentVelocities = _mergeAndSync[2];
	    var lastIdealStyles = _mergeAndSync[3];
	    var lastIdealVelocities = _mergeAndSync[4];
	    // oldLastIdealVelocities really
	
	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: lastIdealStyles,
	      lastIdealVelocities: lastIdealVelocities,
	      mergedPropsStyles: mergedPropsStyles
	    };
	  },
	
	  unmounting: false,
	  animationID: null,
	  prevTime: 0,
	  accumulatedTime: 0,
	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400
	  unreadPropStyles: null,
	  // after checking for unreadPropStyles != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)
	  clearUnreadPropStyle: function clearUnreadPropStyle(unreadPropStyles) {
	    var _mergeAndSync2 = mergeAndSync(this.props.willEnter, this.props.willLeave, this.state.mergedPropsStyles, unreadPropStyles, this.state.currentStyles, this.state.currentVelocities, this.state.lastIdealStyles, this.state.lastIdealVelocities);
	
	    var mergedPropsStyles = _mergeAndSync2[0];
	    var currentStyles = _mergeAndSync2[1];
	    var currentVelocities = _mergeAndSync2[2];
	    var lastIdealStyles = _mergeAndSync2[3];
	    var lastIdealVelocities = _mergeAndSync2[4];
	
	    for (var i = 0; i < unreadPropStyles.length; i++) {
	      var unreadPropStyle = unreadPropStyles[i].style;
	      var dirty = false;
	
	      for (var key in unreadPropStyle) {
	        if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
	          continue;
	        }
	
	        var styleValue = unreadPropStyle[key];
	        if (typeof styleValue === 'number') {
	          if (!dirty) {
	            dirty = true;
	            currentStyles[i] = _extends({}, currentStyles[i]);
	            currentVelocities[i] = _extends({}, currentVelocities[i]);
	            lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	            lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	            mergedPropsStyles[i] = {
	              key: mergedPropsStyles[i].key,
	              data: mergedPropsStyles[i].data,
	              style: _extends({}, mergedPropsStyles[i].style)
	            };
	          }
	          currentStyles[i][key] = styleValue;
	          currentVelocities[i][key] = 0;
	          lastIdealStyles[i][key] = styleValue;
	          lastIdealVelocities[i][key] = 0;
	          mergedPropsStyles[i].style[key] = styleValue;
	        }
	      }
	    }
	
	    // unlike the other 2 components, we can't detect staleness and optionally
	    // opt out of setState here. each style object's data might contain new
	    // stuff we're not/cannot compare
	    this.setState({
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      mergedPropsStyles: mergedPropsStyles,
	      lastIdealStyles: lastIdealStyles,
	      lastIdealVelocities: lastIdealVelocities
	    });
	  },
	
	  startAnimationIfNecessary: function startAnimationIfNecessary() {
	    var _this = this;
	
	    if (this.unmounting) {
	      return;
	    }
	    // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	    // call cb? No, otherwise accidental parent rerender causes cb trigger
	    this.animationID = _raf2['default'](function (timestamp) {
	      var propStyles = _this.props.styles;
	      var destStyles = typeof propStyles === 'function' ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;
	
	      // check if we need to animate in the first place
	      if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.accumulatedTime = 0;
	        return;
	      }
	
	      var currentTime = timestamp || _performanceNow2['default']();
	      var timeDelta = currentTime - _this.prevTime;
	      _this.prevTime = currentTime;
	      _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	      // more than 10 frames? prolly switched browser tab. Restart
	      if (_this.accumulatedTime > msPerFrame * 10) {
	        _this.accumulatedTime = 0;
	      }
	
	      if (_this.accumulatedTime === 0) {
	        // no need to cancel animationID here; shouldn't have any in flight
	        _this.animationID = null;
	        _this.startAnimationIfNecessary();
	        return;
	      }
	
	      var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	      var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
	
	      var _mergeAndSync3 = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);
	
	      var newMergedPropsStyles = _mergeAndSync3[0];
	      var newCurrentStyles = _mergeAndSync3[1];
	      var newCurrentVelocities = _mergeAndSync3[2];
	      var newLastIdealStyles = _mergeAndSync3[3];
	      var newLastIdealVelocities = _mergeAndSync3[4];
	
	      for (var i = 0; i < newMergedPropsStyles.length; i++) {
	        var newMergedPropsStyle = newMergedPropsStyles[i].style;
	        var newCurrentStyle = {};
	        var newCurrentVelocity = {};
	        var newLastIdealStyle = {};
	        var newLastIdealVelocity = {};
	
	        for (var key in newMergedPropsStyle) {
	          if (!Object.prototype.hasOwnProperty.call(newMergedPropsStyle, key)) {
	            continue;
	          }
	
	          var styleValue = newMergedPropsStyle[key];
	          if (typeof styleValue === 'number') {
	            newCurrentStyle[key] = styleValue;
	            newCurrentVelocity[key] = 0;
	            newLastIdealStyle[key] = styleValue;
	            newLastIdealVelocity[key] = 0;
	          } else {
	            var newLastIdealStyleValue = newLastIdealStyles[i][key];
	            var newLastIdealVelocityValue = newLastIdealVelocities[i][key];
	            for (var j = 0; j < framesToCatchUp; j++) {
	              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	              newLastIdealStyleValue = _stepper[0];
	              newLastIdealVelocityValue = _stepper[1];
	            }
	
	            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
	
	            var nextIdealX = _stepper2[0];
	            var nextIdealV = _stepper2[1];
	
	            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	            newLastIdealStyle[key] = newLastIdealStyleValue;
	            newLastIdealVelocity[key] = newLastIdealVelocityValue;
	          }
	        }
	
	        newLastIdealStyles[i] = newLastIdealStyle;
	        newLastIdealVelocities[i] = newLastIdealVelocity;
	        newCurrentStyles[i] = newCurrentStyle;
	        newCurrentVelocities[i] = newCurrentVelocity;
	      }
	
	      _this.animationID = null;
	      // the amount we're looped over above
	      _this.accumulatedTime -= framesToCatchUp * msPerFrame;
	
	      _this.setState({
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities,
	        lastIdealStyles: newLastIdealStyles,
	        lastIdealVelocities: newLastIdealVelocities,
	        mergedPropsStyles: newMergedPropsStyles
	      });
	
	      _this.unreadPropStyles = null;
	
	      _this.startAnimationIfNecessary();
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }
	
	    var styles = props.styles;
	    if (typeof styles === 'function') {
	      this.unreadPropStyles = styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
	    } else {
	      this.unreadPropStyles = styles;
	    }
	
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.unmounting = true;
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  },
	
	  render: function render() {
	    var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
	    var renderedChildren = this.props.children(hydratedStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  }
	});
	
	exports['default'] = TransitionMotion;
	module.exports = exports['default'];
	
	// list of styles, each containing interpolating values. Part of what's passed
	// to children function. Notice that this is
	// Array<ActualInterpolatingStyleObject>, without the wrapper that is {key: ...,
	// data: ... style: ActualInterpolatingStyleObject}. Only mergedPropsStyles
	// contains the key & data info (so that we only have a single source of truth
	// for these, and to save space). Check the comment for `rehydrateStyles` to
	// see how we regenerate the entirety of what's passed to children function
	
	// the array that keeps track of currently rendered stuff! Including stuff
	// that you've unmounted but that's still animating. This is where it lives

/***/ },

/***/ 966:
/***/ function(module, exports) {

	
	
	// core keys merging algorithm. If previous render's keys are [a, b], and the
	// next render's [c, b, d], what's the final merged keys and ordering?
	
	// - c and a must both be before b
	// - b before d
	// - ordering between a and c ambiguous
	
	// this reduces to merging two partially ordered lists (e.g. lists where not
	// every item has a definite ordering, like comparing a and c above). For the
	// ambiguous ordering we deterministically choose to place the next render's
	// item after the previous'; so c after a
	
	// this is called a topological sorting. Except the existing algorithms don't
	// work well with js bc of the amount of allocation, and isn't optimized for our
	// current use-case bc the runtime is linear in terms of edges (see wiki for
	// meaning), which is huge when two lists have many common elements
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mergeDiff;
	
	function mergeDiff(prev, next, onRemove) {
	  // bookkeeping for easier access of a key's index below. This is 2 allocations +
	  // potentially triggering chrome hash map mode for objs (so it might be faster
	
	  var prevKeyIndex = {};
	  for (var i = 0; i < prev.length; i++) {
	    prevKeyIndex[prev[i].key] = i;
	  }
	  var nextKeyIndex = {};
	  for (var i = 0; i < next.length; i++) {
	    nextKeyIndex[next[i].key] = i;
	  }
	
	  // first, an overly elaborate way of merging prev and next, eliminating
	  // duplicates (in terms of keys). If there's dupe, keep the item in next).
	  // This way of writing it saves allocations
	  var ret = [];
	  for (var i = 0; i < next.length; i++) {
	    ret[i] = next[i];
	  }
	  for (var i = 0; i < prev.length; i++) {
	    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
	      // this is called my TM's `mergeAndSync`, which calls willLeave. We don't
	      // merge in keys that the user desires to kill
	      var fill = onRemove(i, prev[i]);
	      if (fill != null) {
	        ret.push(fill);
	      }
	    }
	  }
	
	  // now all the items all present. Core sorting logic to have the right order
	  return ret.sort(function (a, b) {
	    var nextOrderA = nextKeyIndex[a.key];
	    var nextOrderB = nextKeyIndex[b.key];
	    var prevOrderA = prevKeyIndex[a.key];
	    var prevOrderB = prevKeyIndex[b.key];
	
	    if (nextOrderA != null && nextOrderB != null) {
	      // both keys in next
	      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
	    } else if (prevOrderA != null && prevOrderB != null) {
	      // both keys in prev
	      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
	    } else if (nextOrderA != null) {
	      // key a in next, key b in prev
	
	      // how to determine the order between a and b? We find a "pivot" (term
	      // abuse), a key present in both prev and next, that is sandwiched between
	      // a and b. In the context of our above example, if we're comparing a and
	      // d, b's (the only) pivot
	      for (var i = 0; i < next.length; i++) {
	        var pivot = next[i].key;
	        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
	          continue;
	        }
	
	        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
	          return -1;
	        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
	          return 1;
	        }
	      }
	      // pluggable. default to: next bigger than prev
	      return 1;
	    }
	    // prevOrderA, nextOrderB
	    for (var i = 0; i < next.length; i++) {
	      var pivot = next[i].key;
	      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
	        continue;
	      }
	      if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
	        return 1;
	      } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
	        return -1;
	      }
	    }
	    // pluggable. default to: next bigger than prev
	    return -1;
	  });
	}
	
	module.exports = exports['default'];
	// to loop through and find a key's index each time), but I no longer care

/***/ },

/***/ 967:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = spring;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _presets = __webpack_require__(968);
	
	var _presets2 = _interopRequireDefault(_presets);
	
	var defaultConfig = _extends({}, _presets2['default'].noWobble, {
	  precision: 0.01
	});
	
	function spring(val, config) {
	  return _extends({}, defaultConfig, config, { val: val });
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 968:
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
	  gentle: { stiffness: 120, damping: 14 },
	  wobbly: { stiffness: 180, damping: 12 },
	  stiff: { stiffness: 210, damping: 20 }
	};
	module.exports = exports["default"];

/***/ },

/***/ 969:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = reorderKeys;
	
	var hasWarned = false;
	
	function reorderKeys() {
	  if (true) {
	    if (!hasWarned) {
	      hasWarned = true;
	      console.error('`reorderKeys` has been removed, since it is no longer needed for TransitionMotion\'s new styles array API.');
	    }
	  }
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 970:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak
	
	var RESISTANCE_COEF = exports.RESISTANCE_COEF = 0.6;
	
	// This value is closed to what browsers are using internally to
	// trigger a native scroll.
	var UNCERTAINTY_THRESHOLD = exports.UNCERTAINTY_THRESHOLD = 3; // px

/***/ },

/***/ 971:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _warning = __webpack_require__(217);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable flowtype/require-valid-file-annotation */
	
	var checkIndexBounds = function checkIndexBounds(props) {
	  var index = props.index;
	  var children = props.children;
	
	
	  var childrenCount = _react.Children.count(children);
	
	   true ? (0, _warning2.default)(index >= 0 && index <= childrenCount, 'react-swipeable-view: the new index: ' + index + ' is out of bounds: [0-' + childrenCount + '].') : void 0;
	};
	
	exports.default = checkIndexBounds;

/***/ },

/***/ 972:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = computeIndex;
	
	var _react = __webpack_require__(24);
	
	var _constant = __webpack_require__(970);
	
	//  weak
	
	function computeIndex(params) {
	  var children = params.children;
	  var indexLatest = params.indexLatest;
	  var startX = params.startX;
	  var pageX = params.pageX;
	  var viewLength = params.viewLength;
	  var resistance = params.resistance;
	
	
	  var indexMax = _react.Children.count(children) - 1;
	  var index = indexLatest + (startX - pageX) / viewLength;
	  var newStartX = void 0;
	
	  if (!resistance) {
	    // Reset the starting point
	    if (index < 0) {
	      index = 0;
	      newStartX = (index - indexLatest) * viewLength + pageX;
	    } else if (index > indexMax) {
	      index = indexMax;
	      newStartX = (index - indexLatest) * viewLength + pageX;
	    }
	  } else {
	    if (index < 0) {
	      index = Math.exp(index * _constant.RESISTANCE_COEF) - 1;
	    } else if (index > indexMax) {
	      index = indexMax + 1 - Math.exp((indexMax - index) * _constant.RESISTANCE_COEF);
	    }
	  }
	
	  return {
	    index: index,
	    startX: newStartX
	  };
	}

/***/ },

/***/ 973:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  weak
	
	var getDisplaySameSlide = function getDisplaySameSlide(props, nextProps) {
	  var displaySameSlide = false;
	
	  if (props.children.length && nextProps.children.length) {
	    var oldKey = props.children[props.index].key;
	
	    if (oldKey !== null) {
	      var newKey = nextProps.children[nextProps.index].key;
	
	      if (oldKey === newKey) {
	        displaySameSlide = true;
	      }
	    }
	  }
	
	  return displaySameSlide;
	};
	
	exports.default = getDisplaySameSlide;

/***/ },

/***/ 974:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSwipeableViews = __webpack_require__(954);
	
	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);
	
	var _reduxForm = __webpack_require__(299);
	
	var _TextField = __webpack_require__(741);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _RadioButton = __webpack_require__(975);
	
	var _Checkbox = __webpack_require__(981);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	var _SelectField = __webpack_require__(747);
	
	var _SelectField2 = _interopRequireDefault(_SelectField);
	
	var _MenuItem = __webpack_require__(636);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _FlatButton = __webpack_require__(638);
	
	var _FlatButton2 = _interopRequireDefault(_FlatButton);
	
	var _Card = __webpack_require__(985);
	
	var _Divider = __webpack_require__(729);
	
	var _Divider2 = _interopRequireDefault(_Divider);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	var _colors = __webpack_require__(655);
	
	var _Tabs = __webpack_require__(642);
	
	var _playArrow = __webpack_require__(995);
	
	var _playArrow2 = _interopRequireDefault(_playArrow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	  largeIcon: {
	    width: 72,
	    height: 72
	  }
	};
	
	var validate = function validate(values) {
	  var errors = {};
	  var requiredFields = ['email', 'password'];
	  requiredFields.forEach(function (field) {
	    if (!values[field]) {
	      errors[field] = 'Required';
	    }
	  });
	  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address';
	  }
	  return errors;
	};
	
	var renderTextField = function renderTextField(_ref) {
	  var input = _ref.input;
	  var label = _ref.label;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  var custom = (0, _objectWithoutProperties3.default)(_ref, ['input', 'label', 'meta']);
	  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
	    fullWidth: true,
	    floatingLabelText: label,
	    errorText: touched && error
	  }, input, custom));
	};
	
	var LoginForm = function LoginForm(props) {
	  var handleSubmit = props.handleSubmit;
	  var pristine = props.pristine;
	  var reset = props.reset;
	  var submitting = props.submitting;
	
	  return _react2.default.createElement(
	    'form',
	    { onSubmit: handleSubmit },
	    _react2.default.createElement(_reduxForm.Field, { name: 'email', component: renderTextField, label: 'Email' }),
	    _react2.default.createElement(_reduxForm.Field, { name: 'password', type: 'password', component: renderTextField, label: 'Password' }),
	    _react2.default.createElement(_FlatButton2.default, {
	      type: 'Submit',
	      backgroundColor: '#a4c639',
	      hoverColor: '#8AA62F',
	      fullWidth: true,
	      style: { marginTop: '12', height: '100px', width: '100%', borderRadius: '0px' },
	      buttonStyle: { height: '100px' },
	      icon: _react2.default.createElement(_playArrow2.default, { color: _colors.grey50, style: styles.largeIcon })
	    })
	  );
	};
	
	exports.default = (0, _reduxForm.reduxForm)({
	  form: 'LoginForm',
	  validate: validate
	})(LoginForm);

/***/ },

/***/ 975:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.RadioButtonGroup = exports.RadioButton = undefined;
	
	var _RadioButton2 = __webpack_require__(976);
	
	var _RadioButton3 = _interopRequireDefault(_RadioButton2);
	
	var _RadioButtonGroup2 = __webpack_require__(980);
	
	var _RadioButtonGroup3 = _interopRequireDefault(_RadioButtonGroup2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.RadioButton = _RadioButton3.default;
	exports.RadioButtonGroup = _RadioButtonGroup3.default;
	exports.default = _RadioButton3.default;

/***/ },

/***/ 976:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _EnhancedSwitch = __webpack_require__(977);
	
	var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);
	
	var _radioButtonUnchecked = __webpack_require__(978);
	
	var _radioButtonUnchecked2 = _interopRequireDefault(_radioButtonUnchecked);
	
	var _radioButtonChecked = __webpack_require__(979);
	
	var _radioButtonChecked2 = _interopRequireDefault(_radioButtonChecked);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var radioButton = context.muiTheme.radioButton;
	
	
	  return {
	    icon: {
	      height: radioButton.size,
	      width: radioButton.size
	    },
	    target: {
	      transition: _transitions2.default.easeOut(),
	      position: 'absolute',
	      opacity: 1,
	      transform: 'scale(1)',
	      fill: radioButton.borderColor
	    },
	    fill: {
	      position: 'absolute',
	      opacity: 1,
	      transform: 'scale(0)',
	      transformOrigin: '50% 50%',
	      transition: _transitions2.default.easeOut(),
	      fill: radioButton.checkedColor
	    },
	    targetWhenChecked: {
	      opacity: 0,
	      transform: 'scale(0)'
	    },
	    fillWhenChecked: {
	      opacity: 1,
	      transform: 'scale(1)'
	    },
	    targetWhenDisabled: {
	      fill: radioButton.disabledColor,
	      cursor: 'not-allowed'
	    },
	    fillWhenDisabled: {
	      fill: radioButton.disabledColor,
	      cursor: 'not-allowed'
	    },
	    label: {
	      color: props.disabled ? radioButton.labelDisabledColor : radioButton.labelColor
	    },
	    ripple: {
	      color: props.checked ? radioButton.checkedColor : radioButton.borderColor
	    }
	  };
	}
	
	var RadioButton = function (_Component) {
	  (0, _inherits3.default)(RadioButton, _Component);
	
	  function RadioButton() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, RadioButton);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButton.__proto__ || (0, _getPrototypeOf2.default)(RadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleSwitch = function (event) {
	      if (_this.props.onCheck) {
	        _this.props.onCheck(event, _this.props.value);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  // Only called when selected, not when unselected.
	
	
	  (0, _createClass3.default)(RadioButton, [{
	    key: 'isChecked',
	    value: function isChecked() {
	      return this.refs.enhancedSwitch.isSwitched();
	    }
	
	    // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a
	    // RadioButton's checked value.
	
	  }, {
	    key: 'setChecked',
	    value: function setChecked(newCheckedValue) {
	      this.refs.enhancedSwitch.setSwitched(newCheckedValue);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.refs.enhancedSwitch.getValue();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var checkedIcon = _props.checkedIcon;
	      var checked = _props.checked;
	      var iconStyle = _props.iconStyle;
	      var labelStyle = _props.labelStyle;
	      var labelPosition = _props.labelPosition;
	      var onCheck = _props.onCheck;
	      var uncheckedIcon = _props.uncheckedIcon;
	      var disabled = _props.disabled;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['checkedIcon', 'checked', 'iconStyle', 'labelStyle', 'labelPosition', 'onCheck', 'uncheckedIcon', 'disabled']);
	
	
	      var styles = getStyles(this.props, this.context);
	
	      var uncheckedStyles = (0, _simpleAssign2.default)(styles.target, checked && styles.targetWhenChecked, iconStyle, disabled && styles.targetWhenDisabled);
	
	      var checkedStyles = (0, _simpleAssign2.default)(styles.fill, checked && styles.fillWhenChecked, iconStyle, disabled && styles.fillWhenDisabled);
	
	      var uncheckedElement = _react2.default.isValidElement(uncheckedIcon) ? _react2.default.cloneElement(uncheckedIcon, {
	        style: (0, _simpleAssign2.default)(uncheckedStyles, uncheckedIcon.props.style)
	      }) : _react2.default.createElement(_radioButtonUnchecked2.default, { style: uncheckedStyles });
	
	      var checkedElement = _react2.default.isValidElement(checkedIcon) ? _react2.default.cloneElement(checkedIcon, {
	        style: (0, _simpleAssign2.default)(checkedStyles, checkedIcon.props.style)
	      }) : _react2.default.createElement(_radioButtonChecked2.default, { style: checkedStyles });
	
	      var mergedIconStyle = (0, _simpleAssign2.default)(styles.icon, iconStyle);
	      var mergedLabelStyle = (0, _simpleAssign2.default)(styles.label, labelStyle);
	
	      return _react2.default.createElement(_EnhancedSwitch2.default, (0, _extends3.default)({}, other, {
	        ref: 'enhancedSwitch',
	        inputType: 'radio',
	        checked: checked,
	        switched: checked,
	        disabled: disabled,
	        rippleColor: styles.ripple.color,
	        iconStyle: mergedIconStyle,
	        labelStyle: mergedLabelStyle,
	        labelPosition: labelPosition,
	        onSwitch: this.handleSwitch,
	        switchElement: _react2.default.createElement(
	          'div',
	          null,
	          uncheckedElement,
	          checkedElement
	        )
	      }));
	    }
	  }]);
	  return RadioButton;
	}(_react.Component);
	
	RadioButton.defaultProps = {
	  checked: false,
	  disabled: false,
	  labelPosition: 'right'
	};
	RadioButton.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? RadioButton.propTypes = {
	  /**
	   * @ignore
	   * checked if true
	   * Used internally by `RadioButtonGroup`.
	   */
	  checked: _react.PropTypes.bool,
	  /**
	   * The icon element to show when the radio button is checked.
	   */
	  checkedIcon: _react.PropTypes.element,
	  /**
	   * If true, the radio button is disabled.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the icon element.
	   */
	  iconStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the input element.
	   */
	  inputStyle: _react.PropTypes.object,
	  /**
	   * @ignore
	   * Used internally by `RadioButtonGroup`. Use the `labelPosition` property of `RadioButtonGroup` instead.
	   * Where the label will be placed next to the radio button.
	   */
	  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
	  /**
	   * Override the inline-styles of the label element.
	   */
	  labelStyle: _react.PropTypes.object,
	  /**
	   * @ignore
	   * Callback function fired when the radio button is checked. Note that this
	   * function will not be called if the radio button is part of a
	   * radio button group: in this case, use the `onChange` property of
	   * `RadioButtonGroup`.
	   *
	   * @param {object} event `change` event targeting the element.
	   * @param {string} value The element's `value`.
	   */
	  onCheck: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The icon element to show when the radio button is unchecked.
	   */
	  uncheckedIcon: _react.PropTypes.element,
	  /**
	   * The value of the radio button.
	   */
	  value: _react.PropTypes.any
	} : void 0;
	exports.default = RadioButton;

/***/ },

/***/ 977:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactEventListener = __webpack_require__(621);
	
	var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
	
	var _keycode = __webpack_require__(571);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _FocusRipple = __webpack_require__(572);
	
	var _FocusRipple2 = _interopRequireDefault(_FocusRipple);
	
	var _TouchRipple = __webpack_require__(581);
	
	var _TouchRipple2 = _interopRequireDefault(_TouchRipple);
	
	var _Paper = __webpack_require__(610);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _warning = __webpack_require__(217);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var baseTheme = context.muiTheme.baseTheme;
	
	
	  return {
	    root: {
	      position: 'relative',
	      cursor: props.disabled ? 'default' : 'pointer',
	      overflow: 'visible',
	      display: 'table',
	      height: 'auto',
	      width: '100%'
	    },
	    input: {
	      position: 'absolute',
	      cursor: props.disabled ? 'default' : 'pointer',
	      pointerEvents: 'all',
	      opacity: 0,
	      width: '100%',
	      height: '100%',
	      zIndex: 2,
	      left: 0,
	      boxSizing: 'border-box',
	      padding: 0,
	      margin: 0
	    },
	    controls: {
	      display: 'flex',
	      width: '100%',
	      height: '100%'
	    },
	    label: {
	      float: 'left',
	      position: 'relative',
	      display: 'block',
	      width: 'calc(100% - 60px)',
	      lineHeight: '24px',
	      color: baseTheme.palette.textColor,
	      fontFamily: baseTheme.fontFamily
	    },
	    wrap: {
	      transition: _transitions2.default.easeOut(),
	      float: 'left',
	      position: 'relative',
	      display: 'block',
	      flexShrink: 0,
	      width: 60 - baseTheme.spacing.desktopGutterLess,
	      marginRight: props.labelPosition === 'right' ? baseTheme.spacing.desktopGutterLess : 0,
	      marginLeft: props.labelPosition === 'left' ? baseTheme.spacing.desktopGutterLess : 0
	    },
	    ripple: {
	      color: props.rippleColor || baseTheme.palette.primary1Color,
	      height: '200%',
	      width: '200%',
	      top: -12,
	      left: -12
	    }
	  };
	}
	
	var EnhancedSwitch = function (_Component) {
	  (0, _inherits3.default)(EnhancedSwitch, _Component);
	
	  function EnhancedSwitch() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, EnhancedSwitch);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedSwitch.__proto__ || (0, _getPrototypeOf2.default)(EnhancedSwitch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      isKeyboardFocused: false
	    }, _this.handleChange = function (event) {
	      _this.tabPressed = false;
	      _this.setState({
	        isKeyboardFocused: false
	      });
	
	      var isInputChecked = _this.refs.checkbox.checked;
	
	      if (!_this.props.hasOwnProperty('checked') && _this.props.onParentShouldUpdate) {
	        _this.props.onParentShouldUpdate(isInputChecked);
	      }
	
	      if (_this.props.onSwitch) {
	        _this.props.onSwitch(event, isInputChecked);
	      }
	    }, _this.handleKeyDown = function (event) {
	      var code = (0, _keycode2.default)(event);
	
	      if (code === 'tab') {
	        _this.tabPressed = true;
	      }
	      if (_this.state.isKeyboardFocused && code === 'space') {
	        _this.handleChange(event);
	      }
	    }, _this.handleKeyUp = function (event) {
	      if (_this.state.isKeyboardFocused && (0, _keycode2.default)(event) === 'space') {
	        _this.handleChange(event);
	      }
	    }, _this.handleMouseDown = function (event) {
	      // only listen to left clicks
	      if (event.button === 0) {
	        _this.refs.touchRipple.start(event);
	      }
	    }, _this.handleMouseUp = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleMouseLeave = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleTouchStart = function (event) {
	      _this.refs.touchRipple.start(event);
	    }, _this.handleTouchEnd = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleBlur = function (event) {
	      _this.setState({
	        isKeyboardFocused: false
	      });
	
	      if (_this.props.onBlur) {
	        _this.props.onBlur(event);
	      }
	    }, _this.handleFocus = function (event) {
	      // setTimeout is needed becuase the focus event fires first
	      // Wait so that we can capture if this was a keyboard focus
	      // or touch focus
	      setTimeout(function () {
	        if (_this.tabPressed) {
	          _this.setState({
	            isKeyboardFocused: true
	          });
	        }
	      }, 150);
	
	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(EnhancedSwitch, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var inputNode = this.refs.checkbox;
	      if ((!this.props.switched || inputNode.checked !== this.props.switched) && this.props.onParentShouldUpdate) {
	        this.props.onParentShouldUpdate(inputNode.checked);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var hasCheckedProp = nextProps.hasOwnProperty('checked');
	      var hasToggledProp = nextProps.hasOwnProperty('toggled');
	      var hasNewDefaultProp = nextProps.hasOwnProperty('defaultChecked') && nextProps.defaultChecked !== this.props.defaultChecked;
	
	      if (hasCheckedProp || hasToggledProp || hasNewDefaultProp) {
	        var switched = nextProps.checked || nextProps.toggled || nextProps.defaultChecked || false;
	
	        this.setState({
	          switched: switched
	        });
	
	        if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
	          this.props.onParentShouldUpdate(switched);
	        }
	      }
	    }
	  }, {
	    key: 'isSwitched',
	    value: function isSwitched() {
	      return this.refs.checkbox.checked;
	    }
	
	    // no callback here because there is no event
	
	  }, {
	    key: 'setSwitched',
	    value: function setSwitched(newSwitchedValue) {
	      if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
	        if (this.props.onParentShouldUpdate) {
	          this.props.onParentShouldUpdate(newSwitchedValue);
	        }
	        this.refs.checkbox.checked = newSwitchedValue;
	      } else {
	         true ? (0, _warning2.default)(false, 'Cannot call set method while checked is defined as a property.') : void 0;
	      }
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.refs.checkbox.value;
	    }
	
	    // Checkbox inputs only use SPACE to change their state. Using ENTER will
	    // update the ui but not the input.
	
	
	    /**
	     * Because both the ripples and the checkbox input cannot share pointer
	     * events, the checkbox input takes control of pointer events and calls
	     * ripple animations manually.
	     */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var name = _props.name;
	      var value = _props.value;
	      var iconStyle = _props.iconStyle;
	      var inputStyle = _props.inputStyle;
	      var inputType = _props.inputType;
	      var label = _props.label;
	      var labelStyle = _props.labelStyle;
	      var labelPosition = _props.labelPosition;
	      var onSwitch = _props.onSwitch;
	      var onBlur = _props.onBlur;
	      var onFocus = _props.onFocus;
	      var onMouseUp = _props.onMouseUp;
	      var onMouseDown = _props.onMouseDown;
	      var onMouseLeave = _props.onMouseLeave;
	      var onTouchStart = _props.onTouchStart;
	      var onTouchEnd = _props.onTouchEnd;
	      var onParentShouldUpdate = _props.onParentShouldUpdate;
	      var disabled = _props.disabled;
	      var disableTouchRipple = _props.disableTouchRipple;
	      var disableFocusRipple = _props.disableFocusRipple;
	      var className = _props.className;
	      var rippleColor = _props.rippleColor;
	      var rippleStyle = _props.rippleStyle;
	      var style = _props.style;
	      var switched = _props.switched;
	      var switchElement = _props.switchElement;
	      var thumbStyle = _props.thumbStyle;
	      var trackStyle = _props.trackStyle;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['name', 'value', 'iconStyle', 'inputStyle', 'inputType', 'label', 'labelStyle', 'labelPosition', 'onSwitch', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'onParentShouldUpdate', 'disabled', 'disableTouchRipple', 'disableFocusRipple', 'className', 'rippleColor', 'rippleStyle', 'style', 'switched', 'switchElement', 'thumbStyle', 'trackStyle']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	      var wrapStyles = (0, _simpleAssign2.default)(styles.wrap, iconStyle);
	      var mergedRippleStyle = (0, _simpleAssign2.default)(styles.ripple, rippleStyle);
	
	      if (thumbStyle) {
	        wrapStyles.marginLeft /= 2;
	        wrapStyles.marginRight /= 2;
	      }
	
	      var labelElement = label && _react2.default.createElement(
	        'label',
	        { style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle)) },
	        label
	      );
	
	      var showTouchRipple = !disabled && !disableTouchRipple;
	      var showFocusRipple = !disabled && !disableFocusRipple;
	
	      var touchRipple = _react2.default.createElement(_TouchRipple2.default, {
	        ref: 'touchRipple',
	        key: 'touchRipple',
	        style: mergedRippleStyle,
	        color: mergedRippleStyle.color,
	        muiTheme: this.context.muiTheme,
	        centerRipple: true
	      });
	
	      var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
	        key: 'focusRipple',
	        innerStyle: mergedRippleStyle,
	        color: mergedRippleStyle.color,
	        muiTheme: this.context.muiTheme,
	        show: this.state.isKeyboardFocused
	      });
	
	      var ripples = [showTouchRipple ? touchRipple : null, showFocusRipple ? focusRipple : null];
	
	      var inputElement = _react2.default.createElement('input', (0, _extends3.default)({}, other, {
	        ref: 'checkbox',
	        type: inputType,
	        style: prepareStyles((0, _simpleAssign2.default)(styles.input, inputStyle)),
	        name: name,
	        value: value,
	        disabled: disabled,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onChange: this.handleChange,
	        onMouseUp: showTouchRipple && this.handleMouseUp,
	        onMouseDown: showTouchRipple && this.handleMouseDown,
	        onMouseLeave: showTouchRipple && this.handleMouseLeave,
	        onTouchStart: showTouchRipple && this.handleTouchStart,
	        onTouchEnd: showTouchRipple && this.handleTouchEnd
	      }));
	
	      // If toggle component (indicated by whether the style includes thumb) manually lay out
	      // elements in order to nest ripple elements
	      var switchOrThumbElement = !thumbStyle ? _react2.default.createElement(
	        'div',
	        { style: prepareStyles(wrapStyles) },
	        switchElement,
	        ripples
	      ) : _react2.default.createElement(
	        'div',
	        { style: prepareStyles(wrapStyles) },
	        _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, trackStyle)) }),
	        _react2.default.createElement(
	          _Paper2.default,
	          { style: thumbStyle, zDepth: 1, circle: true },
	          ' ',
	          ripples,
	          ' '
	        )
	      );
	
	      var elementsInOrder = labelPosition === 'right' ? _react2.default.createElement(
	        'div',
	        { style: styles.controls },
	        switchOrThumbElement,
	        labelElement
	      ) : _react2.default.createElement(
	        'div',
	        { style: styles.controls },
	        labelElement,
	        switchOrThumbElement
	      );
	
	      return _react2.default.createElement(
	        'div',
	        { ref: 'root', className: className, style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
	        _react2.default.createElement(_reactEventListener2.default, {
	          target: 'window',
	          onKeyDown: this.handleKeyDown,
	          onKeyUp: this.handleKeyUp
	        }),
	        inputElement,
	        elementsInOrder
	      );
	    }
	  }]);
	  return EnhancedSwitch;
	}(_react.Component);
	
	EnhancedSwitch.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? EnhancedSwitch.propTypes = {
	  checked: _react.PropTypes.bool,
	  className: _react.PropTypes.string,
	  defaultChecked: _react.PropTypes.bool,
	  disableFocusRipple: _react.PropTypes.bool,
	  disableTouchRipple: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  iconStyle: _react.PropTypes.object,
	  inputStyle: _react.PropTypes.object,
	  inputType: _react.PropTypes.string.isRequired,
	  label: _react.PropTypes.node,
	  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
	  labelStyle: _react.PropTypes.object,
	  name: _react.PropTypes.string,
	  onBlur: _react.PropTypes.func,
	  onFocus: _react.PropTypes.func,
	  onMouseDown: _react.PropTypes.func,
	  onMouseLeave: _react.PropTypes.func,
	  onMouseUp: _react.PropTypes.func,
	  onParentShouldUpdate: _react.PropTypes.func,
	  onSwitch: _react.PropTypes.func,
	  onTouchEnd: _react.PropTypes.func,
	  onTouchStart: _react.PropTypes.func,
	  rippleColor: _react.PropTypes.string,
	  rippleStyle: _react.PropTypes.object,
	  style: _react.PropTypes.object,
	  switchElement: _react.PropTypes.element.isRequired,
	  switched: _react.PropTypes.bool.isRequired,
	  thumbStyle: _react.PropTypes.object,
	  trackStyle: _react.PropTypes.object,
	  value: _react.PropTypes.any
	} : void 0;
	exports.default = EnhancedSwitch;

/***/ },

/***/ 978:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ToggleRadioButtonUnchecked = function ToggleRadioButtonUnchecked(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' })
	  );
	};
	ToggleRadioButtonUnchecked = (0, _pure2.default)(ToggleRadioButtonUnchecked);
	ToggleRadioButtonUnchecked.displayName = 'ToggleRadioButtonUnchecked';
	ToggleRadioButtonUnchecked.muiName = 'SvgIcon';
	
	exports.default = ToggleRadioButtonUnchecked;

/***/ },

/***/ 979:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ToggleRadioButtonChecked = function ToggleRadioButtonChecked(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' })
	  );
	};
	ToggleRadioButtonChecked = (0, _pure2.default)(ToggleRadioButtonChecked);
	ToggleRadioButtonChecked.displayName = 'ToggleRadioButtonChecked';
	ToggleRadioButtonChecked.muiName = 'SvgIcon';
	
	exports.default = ToggleRadioButtonChecked;

/***/ },

/***/ 980:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RadioButton = __webpack_require__(975);
	
	var _RadioButton2 = _interopRequireDefault(_RadioButton);
	
	var _warning = __webpack_require__(217);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RadioButtonGroup = function (_Component) {
	  (0, _inherits3.default)(RadioButtonGroup, _Component);
	
	  function RadioButtonGroup() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, RadioButtonGroup);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButtonGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioButtonGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      numberCheckedRadioButtons: 0,
	      selected: ''
	    }, _this.handleChange = function (event, newSelection) {
	      _this.updateRadioButtons(newSelection);
	
	      // Successful update
	      if (_this.state.numberCheckedRadioButtons === 0) {
	        if (_this.props.onChange) _this.props.onChange(event, newSelection);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(RadioButtonGroup, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      var cnt = 0;
	      var selected = '';
	      var _props = this.props;
	      var valueSelected = _props.valueSelected;
	      var defaultSelected = _props.defaultSelected;
	
	      if (valueSelected !== undefined) {
	        selected = valueSelected;
	      } else if (defaultSelected !== undefined) {
	        selected = defaultSelected;
	      }
	
	      _react2.default.Children.forEach(this.props.children, function (option) {
	        if (_this2.hasCheckAttribute(option)) cnt++;
	      }, this);
	
	      this.setState({
	        numberCheckedRadioButtons: cnt,
	        selected: selected
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.hasOwnProperty('valueSelected')) {
	        this.setState({
	          selected: nextProps.valueSelected
	        });
	      }
	    }
	  }, {
	    key: 'hasCheckAttribute',
	    value: function hasCheckAttribute(radioButton) {
	      return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
	    }
	  }, {
	    key: 'updateRadioButtons',
	    value: function updateRadioButtons(newSelection) {
	      if (this.state.numberCheckedRadioButtons === 0) {
	        this.setState({ selected: newSelection });
	      } else {
	         true ? (0, _warning2.default)(false, 'Cannot select a different radio button while another radio button\n        has the \'checked\' property set to true.') : void 0;
	      }
	    }
	  }, {
	    key: 'getSelectedValue',
	    value: function getSelectedValue() {
	      return this.state.selected;
	    }
	  }, {
	    key: 'setSelectedValue',
	    value: function setSelectedValue(newSelectionValue) {
	      this.updateRadioButtons(newSelectionValue);
	    }
	  }, {
	    key: 'clearValue',
	    value: function clearValue() {
	      this.setSelectedValue('');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	
	      var options = _react2.default.Children.map(this.props.children, function (option) {
	        var _option$props = option.props;
	        var name = _option$props.name;
	        var value = _option$props.value;
	        var label = _option$props.label;
	        var onCheck = _option$props.onCheck;
	        var other = (0, _objectWithoutProperties3.default)(_option$props, ['name', 'value', 'label', 'onCheck']);
	
	
	        return _react2.default.createElement(_RadioButton2.default, (0, _extends3.default)({}, other, {
	          ref: option.props.value,
	          name: _this3.props.name,
	          key: option.props.value,
	          value: option.props.value,
	          label: option.props.label,
	          labelPosition: _this3.props.labelPosition,
	          onCheck: _this3.handleChange,
	          checked: option.props.value === _this3.state.selected
	        }));
	      }, this);
	
	      return _react2.default.createElement(
	        'div',
	        {
	          style: prepareStyles((0, _simpleAssign2.default)({}, this.props.style)),
	          className: this.props.className
	        },
	        options
	      );
	    }
	  }]);
	  return RadioButtonGroup;
	}(_react.Component);
	
	RadioButtonGroup.defaultProps = {
	  style: {}
	};
	RadioButtonGroup.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? RadioButtonGroup.propTypes = {
	  /**
	   * Should be used to pass `RadioButton` components.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * The CSS class name of the root element.
	   */
	  className: _react.PropTypes.string,
	  /**
	   * The `value` property of the radio button that will be
	   * selected by default. This takes precedence over the `checked` property
	   * of the `RadioButton` elements.
	   */
	  defaultSelected: _react.PropTypes.any,
	  /**
	   * Where the label will be placed for all child radio buttons.
	   * This takes precedence over the `labelPosition` property of the
	   * `RadioButton` elements.
	   */
	  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
	  /**
	   * The name that will be applied to all child radio buttons.
	   */
	  name: _react.PropTypes.string.isRequired,
	  /**
	   * Callback function that is fired when a radio button has
	   * been checked.
	   *
	   * @param {object} event `change` event targeting the selected
	   * radio button.
	   * @param {*} value The `value` of the selected radio button.
	   */
	  onChange: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The `value` of the currently selected radio button.
	   */
	  valueSelected: _react.PropTypes.any
	} : void 0;
	exports.default = RadioButtonGroup;

/***/ },

/***/ 981:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Checkbox = __webpack_require__(982);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Checkbox2.default;

/***/ },

/***/ 982:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _EnhancedSwitch = __webpack_require__(977);
	
	var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);
	
	var _transitions = __webpack_require__(564);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _checkBoxOutlineBlank = __webpack_require__(983);
	
	var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);
	
	var _checkBox = __webpack_require__(984);
	
	var _checkBox2 = _interopRequireDefault(_checkBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var checkbox = context.muiTheme.checkbox;
	
	  var checkboxSize = 24;
	
	  return {
	    icon: {
	      height: checkboxSize,
	      width: checkboxSize
	    },
	    check: {
	      position: 'absolute',
	      opacity: 0,
	      transform: 'scale(0)',
	      transitionOrigin: '50% 50%',
	      transition: _transitions2.default.easeOut('450ms', 'opacity', '0ms') + ', ' + _transitions2.default.easeOut('0ms', 'transform', '450ms'),
	      fill: checkbox.checkedColor
	    },
	    checkWhenSwitched: {
	      opacity: 1,
	      transform: 'scale(1)',
	      transition: _transitions2.default.easeOut('0ms', 'opacity', '0ms') + ', ' + _transitions2.default.easeOut('800ms', 'transform', '0ms')
	    },
	    checkWhenDisabled: {
	      fill: checkbox.disabledColor,
	      cursor: 'not-allowed'
	    },
	    box: {
	      position: 'absolute',
	      opacity: 1,
	      fill: checkbox.boxColor,
	      transition: _transitions2.default.easeOut('1000ms', 'opacity', '200ms')
	    },
	    boxWhenSwitched: {
	      opacity: 0,
	      transition: _transitions2.default.easeOut('650ms', 'opacity', '150ms'),
	      fill: checkbox.checkedColor
	    },
	    boxWhenDisabled: {
	      fill: props.checked ? 'transparent' : checkbox.disabledColor,
	      cursor: 'not-allowed'
	    },
	    label: {
	      color: props.disabled ? checkbox.labelDisabledColor : checkbox.labelColor
	    }
	  };
	}
	
	var Checkbox = function (_Component) {
	  (0, _inherits3.default)(Checkbox, _Component);
	
	  function Checkbox() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Checkbox);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      switched: false
	    }, _this.handleStateChange = function (newSwitched) {
	      _this.setState({
	        switched: newSwitched
	      });
	    }, _this.handleCheck = function (event, isInputChecked) {
	      if (_this.props.onCheck) {
	        _this.props.onCheck(event, isInputChecked);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(Checkbox, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props;
	      var checked = _props.checked;
	      var defaultChecked = _props.defaultChecked;
	      var valueLink = _props.valueLink;
	
	
	      if (checked || defaultChecked || valueLink && valueLink.value) {
	        this.setState({
	          switched: true
	        });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.checked !== nextProps.checked) {
	        this.setState({
	          switched: nextProps.checked
	        });
	      }
	    }
	  }, {
	    key: 'isChecked',
	    value: function isChecked() {
	      return this.refs.enhancedSwitch.isSwitched();
	    }
	  }, {
	    key: 'setChecked',
	    value: function setChecked(newCheckedValue) {
	      this.refs.enhancedSwitch.setSwitched(newCheckedValue);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var iconStyle = _props2.iconStyle;
	      var onCheck = _props2.onCheck;
	      var checkedIcon = _props2.checkedIcon;
	      var uncheckedIcon = _props2.uncheckedIcon;
	      var other = (0, _objectWithoutProperties3.default)(_props2, ['iconStyle', 'onCheck', 'checkedIcon', 'uncheckedIcon']);
	
	      var styles = getStyles(this.props, this.context);
	      var boxStyles = (0, _simpleAssign2.default)(styles.box, this.state.switched && styles.boxWhenSwitched, iconStyle, this.props.disabled && styles.boxWhenDisabled);
	      var checkStyles = (0, _simpleAssign2.default)(styles.check, this.state.switched && styles.checkWhenSwitched, iconStyle, this.props.disabled && styles.checkWhenDisabled);
	
	      var checkedElement = checkedIcon ? _react2.default.cloneElement(checkedIcon, {
	        style: (0, _simpleAssign2.default)(checkStyles, checkedIcon.props.style)
	      }) : _react2.default.createElement(_checkBox2.default, {
	        style: checkStyles
	      });
	
	      var unCheckedElement = uncheckedIcon ? _react2.default.cloneElement(uncheckedIcon, {
	        style: (0, _simpleAssign2.default)(boxStyles, uncheckedIcon.props.style)
	      }) : _react2.default.createElement(_checkBoxOutlineBlank2.default, {
	        style: boxStyles
	      });
	
	      var checkboxElement = _react2.default.createElement(
	        'div',
	        null,
	        unCheckedElement,
	        checkedElement
	      );
	
	      var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
	      var mergedIconStyle = (0, _simpleAssign2.default)(styles.icon, iconStyle);
	
	      var labelStyle = (0, _simpleAssign2.default)(styles.label, this.props.labelStyle);
	
	      var enhancedSwitchProps = {
	        ref: 'enhancedSwitch',
	        inputType: 'checkbox',
	        switched: this.state.switched,
	        switchElement: checkboxElement,
	        rippleColor: rippleColor,
	        iconStyle: mergedIconStyle,
	        onSwitch: this.handleCheck,
	        labelStyle: labelStyle,
	        onParentShouldUpdate: this.handleStateChange,
	        labelPosition: this.props.labelPosition
	      };
	
	      return _react2.default.createElement(_EnhancedSwitch2.default, (0, _extends3.default)({}, other, enhancedSwitchProps));
	    }
	  }]);
	  return Checkbox;
	}(_react.Component);
	
	Checkbox.defaultProps = {
	  labelPosition: 'right',
	  disabled: false
	};
	Checkbox.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? Checkbox.propTypes = {
	  /**
	   * Checkbox is checked if true.
	   */
	  checked: _react.PropTypes.bool,
	  /**
	   * The SvgIcon to use for the checked state.
	   * This is useful to create icon toggles.
	   */
	  checkedIcon: _react.PropTypes.element,
	  /**
	   * The default state of our checkbox component.
	   * **Warning:** This cannot be used in conjunction with `checked`.
	   * Decide between using a controlled or uncontrolled input element and remove one of these props.
	   * More info: https://fb.me/react-controlled-components
	   */
	  defaultChecked: _react.PropTypes.bool,
	  /**
	   * Disabled if true.
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * Overrides the inline-styles of the icon element.
	   */
	  iconStyle: _react.PropTypes.object,
	  /**
	   * Overrides the inline-styles of the input element.
	   */
	  inputStyle: _react.PropTypes.object,
	  /**
	   * Where the label will be placed next to the checkbox.
	   */
	  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
	  /**
	   * Overrides the inline-styles of the Checkbox element label.
	   */
	  labelStyle: _react.PropTypes.object,
	  /**
	   * Callback function that is fired when the checkbox is checked.
	   *
	   * @param {object} event `change` event targeting the underlying checkbox `input`.
	   * @param {boolean} isInputChecked The `checked` value of the underlying checkbox `input`.
	   */
	  onCheck: _react.PropTypes.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * The SvgIcon to use for the unchecked state.
	   * This is useful to create icon toggles.
	   */
	  uncheckedIcon: _react.PropTypes.element,
	  /**
	   * ValueLink for when using controlled checkbox.
	   */
	  valueLink: _react.PropTypes.object
	} : void 0;
	exports.default = Checkbox;

/***/ },

/***/ 983:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ToggleCheckBoxOutlineBlank = function ToggleCheckBoxOutlineBlank(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' })
	  );
	};
	ToggleCheckBoxOutlineBlank = (0, _pure2.default)(ToggleCheckBoxOutlineBlank);
	ToggleCheckBoxOutlineBlank.displayName = 'ToggleCheckBoxOutlineBlank';
	ToggleCheckBoxOutlineBlank.muiName = 'SvgIcon';
	
	exports.default = ToggleCheckBoxOutlineBlank;

/***/ },

/***/ 984:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ToggleCheckBox = function ToggleCheckBox(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
	  );
	};
	ToggleCheckBox = (0, _pure2.default)(ToggleCheckBox);
	ToggleCheckBox.displayName = 'ToggleCheckBox';
	ToggleCheckBox.muiName = 'SvgIcon';
	
	exports.default = ToggleCheckBox;

/***/ },

/***/ 985:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.CardExpandable = exports.CardActions = exports.CardText = exports.CardMedia = exports.CardTitle = exports.CardHeader = exports.Card = undefined;
	
	var _Card2 = __webpack_require__(986);
	
	var _Card3 = _interopRequireDefault(_Card2);
	
	var _CardHeader2 = __webpack_require__(990);
	
	var _CardHeader3 = _interopRequireDefault(_CardHeader2);
	
	var _CardTitle2 = __webpack_require__(991);
	
	var _CardTitle3 = _interopRequireDefault(_CardTitle2);
	
	var _CardMedia2 = __webpack_require__(992);
	
	var _CardMedia3 = _interopRequireDefault(_CardMedia2);
	
	var _CardText2 = __webpack_require__(993);
	
	var _CardText3 = _interopRequireDefault(_CardText2);
	
	var _CardActions2 = __webpack_require__(994);
	
	var _CardActions3 = _interopRequireDefault(_CardActions2);
	
	var _CardExpandable2 = __webpack_require__(987);
	
	var _CardExpandable3 = _interopRequireDefault(_CardExpandable2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Card = _Card3.default;
	exports.CardHeader = _CardHeader3.default;
	exports.CardTitle = _CardTitle3.default;
	exports.CardMedia = _CardMedia3.default;
	exports.CardText = _CardText3.default;
	exports.CardActions = _CardActions3.default;
	exports.CardExpandable = _CardExpandable3.default;
	exports.default = _Card3.default;

/***/ },

/***/ 986:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Paper = __webpack_require__(610);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _CardExpandable = __webpack_require__(987);
	
	var _CardExpandable2 = _interopRequireDefault(_CardExpandable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Card = function (_Component) {
	  (0, _inherits3.default)(Card, _Component);
	
	  function Card() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Card);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      expanded: null
	    }, _this.handleExpanding = function (event) {
	      event.preventDefault();
	      var newExpandedState = !_this.state.expanded;
	      // no automatic state update when the component is controlled
	      if (_this.props.expanded === null) {
	        _this.setState({ expanded: newExpandedState });
	      }
	      if (_this.props.onExpandChange) {
	        _this.props.onExpandChange(newExpandedState);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(Card, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // update the state when the component is controlled.
	      if (nextProps.expanded !== null) this.setState({ expanded: nextProps.expanded });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var style = _props.style;
	      var containerStyle = _props.containerStyle;
	      var children = _props.children;
	      var expandable = _props.expandable;
	      var expandedProp = _props.expanded;
	      var initiallyExpanded = _props.initiallyExpanded;
	      var onExpandChange = _props.onExpandChange;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['style', 'containerStyle', 'children', 'expandable', 'expanded', 'initiallyExpanded', 'onExpandChange']);
	
	
	      var lastElement = void 0;
	      var expanded = this.state.expanded;
	      var newChildren = _react2.default.Children.map(children, function (currentChild) {
	        var doClone = false;
	        var newChild = undefined;
	        var newProps = {};
	        var element = currentChild;
	        if (!currentChild || !currentChild.props) {
	          return null;
	        }
	        if (expanded === false && currentChild.props.expandable === true) return;
	        if (currentChild.props.actAsExpander === true) {
	          doClone = true;
	          newProps.onTouchTap = _this2.handleExpanding;
	          newProps.style = (0, _simpleAssign2.default)({ cursor: 'pointer' }, currentChild.props.style);
	        }
	        if (currentChild.props.showExpandableButton === true) {
	          doClone = true;
	          newChild = _react2.default.createElement(_CardExpandable2.default, { expanded: expanded, onExpanding: _this2.handleExpanding });
	        }
	        if (doClone) {
	          element = _react2.default.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
	        }
	        lastElement = element;
	        return element;
	      }, this);
	
	      // If the last element is text or a title we should add
	      // 8px padding to the bottom of the card
	      var addBottomPadding = lastElement && (lastElement.type.muiName === 'CardText' || lastElement.type.muiName === 'CardTitle');
	
	      var mergedStyles = (0, _simpleAssign2.default)({
	        zIndex: 1
	      }, style);
	      var containerMergedStyles = (0, _simpleAssign2.default)({
	        paddingBottom: addBottomPadding ? 8 : 0
	      }, containerStyle);
	
	      return _react2.default.createElement(
	        _Paper2.default,
	        (0, _extends3.default)({}, other, { style: mergedStyles }),
	        _react2.default.createElement(
	          'div',
	          { style: containerMergedStyles },
	          newChildren
	        )
	      );
	    }
	  }]);
	  return Card;
	}(_react.Component);
	
	Card.defaultProps = {
	  expandable: false,
	  expanded: null,
	  initiallyExpanded: false
	};
	 true ? Card.propTypes = {
	  /**
	   * Can be used to render elements inside the Card.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * Override the inline-styles of the container element.
	   */
	  containerStyle: _react.PropTypes.object,
	  /**
	   * If true, this card component is expandable. Can be set on any child of the `Card` component.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * Whether this card is expanded.
	   * If `true` or `false` the component is controlled.
	   * if `null` the component is uncontrolled.
	   */
	  expanded: _react.PropTypes.bool,
	  /**
	   * Whether this card is initially expanded.
	   */
	  initiallyExpanded: _react.PropTypes.bool,
	  /**
	   * Callback function fired when the `expandable` state of the card has changed.
	   *
	   * @param {boolean} newExpandedState Represents the new `expanded` state of the card.
	   */
	  onExpandChange: _react.PropTypes.func,
	  /**
	   * If true, this card component will include a button to expand the card. `CardTitle`,
	   * `CardHeader` and `CardActions` implement `showExpandableButton`. Any child component
	   * of `Card` can implements `showExpandableButton` or forwards the property to a child
	   * component supporting it.
	   */
	  showExpandableButton: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = Card;

/***/ },

/***/ 987:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _keyboardArrowUp = __webpack_require__(988);
	
	var _keyboardArrowUp2 = _interopRequireDefault(_keyboardArrowUp);
	
	var _keyboardArrowDown = __webpack_require__(989);
	
	var _keyboardArrowDown2 = _interopRequireDefault(_keyboardArrowDown);
	
	var _IconButton = __webpack_require__(562);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles() {
	  return {
	    root: {
	      top: 0,
	      bottom: 0,
	      right: 4,
	      margin: 'auto',
	      position: 'absolute'
	    }
	  };
	}
	
	var CardExpandable = function (_Component) {
	  (0, _inherits3.default)(CardExpandable, _Component);
	
	  function CardExpandable() {
	    (0, _classCallCheck3.default)(this, CardExpandable);
	    return (0, _possibleConstructorReturn3.default)(this, (CardExpandable.__proto__ || (0, _getPrototypeOf2.default)(CardExpandable)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardExpandable, [{
	    key: 'render',
	    value: function render() {
	      var styles = getStyles(this.props, this.context);
	
	      return _react2.default.createElement(
	        _IconButton2.default,
	        {
	          style: (0, _simpleAssign2.default)(styles.root, this.props.style),
	          onTouchTap: this.props.onExpanding
	        },
	        this.props.expanded ? _react2.default.createElement(_keyboardArrowUp2.default, null) : _react2.default.createElement(_keyboardArrowDown2.default, null)
	      );
	    }
	  }]);
	  return CardExpandable;
	}(_react.Component);
	
	CardExpandable.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardExpandable.propTypes = {
	  expanded: _react.PropTypes.bool,
	  onExpanding: _react.PropTypes.func.isRequired,
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = CardExpandable;

/***/ },

/***/ 988:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HardwareKeyboardArrowUp = function HardwareKeyboardArrowUp(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' })
	  );
	};
	HardwareKeyboardArrowUp = (0, _pure2.default)(HardwareKeyboardArrowUp);
	HardwareKeyboardArrowUp.displayName = 'HardwareKeyboardArrowUp';
	HardwareKeyboardArrowUp.muiName = 'SvgIcon';
	
	exports.default = HardwareKeyboardArrowUp;

/***/ },

/***/ 989:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HardwareKeyboardArrowDown = function HardwareKeyboardArrowDown(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' })
	  );
	};
	HardwareKeyboardArrowDown = (0, _pure2.default)(HardwareKeyboardArrowDown);
	HardwareKeyboardArrowDown.displayName = 'HardwareKeyboardArrowDown';
	HardwareKeyboardArrowDown.muiName = 'SvgIcon';
	
	exports.default = HardwareKeyboardArrowDown;

/***/ },

/***/ 990:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Avatar = __webpack_require__(731);
	
	var _Avatar2 = _interopRequireDefault(_Avatar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var card = context.muiTheme.card;
	
	
	  return {
	    root: {
	      padding: 16,
	      fontWeight: card.fontWeight,
	      boxSizing: 'border-box',
	      position: 'relative',
	      whiteSpace: 'nowrap'
	    },
	    text: {
	      display: 'inline-block',
	      verticalAlign: 'top',
	      whiteSpace: 'normal',
	      paddingRight: '90px'
	    },
	    avatar: {
	      marginRight: 16
	    },
	    title: {
	      color: props.titleColor || card.titleColor,
	      display: 'block',
	      fontSize: 15
	    },
	    subtitle: {
	      color: props.subtitleColor || card.subtitleColor,
	      display: 'block',
	      fontSize: 14
	    }
	  };
	}
	
	var CardHeader = function (_Component) {
	  (0, _inherits3.default)(CardHeader, _Component);
	
	  function CardHeader() {
	    (0, _classCallCheck3.default)(this, CardHeader);
	    return (0, _possibleConstructorReturn3.default)(this, (CardHeader.__proto__ || (0, _getPrototypeOf2.default)(CardHeader)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardHeader, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var actAsExpander = _props.actAsExpander;
	      var avatarProp = _props.avatar;
	      var children = _props.children;
	      var expandable = _props.expandable;
	      var showExpandableButton = _props.showExpandableButton;
	      var style = _props.style;
	      var subtitle = _props.subtitle;
	      var subtitleColor = _props.subtitleColor;
	      var subtitleStyle = _props.subtitleStyle;
	      var textStyle = _props.textStyle;
	      var title = _props.title;
	      var titleColor = _props.titleColor;
	      var titleStyle = _props.titleStyle;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'avatar', 'children', 'expandable', 'showExpandableButton', 'style', 'subtitle', 'subtitleColor', 'subtitleStyle', 'textStyle', 'title', 'titleColor', 'titleStyle']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	
	      var avatar = avatarProp;
	
	      if ((0, _react.isValidElement)(avatarProp)) {
	        avatar = _react2.default.cloneElement(avatar, {
	          style: (0, _simpleAssign2.default)(styles.avatar, avatar.props.style)
	        });
	      } else if (avatar !== null) {
	        avatar = _react2.default.createElement(_Avatar2.default, { src: avatarProp, style: styles.avatar });
	      }
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
	        avatar,
	        _react2.default.createElement(
	          'div',
	          { style: prepareStyles((0, _simpleAssign2.default)(styles.text, textStyle)) },
	          _react2.default.createElement(
	            'span',
	            { style: prepareStyles((0, _simpleAssign2.default)(styles.title, titleStyle)) },
	            title
	          ),
	          _react2.default.createElement(
	            'span',
	            { style: prepareStyles((0, _simpleAssign2.default)(styles.subtitle, subtitleStyle)) },
	            subtitle
	          )
	        ),
	        children
	      );
	    }
	  }]);
	  return CardHeader;
	}(_react.Component);
	
	CardHeader.muiName = 'CardHeader';
	CardHeader.defaultProps = {
	  avatar: null
	};
	CardHeader.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardHeader.propTypes = {
	  /**
	   * If true, a click on this card component expands the card.
	   */
	  actAsExpander: _react.PropTypes.bool,
	  /**
	   * This is the [Avatar](/#/components/avatar) element to be displayed on the Card Header.
	   * If `avatar` is an `Avatar` or other element, it will be rendered.
	   * If `avatar` is a string, it will be used as the image `src` for an `Avatar`.
	   */
	  avatar: _react.PropTypes.node,
	  /**
	   * Can be used to render elements inside the Card Header.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * If true, this card component is expandable.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * If true, this card component will include a button to expand the card.
	   */
	  showExpandableButton: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Can be used to render a subtitle in Card Header.
	   */
	  subtitle: _react.PropTypes.node,
	  /**
	   * Override the subtitle color.
	   */
	  subtitleColor: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the subtitle.
	   */
	  subtitleStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the text.
	   */
	  textStyle: _react.PropTypes.object,
	  /**
	   * Can be used to render a title in Card Header.
	   */
	  title: _react.PropTypes.node,
	  /**
	   * Override the title color.
	   */
	  titleColor: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the title.
	   */
	  titleStyle: _react.PropTypes.object
	} : void 0;
	exports.default = CardHeader;

/***/ },

/***/ 991:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var card = context.muiTheme.card;
	
	
	  return {
	    root: {
	      padding: 16,
	      position: 'relative'
	    },
	    title: {
	      fontSize: 24,
	      color: props.titleColor || card.titleColor,
	      display: 'block',
	      lineHeight: '36px'
	    },
	    subtitle: {
	      fontSize: 14,
	      color: props.subtitleColor || card.subtitleColor,
	      display: 'block'
	    }
	  };
	}
	
	var CardTitle = function (_Component) {
	  (0, _inherits3.default)(CardTitle, _Component);
	
	  function CardTitle() {
	    (0, _classCallCheck3.default)(this, CardTitle);
	    return (0, _possibleConstructorReturn3.default)(this, (CardTitle.__proto__ || (0, _getPrototypeOf2.default)(CardTitle)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardTitle, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var actAsExpander = _props.actAsExpander;
	      var children = _props.children;
	      var expandable = _props.expandable;
	      var showExpandableButton = _props.showExpandableButton;
	      var style = _props.style;
	      var subtitle = _props.subtitle;
	      var subtitleColor = _props.subtitleColor;
	      var subtitleStyle = _props.subtitleStyle;
	      var title = _props.title;
	      var titleColor = _props.titleColor;
	      var titleStyle = _props.titleStyle;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'expandable', 'showExpandableButton', 'style', 'subtitle', 'subtitleColor', 'subtitleStyle', 'title', 'titleColor', 'titleStyle']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	      var rootStyle = (0, _simpleAssign2.default)({}, styles.root, style);
	      var extendedTitleStyle = (0, _simpleAssign2.default)({}, styles.title, titleStyle);
	      var extendedSubtitleStyle = (0, _simpleAssign2.default)({}, styles.subtitle, subtitleStyle);
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
	        _react2.default.createElement(
	          'span',
	          { style: prepareStyles(extendedTitleStyle) },
	          title
	        ),
	        _react2.default.createElement(
	          'span',
	          { style: prepareStyles(extendedSubtitleStyle) },
	          subtitle
	        ),
	        children
	      );
	    }
	  }]);
	  return CardTitle;
	}(_react.Component);
	
	CardTitle.muiName = 'CardTitle';
	CardTitle.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardTitle.propTypes = {
	  /**
	   * If true, a click on this card component expands the card.
	   */
	  actAsExpander: _react.PropTypes.bool,
	  /**
	   * Can be used to render elements inside the Card Title.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * If true, this card component is expandable.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * If true, this card component will include a button to expand the card.
	   */
	  showExpandableButton: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Can be used to render a subtitle in the Card Title.
	   */
	  subtitle: _react.PropTypes.node,
	  /**
	   * Override the subtitle color.
	   */
	  subtitleColor: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the subtitle.
	   */
	  subtitleStyle: _react.PropTypes.object,
	  /**
	   * Can be used to render a title in the Card Title.
	   */
	  title: _react.PropTypes.node,
	  /**
	   * Override the title color.
	   */
	  titleColor: _react.PropTypes.string,
	  /**
	   * Override the inline-styles of the title.
	   */
	  titleStyle: _react.PropTypes.object
	} : void 0;
	exports.default = CardTitle;

/***/ },

/***/ 992:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var cardMedia = context.muiTheme.cardMedia;
	
	
	  return {
	    root: {
	      position: 'relative'
	    },
	    overlayContainer: {
	      position: 'absolute',
	      top: 0,
	      bottom: 0,
	      right: 0,
	      left: 0
	    },
	    overlay: {
	      height: '100%',
	      position: 'relative'
	    },
	    overlayContent: {
	      position: 'absolute',
	      bottom: 0,
	      right: 0,
	      left: 0,
	      paddingTop: 8,
	      background: cardMedia.overlayContentBackground
	    },
	    media: {},
	    mediaChild: {
	      verticalAlign: 'top',
	      maxWidth: '100%',
	      minWidth: '100%',
	      width: '100%'
	    }
	  };
	}
	
	var CardMedia = function (_Component) {
	  (0, _inherits3.default)(CardMedia, _Component);
	
	  function CardMedia() {
	    (0, _classCallCheck3.default)(this, CardMedia);
	    return (0, _possibleConstructorReturn3.default)(this, (CardMedia.__proto__ || (0, _getPrototypeOf2.default)(CardMedia)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardMedia, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var actAsExpander = _props.actAsExpander;
	      var children = _props.children;
	      var expandable = _props.expandable;
	      var mediaStyle = _props.mediaStyle;
	      var overlay = _props.overlay;
	      var overlayContainerStyle = _props.overlayContainerStyle;
	      var overlayContentStyle = _props.overlayContentStyle;
	      var overlayStyle = _props.overlayStyle;
	      var style = _props.style;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'expandable', 'mediaStyle', 'overlay', 'overlayContainerStyle', 'overlayContentStyle', 'overlayStyle', 'style']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	      var rootStyle = (0, _simpleAssign2.default)(styles.root, style);
	      var extendedMediaStyle = (0, _simpleAssign2.default)(styles.media, mediaStyle);
	      var extendedOverlayContainerStyle = (0, _simpleAssign2.default)(styles.overlayContainer, overlayContainerStyle);
	      var extendedOverlayContentStyle = (0, _simpleAssign2.default)(styles.overlayContent, overlayContentStyle);
	      var extendedOverlayStyle = (0, _simpleAssign2.default)(styles.overlay, overlayStyle);
	      var titleColor = this.context.muiTheme.cardMedia.titleColor;
	      var subtitleColor = this.context.muiTheme.cardMedia.subtitleColor;
	      var color = this.context.muiTheme.cardMedia.color;
	
	      var styledChildren = _react2.default.Children.map(children, function (child) {
	        return _react2.default.cloneElement(child, {
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.mediaChild, child.props.style))
	        });
	      });
	
	      var overlayChildren = _react2.default.Children.map(overlay, function (child) {
	        if (child.type.muiName === 'CardHeader' || child.type.muiName === 'CardTitle') {
	          return _react2.default.cloneElement(child, {
	            titleColor: titleColor,
	            subtitleColor: subtitleColor
	          });
	        } else if (child.type.muiName === 'CardText') {
	          return _react2.default.cloneElement(child, {
	            color: color
	          });
	        } else {
	          return child;
	        }
	      });
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
	        _react2.default.createElement(
	          'div',
	          { style: prepareStyles(extendedMediaStyle) },
	          styledChildren
	        ),
	        overlay ? _react2.default.createElement(
	          'div',
	          { style: prepareStyles(extendedOverlayContainerStyle) },
	          _react2.default.createElement(
	            'div',
	            { style: prepareStyles(extendedOverlayStyle) },
	            _react2.default.createElement(
	              'div',
	              { style: prepareStyles(extendedOverlayContentStyle) },
	              overlayChildren
	            )
	          )
	        ) : ''
	      );
	    }
	  }]);
	  return CardMedia;
	}(_react.Component);
	
	CardMedia.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardMedia.propTypes = {
	  /**
	   * If true, a click on this card component expands the card.
	   */
	  actAsExpander: _react.PropTypes.bool,
	  /**
	   * Can be used to render elements inside the Card Media.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * If true, this card component is expandable.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the Card Media.
	   */
	  mediaStyle: _react.PropTypes.object,
	  /**
	   * Can be used to render overlay element in Card Media.
	   */
	  overlay: _react.PropTypes.node,
	  /**
	   * Override the inline-styles of the overlay container.
	   */
	  overlayContainerStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the overlay content.
	   */
	  overlayContentStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the overlay element.
	   */
	  overlayStyle: _react.PropTypes.object,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = CardMedia;

/***/ },

/***/ 993:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles(props, context) {
	  var cardText = context.muiTheme.cardText;
	
	
	  return {
	    root: {
	      padding: 16,
	      fontSize: 14,
	      color: props.color || cardText.textColor
	    }
	  };
	}
	
	var CardText = function (_Component) {
	  (0, _inherits3.default)(CardText, _Component);
	
	  function CardText() {
	    (0, _classCallCheck3.default)(this, CardText);
	    return (0, _possibleConstructorReturn3.default)(this, (CardText.__proto__ || (0, _getPrototypeOf2.default)(CardText)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardText, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var actAsExpander = _props.actAsExpander;
	      var children = _props.children;
	      var color = _props.color;
	      var expandable = _props.expandable;
	      var style = _props.style;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'color', 'expandable', 'style']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	      var rootStyle = (0, _simpleAssign2.default)(styles.root, style);
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, { style: prepareStyles(rootStyle) }),
	        children
	      );
	    }
	  }]);
	  return CardText;
	}(_react.Component);
	
	CardText.muiName = 'CardText';
	CardText.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardText.propTypes = {
	  /**
	   * If true, a click on this card component expands the card.
	   */
	  actAsExpander: _react.PropTypes.bool,
	  /**
	   * Can be used to render elements inside the Card Text.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * Override the CardText color.
	   */
	  color: _react.PropTypes.string,
	  /**
	   * If true, this card component is expandable.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = CardText;

/***/ },

/***/ 994:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(489);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(494);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(495);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(499);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(533);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _simpleAssign = __webpack_require__(561);
	
	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStyles() {
	  return {
	    root: {
	      padding: 8,
	      position: 'relative'
	    },
	    action: {
	      marginRight: 8
	    }
	  };
	}
	
	var CardActions = function (_Component) {
	  (0, _inherits3.default)(CardActions, _Component);
	
	  function CardActions() {
	    (0, _classCallCheck3.default)(this, CardActions);
	    return (0, _possibleConstructorReturn3.default)(this, (CardActions.__proto__ || (0, _getPrototypeOf2.default)(CardActions)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(CardActions, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var actAsExpander = _props.actAsExpander;
	      var children = _props.children;
	      var expandable = _props.expandable;
	      var style = _props.style;
	      var other = (0, _objectWithoutProperties3.default)(_props, ['actAsExpander', 'children', 'expandable', 'style']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;
	
	      var styles = getStyles(this.props, this.context);
	
	      var styledChildren = _react2.default.Children.map(children, function (child) {
	        if (_react2.default.isValidElement(child)) {
	          return _react2.default.cloneElement(child, {
	            style: (0, _simpleAssign2.default)({}, styles.action, child.props.style)
	          });
	        }
	      });
	
	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
	        styledChildren
	      );
	    }
	  }]);
	  return CardActions;
	}(_react.Component);
	
	CardActions.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};
	 true ? CardActions.propTypes = {
	  /**
	   * If true, a click on this card component expands the card.
	   */
	  actAsExpander: _react.PropTypes.bool,
	  /**
	   * Can be used to render elements inside the Card Action.
	   */
	  children: _react.PropTypes.node,
	  /**
	   * If true, this card component is expandable.
	   */
	  expandable: _react.PropTypes.bool,
	  /**
	   * If true, this card component will include a button to expand the card.
	   */
	  showExpandableButton: _react.PropTypes.bool,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _react.PropTypes.object
	} : void 0;
	exports.default = CardActions;

/***/ },

/***/ 995:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(599);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AvPlayArrow = function AvPlayArrow(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M8 5v14l11-7z' })
	  );
	};
	AvPlayArrow = (0, _pure2.default)(AvPlayArrow);
	AvPlayArrow.displayName = 'AvPlayArrow';
	AvPlayArrow.muiName = 'SvgIcon';
	
	exports.default = AvPlayArrow;

/***/ },

/***/ 996:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(560);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactSwipeableViews = __webpack_require__(954);
	
	var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);
	
	var _reduxForm = __webpack_require__(299);
	
	var _TextField = __webpack_require__(741);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _RadioButton = __webpack_require__(975);
	
	var _Checkbox = __webpack_require__(981);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	var _SelectField = __webpack_require__(747);
	
	var _SelectField2 = _interopRequireDefault(_SelectField);
	
	var _MenuItem = __webpack_require__(636);
	
	var _MenuItem2 = _interopRequireDefault(_MenuItem);
	
	var _FlatButton = __webpack_require__(638);
	
	var _FlatButton2 = _interopRequireDefault(_FlatButton);
	
	var _Card = __webpack_require__(985);
	
	var _Divider = __webpack_require__(729);
	
	var _Divider2 = _interopRequireDefault(_Divider);
	
	var _SvgIcon = __webpack_require__(608);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	var _colors = __webpack_require__(655);
	
	var _Tabs = __webpack_require__(642);
	
	var _playArrow = __webpack_require__(995);
	
	var _playArrow2 = _interopRequireDefault(_playArrow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
	  largeIcon: {
	    width: 72,
	    height: 72
	  }
	};
	
	var validate = function validate(values) {
	  var errors = {};
	  var requiredFields = ['email', 'password'];
	  requiredFields.forEach(function (field) {
	    if (!values[field]) {
	      errors[field] = 'Required';
	    }
	  });
	  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address';
	  }
	  return errors;
	};
	
	var renderTextField = function renderTextField(_ref) {
	  var input = _ref.input;
	  var label = _ref.label;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  var custom = (0, _objectWithoutProperties3.default)(_ref, ['input', 'label', 'meta']);
	  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
	    fullWidth: true,
	    floatingLabelText: label,
	    errorText: touched && error
	  }, input, custom));
	};
	
	var SignupForm = function SignupForm(props) {
	  var handleSubmit = props.handleSubmit;
	  var pristine = props.pristine;
	  var reset = props.reset;
	  var submitting = props.submitting;
	
	  return _react2.default.createElement(
	    'form',
	    { onSubmit: handleSubmit },
	    _react2.default.createElement(_reduxForm.Field, { name: 'email', component: renderTextField, label: 'Email' }),
	    _react2.default.createElement(_reduxForm.Field, { name: 'password', type: 'password', component: renderTextField, label: 'Password' }),
	    _react2.default.createElement(_reduxForm.Field, { name: 'password_confirmation', type: 'password', component: renderTextField, label: 'Confirm Password' }),
	    _react2.default.createElement(_FlatButton2.default, {
	      type: 'Submit',
	      backgroundColor: '#a4c639',
	      hoverColor: '#8AA62F',
	      fullWidth: true,
	      style: { marginTop: '12', height: '100px', width: '100%', borderRadius: '0px' },
	      buttonStyle: { height: '100px' },
	      icon: _react2.default.createElement(_playArrow2.default, { color: _colors.grey50, style: styles.largeIcon })
	    })
	  );
	};
	
	exports.default = (0, _reduxForm.reduxForm)({
	  form: 'SignupForm',
	  validate: validate
	})(SignupForm);

/***/ },

/***/ 997:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(942);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(276);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _ACTION_HANDLERS;
	
	exports.default = loginReducer;
	
	var _redux = __webpack_require__(196);
	
	var _actions = __webpack_require__(945);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  isFetching: false,
	  isAuthenticated: localStorage.getItem('id_token') ? true : false
	};
	
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, _actions.LOGIN_REQUEST, function (state, action) {
	  return (0, _extends3.default)({}, state, { isFetching: true,
	    isAuthenticated: false,
	    user: action.creds });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, _actions.LOGIN_SUCCESS, function (state, action) {
	  return (0, _extends3.default)({}, state, { isFetching: false,
	    isAuthenticated: true,
	    id_token: action.id_token,
	    errorMessage: '' });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, _actions.LOGIN_FAILURE, function (state, action) {
	  return (0, _extends3.default)({}, state, { isFetching: false,
	    isAuthenticated: false,
	    errorMessage: action.message });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, _actions.LOGOUT_SUCCESS, function (state, action) {
	  return (0, _extends3.default)({}, state, { isFetching: true,
	    isAuthenticated: false });
	}), _ACTION_HANDLERS);
	
	function loginReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  var handler = ACTION_HANDLERS[action.type];
	
	  return handler ? handler(state, action) : state;
	}

/***/ }

});
//# sourceMappingURL=3.login.2825f9d5508c403843cd.js.map