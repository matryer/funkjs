module("functions");

test("Functions as arguments", function(){
	
	var f1 = function(){};
	var f2 = function(){};
	var f3 = function(){};
	
	var all = funk.functions(f1, f2, f3);
	
	equal(all.length, 3, "all.length");
	equal(all[0], f1, "all[0]");
	equal(all[1], f2, "all[1]");
	equal(all[2], f3, "all[2]");
	
});

test("Functions in arrays", function(){
	
	var f1 = function(){};
	var f2 = function(){};
	var f3 = function(){};
	
	var a1 = [f1, f2];
	var a2 = [f3];
	
	var all = funk.functions(a1, a2);
	
	equal(all.length, 3, "all.length");
	equal(all[0], f1, "all[0]");
	equal(all[1], f2, "all[1]");
	equal(all[2], f3, "all[2]");
	
});

test("Functions in arrays and arguments mixed", function(){
	
	var f1 = function(){};
	var f2 = function(){};
	var f3 = function(){};
	var f4 = function(){};
	var f5 = function(){};
	var f6 = function(){};
	
	var a1 = [f2, f3];
	var a2 = [f5];
	
	var all = funk.functions(f1, a1, f4, a2, f6);
	
	equal(all.length, 6, "all.length");
	equal(all[0], f1, "all[0]");
	equal(all[1], f2, "all[1]");
	equal(all[2], f3, "all[2]");
	equal(all[3], f4, "all[2]");
	equal(all[4], f5, "all[2]");
	equal(all[5], f6, "all[2]");
	
});