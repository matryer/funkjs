module("block");

test("block stops execution", function(){

	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	f1();
	
	equal(f1Calls.length, 1, "f1 should have been called normally");
	
	// reset calls
	f1Calls = [];
	
	f1 = funk.block(f1);
	
	f1();
	
	equal(f1Calls.length, 0, "f1 should not get called after it's been blocked");
	
});

test("block stops execution (on prototype)", function(){

	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	f1();
	
	equal(f1Calls.length, 1, "f1 should have been called normally");
	
	// reset calls
	f1Calls = [];
	
	f1 = f1.block();
	
	f1();
	
	equal(f1Calls.length, 0, "f1 should not get called after it's been blocked");
	
});

test("block stores original", function(){
	
	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	f1_blocked = funk.block(f1);
	
	equal(f1_blocked.func, f1, "funk.block should store original function as .func");
	
});

test("block makes functions funky", function(){
	
	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	f1_blocked = funk.block(f1);
	
	equal(f1_blocked.funky, true, "blocked functions should be funky");
	
});

test("clean should clean up blocked functions", function(){
	
	var f1Calls = [];
	var f1 = function(){ f1Calls.push({ args: arguments, context: this }) };
	
	f1_blocked = funk.block(f1);
	
	var cleanF1 = funk.clean(f1);
	
	equal(cleanF1, f1, "funk.clean should clean up blocked function");
	
	// call the clean version
	f1_blocked.clean()();
	
	equal(f1Calls.length, 1, "blocked function when cleaned should call original function");
	
});