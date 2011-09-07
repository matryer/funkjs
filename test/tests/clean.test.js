module("clean");

test("clean recursivly removes funky goings ons", function(){
	
	var original = function(){};
	var one = function(){};
	var two = function(){};
	
	two.func = one;
	one.func = original;
	
	one.funky = true;
	two.funky = true;
	
	// clean 'two' and we should get 'original'
	var clean = funk.clean(two);
	
	equal(clean, original, "cleaning deep nested func should find the original");
	
});

test("function(){}.clean()", function(){
	
	ok(function(){}.clean, "function(){}.clean should exist");
	
	var original = function(){};
	var one = function(){};
	var two = function(){};
	
	two.func = one;
	one.func = original;
	
	one.funky = true;
	two.funky = true;
	
	// clean 'two' and we should get 'original'
	var clean = two.clean();
	
	equal(clean, original, "function(){}.clean() deep nested func should find the original");
	
});