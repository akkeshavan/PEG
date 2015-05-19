


var token=function(type,element,value,ws){
	value= value==undefined?null:value;
	return [type,element,value,ws || "" ];
};

var tokenType=function (tok){
	 
	return  tok[0];
};

var tokenElement=function (tok){
	 
	return tok[1];
};


var tokenValue=function (tok){
 
	return tok[2];
};

var tokenWhites=function (tok){
	return tok[3];
}

var tokenLength=function(tok){
		 var element=tokenElement(tok);
		 switch (tokenType(tok)){
		 
		 case "empty": return 0;
		 case "unit": return element.length+tokenWhites(tok).length;
		 case "seq":  return element.length? element.reduce(function (p,c){
			                                                  return p+tokenLength(c);
		                                                      },0):0;
		 case "bind": return element.length? element.reduce(function (p,c){
              													return p+tokenLength(c);
         														},0):0;
		 case  "rep":  return element.length? element.reduce(function (p,c){
			 														return p+tokenLength(c);
		                                                      },0):0;
			 				
		 case  "mapped":return tokenLength(element);
		 
		 };
	 };
 

var tokenToArgs=function(tok){
		 var element=tokenElement(tok);
		 switch(tokenType(tok)){
		    case "error": return null;
		    case "empty": return "";
		    case "unit": return element;
		    case "mapped": return tokenValue(tok);
		    case "seq": return element.map(function (e) {return tokenToArgs(e);});
		    case "rep": return element.map(function(e) {return tokenToArgs(e);});
		 };
	 };
	 
	 var pickResult=function(tok){
		 var element=tokenElement(tok);
		 switch(tokenType(tok)){
		    case "error": return tokenValue(tok);
		    case "empty": return "";
		    case "unit": return element;
		    case "mapped": return tokenValue(tok);
		    
		    case "seq": return element.map(function (e){pickResult(e)});
		 };
	 };
	 
	 
	 
	 
module.exports= {
		token:token,
		tokenType:tokenType,
		tokenElement:tokenElement,
		tokenValue:tokenValue,
		tokenLength:tokenLength,
		tokenToArgs:tokenToArgs,
		pickResult:pickResult
		
	 };
 

console.log("loaded pegtoken.js");
/*
function tokenTest(){
	var u1=pegToken.token("unit","100");
	var u2=pegToken.token("unit","+");
	var u3=pegToken.token("unit","3000");
	var s=pegToken.token("seq",[u1,u2,u3]);
	var s1=pegToken.token("seq",[u2,u3]);
	var r=pegToken.token("rep",[s1,s1]);
	var s2=pegToken.token("seq",[u1,r]);
	
	var ar=  [u1,u2,u3,s,s1,r,s2]
	ar.forEach(function (e){
		console.log("token =>");
		console.log(e);
		console.log("length=>"+pegToken.tokenLength(e));
	});
	       
};

tokenTest();
*/

 

 