module("track");

test("tracked functions have 'funky' marker", function(){
	
	var func = function(){};
	var tracked = funk.track(func);
	
	equal(tracked.funky, true, "tracked function .funky should be true")
	
});

test("tracked functions return correct value", function(){
	
	var f = function(){ return 123; };
	var tracked = f.track();
	
	equal(tracked(), 123, ".track() functions should return correct value");
	
});

test("tracked functions still call original function", function(){
	
	var funcCalls = [];
	var func = function(){
		funcCalls.push({
			args: arguments,
			context: this
		})
	};
	
	var trackedFunc = funk.track(func);
	
	trackedFunc();
	
	equal(funcCalls.length, 1, "func() expected to be called");
	
});

test("tracked functions pass correct context and arguments", function(){
	
	var obj = {};
	var funcCalls = [];
	var func = function(){
		funcCalls.push({
			args: arguments,
			context: this
		})
	};
	
	obj.trackedFunc = funk.track(func);
	obj.trackedFunc(123, 456);
	
	equal(funcCalls.length, 1, "func() expected to be called");
	equal(funcCalls[0].args[0], 123, "Correct arguments should be passed in");
	equal(funcCalls[0].args[1], 456, "Correct arguments should be passed in");
	equal(funcCalls[0].context, obj, "Correct context (this) should be set")
	
});

test("Calls are tracked", function(){
	
	var obj = {};
	var funcCalls = [];
	var func = function(){
		funcCalls.push({
			args: arguments,
			context: this
		})
	};
	
	obj.trackedFunc = funk.track(func);
	
	obj.trackedFunc(123, 456, 789);
	
	equal(funcCalls.length, 1, "func() expected to be called");
	
	ok(obj.trackedFunc.calls, "function.calls should exist");
	equal(obj.trackedFunc.calls.length, 1, ".calls.length should be something");
	
	equal(obj.trackedFunc.calls[0].arguments.length, 3, ".calls.arguments.length should be 3");
	equal(obj.trackedFunc.calls[0].arguments[0], 123, ".calls[0].arguments[0]");
	equal(obj.trackedFunc.calls[0].arguments[1], 456, ".calls[0].arguments[1]");
	equal(obj.trackedFunc.calls[0].arguments[2], 789, ".calls[0].arguments[2]");
	equal(obj.trackedFunc.calls[0].context, obj, ".calls[0].context");
	
	// check for original function
	equal(obj.trackedFunc.func, func, ".original should be the original function");
	
});

test("Calls are tracked with shortcut method", function(){
	
	var obj = {};
	var funcCalls = [];
	var func = function(){
		funcCalls.push({
			args: arguments,
			context: this
		})
	};
	
	obj.trackedFunc = func.track();
	
	obj.trackedFunc(123, 456, 789);
	
	equal(funcCalls.length, 1, "func() expected to be called");
	
	ok(obj.trackedFunc.calls, "function.calls should exist");
	equal(obj.trackedFunc.calls.length, 1, ".calls.length should be 1");
	equal(obj.trackedFunc.count(), 1, ".count() should be 1");
	
	equal(obj.trackedFunc.calls[0].arguments.length, 3, ".calls.arguments.length should be 3");
	equal(obj.trackedFunc.calls[0].arguments[0], 123, ".calls[0].arguments[0]");
	equal(obj.trackedFunc.calls[0].arguments[1], 456, ".calls[0].arguments[1]");
	equal(obj.trackedFunc.calls[0].arguments[2], 789, ".calls[0].arguments[2]");
	equal(obj.trackedFunc.calls[0].context, obj, ".calls[0].context");
	ok(obj.trackedFunc.calls[0].timestamp, ".timestamp should be something");
	
	// check for original function
	equal(obj.trackedFunc.func, func, ".func should be the original function");
	
});

test(".tracked functions don't interfere with each other", function(){
	
	var func1Calls = [];
	var func1 = function(){
		func1Calls.push({
			context: this,
			args: arguments
		})
	};
	
	var func2Calls = [];
	var func2 = function(){
		func2Calls.push({
			context: this,
			args: arguments
		})
	};
	
	var tracked1 = funk.track(func1);
	var tracked2 = funk.track(func2);
	
	tracked1();
	equals(func1Calls.length, 1, "func1");
	equals(func2Calls.length, 0, "func2");
	equals(tracked1.calls.length, 1, "tracked1.calls.length");
	equals(tracked2.calls.length, 0, "tracked2.calls.length");
	
	tracked2();
	equals(func1Calls.length, 1, "func1");
	equals(func2Calls.length, 1, "func2");
	equals(tracked1.calls.length, 1, "tracked1.calls.length");
	equals(tracked2.calls.length, 1, "tracked2.calls.length");
	
});

test(".clean() tidys up after track", function(){
	
	var func = function(){};
	var trackedFunc = funk.track(func);
	
	ok(func != trackedFunc, "trackedFunc should be func");
	
	trackedFunc = funk.clean(trackedFunc);
	
	equal(trackedFunc, func, ".clean() should return original function")
	
});

test(".clean leaves non-funky functions alone", function(){
	
	var func = function(){};
	
	var newFunc = funk.clean(func);
	
	equal(newFunc, func, "Clean shouldn't do anything to functions that are already clean");
	
});




