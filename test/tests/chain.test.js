var func, funcCalls;

module("chain");

test("chain calls all functions", function(){
	
	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	var f2Calls = [];
	var f2 = function(){ f2Calls.push({ args: arguments, context: this }) };
	var f3Calls = [];
	var f3 = function(){ f3Calls.push({ args: arguments, context: this }) };
	var f4Calls = [];
	var f4 = function(){ f4Calls.push({ args: arguments, context: this }) };
	
	var f = funk.chain(f1, f2, f3, f4);
	var obj = {};
	obj.f = f;
	
	// call all functions
	obj.f(1, 2, 3);
	
	equal(f1Calls.length, 1, "f1Calls.length");
	equal(f1Calls[0].args[0], 1, "f1Calls[0].args[0]");
	equal(f1Calls[0].args[1], 2, "f1Calls[0].args[0]");
	equal(f1Calls[0].args[2], 3, "f1Calls[0].args[0]");
	equal(f1Calls[0].context, obj, "f1Calls[0].context");
	
	equal(f2Calls.length, 1, "f2Calls.length");
	equal(f2Calls[0].args[0], 1, "f2Calls[0].args[0]");
	equal(f2Calls[0].args[1], 2, "f2Calls[0].args[0]");
	equal(f2Calls[0].args[2], 3, "f2Calls[0].args[0]");
	equal(f2Calls[0].context, obj, "f2Calls[0].context");
	
	equal(f3Calls.length, 1, "f3Calls.length");
	equal(f3Calls[0].args[0], 1, "f3Calls[0].args[0]");
	equal(f3Calls[0].args[1], 2, "f3Calls[0].args[0]");
	equal(f3Calls[0].args[2], 3, "f3Calls[0].args[0]");
	equal(f3Calls[0].context, obj, "f3Calls[0].context");
	
	equal(f4Calls.length, 1, "f4Calls.length");
	equal(f4Calls[0].args[0], 1, "f4Calls[0].args[0]");
	equal(f4Calls[0].args[1], 2, "f4Calls[0].args[0]");
	equal(f4Calls[0].args[2], 3, "f4Calls[0].args[0]");
	equal(f4Calls[0].context, obj, "f4Calls[0].context");
	
});

test("chain doesn't cross polinate", function(){
	
	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	var f2Calls = [];
	var f2 = function(){ f2Calls.push({ args: arguments, context: this }) };
	
	var chain1 = funk.chain(f1);
	var chain2 = funk.chain(f2);
	
	chain1();
	
	equal(f1Calls.length, 1, "f1 should get called");
	equal(f2Calls.length, 0, "f2Calls should be 0 since chain1 contains different functions");
	
	chain2();
	
	equal(f1Calls.length, 1, "f1 shouldn't get called again");
	equal(f2Calls.length, 1, "f2 should get called");
	
	
});