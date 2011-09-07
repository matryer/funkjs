/*
	
	funkjs - JavaScript function enhancement library
	Copyright (c) 2009 - 2011  Mat Ryer
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	For updates see http://code.google.com/p/objx/wiki/ChangeLog
	
*/


/*
	Namespace
*/
var funk = {
	version: "1.0"
};

/*
	funk.functions
	Gets all the functions out of all specified objects
	
	e.g.
	var array = funk.functions(function1, arrayOfFunctions1, function2)
	
*/
funk.functions = function() {
	var funcs = [];
	for (var i in arguments) {
		var o = arguments[i];
		if (typeof o == "function") {
			funcs.push(arguments[i]);
		} else if (typeof o == "object") {
			for (var a in o) {
				var subFunctions = funk.functions(o[a]);
				for (var f in subFunctions) {
					funcs.push(subFunctions[f]);
				}
			}
		}
	}
	return funcs;
};

/*
	funk.chain
	Chains many function calls into a single function
	
	e.g.
	var newFunc = funk.chain(functino1, function2, [function3, function4])
	
*/
funk.chain = function(){
	
	var _funcs = funk.functions.apply(funk, arguments);
	
	return function(){
		for (var f in _funcs) {
			_funcs[f].apply(this, arguments);
		}
	};
	
};

/*
	funk.times
	Creates a new function that calls another function many times
*/
funk.times = function(f, times) {
	
	var _func = f, _times = times;
	
	return function(){
		for (var i = _times; i--;) {
			_func.apply(this, arguments);
		}
	}
	
};

/*
	function.times() shortcut method
*/
Function.prototype.times = function(number){
	
	var args = [this, number];
	return funk.times.apply(funk, args);
	
};

/*
 *  funk.bind
 *  Binds context and arguments to a function
 *
 *  js.bind(function, context [, argument1 [, argument2]]);
 */
funk.bind = function() {

	var 
	
		_func = arguments[0] || null,
		_obj = arguments[1] || this,
		_args = [],
		
		i = 2, 
		l = arguments.length,
		
		bound
		
	;
	
	// add arguments
	for (; i<l; i++) {
		_args.push(arguments[i]);
	}
	
	// return a new function that wraps everything up
	bound = function() {
		
		// start an array to get the args
		var theArgs = [];
		var i = 0;

		// add every argument from _args
		for (i = 0, l = _args.length; i < l; i++) {
			theArgs.push(_args[i]);
		}
		
		// add any real arguments passed
		for (i = 0, l = arguments.length; i < l; i++) {
			theArgs.push(arguments[i]);
		}

		// call the function with the specified context and arguments
		return _func.apply(_obj, theArgs);

	};
	
	bound.func = _func;
	bound.context = _obj;
	bound.args = _args;
	bound.funky = true;
	
	return bound;
	
};

/*
 *  instance shortcut version...
 *  function(){}.bind(context [, argument [,argument]])
 */
Function.prototype.bind = function(){
	
	var theArgs = [], i = 0, l = arguments.length;
	
	// add the function
	theArgs.push(this);
	
	// add any real arguments passed
	for (; i < l; i++) {
		theArgs.push(arguments[i]);
	}
	
	return funk.bind.apply(window, theArgs);
	
};

/*
	funk.track
*/
funk.track = function(func) {
	
	var _func = func;
	var function_calls = [];
	
	var newFunc = function(){
		
		// add the detail
		function_calls.push({
			"arguments": arguments,
			"context": this,
			"timestamp": Date()
		});
		
		return _func.apply(this, arguments);
		
	}
	
	newFunc.funky = true;
	newFunc.calls = function_calls;
	newFunc.func = func;
	newFunc.count = function(){
		return function_calls.length;
	}
	
	return newFunc;
	
};

/*
	function(){}.track()
*/
Function.prototype.track = function() {
	
	return funk.track.call(funk, this);
	
};

/*
	funk.clean
*/
funk.clean = function(func) {
	
	while (func.funky)
		func = func.func;
	
	return func;
	
};

/*
	function(){}.clean()
*/
Function.prototype.clean = function(){
	return funk.clean.call(funk, this);
};





