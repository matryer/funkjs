module("times");

test("Times calls a function many times", function(){
	
	var calls = [];
	var f = function(){
		calls.push({ args: arguments, context: this });
	};
	
	var obj = {};
	obj.many = funk.times(f, 3);
	obj.many(1,2,3);
	
	equal(calls.length, 3, "calls.length");
	equal(calls[0].args[0], 1, "calls[0].args[0]");
	equal(calls[0].args[1], 2, "calls[0].args[1]");
	equal(calls[0].args[2], 3, "calls[0].args[2]");
	equal(calls[0].context, obj, "calls[0].context");
	equal(calls[1].args[0], 1, "calls[1].args[0]");
	equal(calls[1].args[1], 2, "calls[1].args[1]");
	equal(calls[1].args[2], 3, "calls[1].args[2]");
	equal(calls[1].context, obj, "calls[1].context");
	equal(calls[2].args[0], 1, "calls[2].args[0]");
	equal(calls[2].args[1], 2, "calls[2].args[1]");
	equal(calls[2].args[2], 3, "calls[2].args[2]");
	equal(calls[2].context, obj, "calls[2].context");
	
});

test("function.times() shortcut method", function(){
	
	var calls = [];
	var f = function(){
		calls.push({ args: arguments, context: this });
	};
	
	var obj = {};
	obj.many = f.times(3);
	
	
	obj.many(1,2,3);
	
	equal(calls.length, 3, "calls.length");
	equal(calls[0].args[0], 1, "calls[0].args[0]");
	equal(calls[0].args[1], 2, "calls[0].args[1]");
	equal(calls[0].args[2], 3, "calls[0].args[2]");
	equal(calls[0].context, obj, "calls[0].context");
	equal(calls[1].args[0], 1, "calls[1].args[0]");
	equal(calls[1].args[1], 2, "calls[1].args[1]");
	equal(calls[1].args[2], 3, "calls[1].args[2]");
	equal(calls[1].context, obj, "calls[1].context");
	equal(calls[2].args[0], 1, "calls[2].args[0]");
	equal(calls[2].args[1], 2, "calls[2].args[1]");
	equal(calls[2].args[2], 3, "calls[2].args[2]");
	equal(calls[2].context, obj, "calls[2].context");
	
});