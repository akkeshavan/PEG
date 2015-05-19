
 var peg=require("../peg/peg.js");
 
 
	//import parser combinator library
 
var matcher=peg.matcher,
    or=peg.or,
    seq=peg.seq,
    rep=peg.rep,
    map=peg.map,
    empty=peg.empty,
	entryPoint=peg.entryPoint;
 
 

var num= map(matcher(/^[0-9]+/),function(v){ return parseInt(v);});
var op=matcher(/^[\+|\-]/);
var multop=matcher(/^[\*|\/]/);
var lpar=matcher(/^\(/);
var rpar=matcher(/^\)/);

var nested= seq(lpar,function (a){ return expr(a)},rpar);
    
var nestedExpr= map(nested,function (open,e,close){return e;});

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
		result=evaluate(oper,result,n2);
	}
	return result;
}

 

function evaluate(op,e1,e2){
	switch (op) {
	case "+": return e1+e2;
	case "-": return e1-e2;
	case "*": return e1*e2;
	case "/": return e1/e2;
	}
}

module.exports={
	parse: function (str){
	            var result=entryPoint(finalExpr)(str);
	            if(result.err)
	            	return "error:"+result.value;
	            return result.value;
			}
	};
