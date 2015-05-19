
var Tree=function(type,left,right){
	var tree=function (t,l,r){
	 	this.type=type,this.left=l,this.right=r;
	 	return this;
	};
	 
	return new tree(type,left,right);
}
 
var Leaf=function (type,value){
	var leaf=function (t,v){
	 		this.type=t,this.value=v;
	};
	 
	return new leaf(type,value);
}
 


var calc=(function(){
 
	//import parser combinator library
 
var matcher=peg.matcher,
    or=peg.or,
    seq=peg.seq,
    rep=peg.rep,
    map=peg.map,
    empty=peg.empty,
	entryPoint=peg.entryPoint;
 
 

var num= map(matcher(/^[0-9]+/),function(v){ return Leaf("num",parseInt(v));});
var op=matcher(/^[\+|\-]/);
var multop=matcher(/^[\*|\/]/);
var lpar=matcher(/^\(/);
var rpar=matcher(/^\)/);

var nested= seq(lpar,function (a){ return expr(a)},rpar);
    
var nestedExpr= map(nested,function (open,e,close){return Leaf("NESTED",e);});

var factor= or(num,nestedExpr);
var term= map(seq(factor,rep(seq(multop,factor))), function (f,rList){
		                                          		return compute(f,rList);
													});



	 
var expr= map(seq(term,rep(seq(op,term))), function (t,rList){ 
	                                                  return compute(t,rList);}
                                                    );
var finalExpr=map(seq(expr,empty()),function (exp,nothing){ return exp;});

function compute(n1,opNumList){
	var result=n1;
	 
	
	for(var i=0;i<opNumList.length;i++){
		var oper=opNumList[i][0], n2=opNumList[i][1];
		result=operator(oper,result,n2);
	}
	 
	return result;
}

 

function operator(op,e1,e2){
	switch (op) {
	case "+": return Tree("+",e1,e2);
	case "-": return Tree("-", e1,e2);
	case "*": return Tree("*",e1,e2);
	case "/": return Tree("/",e1,e2);
	}
}

function evalAST(tree){
 
	switch (tree.type){
	case "+": return evalAST(tree.left)+ evalAST(tree.right);
	case "-": return evalAST(tree.left)- evalAST(tree.right);
	case "*": return evalAST(tree.left)*evalAST(tree.right);
	case "/": return evalAST(tree.left)/evalAST(tree.right);
	case "num": return tree.value;
	case "NESTED": return evalAST(tree.value);
	}
};

function polish(tree){
	 
	switch (tree.type){
	case "+": return "+"+polish(tree.left)+" "+ polish(tree.right);
	case "-": return "-"+polish(tree.left)+" "+polish (tree.right);
	case "*": return "*"+polish(tree.left)+" "+polish (tree.right);
	case "/": return "/"+polish(tree.left)+" "+polish (tree.right);
	case "num": return tree.value.toString();
	case "NESTED": return "("+ polish(tree.value)+")";
	}
};

 
var parse= function (str){
    var result=entryPoint(finalExpr)(str);
    return result;
};

return {
	parse: parse,
	        
	evaluate: evalAST,
	polish: polish
	};
}());