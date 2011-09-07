module("bind");

test("funk.bind returns funky function", function(){
	
	var f = function(){};
	var b = f.bind(123);
	
	equal(b.funky, true, "funky should be true");
	
});

test("funk.bind retains context", function(){
        
        var context = null;
        var f = function(){ context = this; };

        var obj1 = {};
        var obj2 = {};
        
        var boundToObj1 = funk.bind(f, obj1);
        var boundToObj2 = funk.bind(f, obj2);

        // make sure the result of bind is a function
        equals(typeof boundToObj1, "function", "objx.bind must return a function.");
        equals(typeof boundToObj2, "function", "objx.bind must return a function.");
        
        boundToObj1();
        equals(context, obj1, "Context must get bound correctly with objx.bind");

        boundToObj2();
        equals(context, obj2, "Context must get bound correctly with objx.bind");
        
});

test("funk.bind argument handling", function(){
        
        var c = {
                args: []
        };
        
        // a function that adds the arguments to args
        var f = function(){
                for (var i = 0; i < arguments.length; i++)
                        this.args.push(arguments[i]);
        };
        
        var f2 = funk.bind(f, c, 1, 2, 3, 4, 5);
        
        f2(6, 7);
        f2(8, 9);
        
        equals(c.args[0], 1, "Arguments should be passed in the right order.");
        equals(c.args[1], 2, "Arguments should be passed in the right order.");
        equals(c.args[2], 3, "Arguments should be passed in the right order.");
        equals(c.args[3], 4, "Arguments should be passed in the right order.");
        equals(c.args[4], 5, "Arguments should be passed in the right order.");
        equals(c.args[5], 6, "Arguments should be passed in the right order.");
        equals(c.args[6], 7, "Arguments should be passed in the right order.");
        
        equals(c.args[7], 1, "Arguments should be passed in the right order.");
        equals(c.args[8], 2, "Arguments should be passed in the right order.");
        equals(c.args[9], 3, "Arguments should be passed in the right order.");
        equals(c.args[10], 4, "Arguments should be passed in the right order.");
        equals(c.args[11], 5, "Arguments should be passed in the right order.");

        equals(c.args[12], 8, "Arguments should be passed in the right order.");
        equals(c.args[13], 9, "Arguments should be passed in the right order.");

});

test("funk.bind keeps reference to the target function", function(){
        
        var orig = function(){};
        var context = {};
        var arg1 = {};
        var arg2 = {};
        var bound = funk.bind(orig, context, arg1, arg2);
        
        ok(bound.func, "bound.func should exist");
        equal(typeof bound.func, "function", "bound.func should be a function");
        
        equals(bound.func, orig);
        equals(bound.context, context);
        equals(bound.args[0], arg1);
        equals(bound.args[1], arg2);
        
});

test(".bind command added to function prototype", function(){

        ok(function(){}.bind, "function(){}.bind should exist.");

});


test("function(){}.bind calls funk.bind", function(){
        
        // stub funk.bind
        var callToBindArgs = null;
        var boundFunction = function(){};
        
				funk.old_bind = funk.bind;
        funk.bind = function(){
                callToBindArgs = arguments;
                
                return boundFunction;
                
        };
        
        var func = function(){ return this; };
        var context = {};
        var arg = {};
        var bound = func.bind(context, arg);
        
        ok(callToBindArgs, "function(){}.bind should have called funk.bind");
        equals(bound, boundFunction, "function(){}.bind should return bound object");
        equals(typeof bound, "function", "function(){}.bind should return bound object (which should be a function)");
        
        equals(func, callToBindArgs[0], "function(){}.bind should call funk.bind with function as first argument.");
        equals(context, callToBindArgs[1], "function(){}.bind should call funk.bind with function as second argument.");
        equals(arg, callToBindArgs[2], "function(){}.bind should call funk.bind with function as third argument.");
        
        // put funk.bind back
        funk.bind = funk.old_bind;
        
});

test(".clean() gets rid of bindings", function(){
	
	var f = function(){};
	var b = f.bind(123);
	
	var clean = funk.clean(b);
	
	equal(f, clean, "clean() should undo bind")
	
});