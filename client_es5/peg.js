   
 //with bind

 
var peg=( function(){
	//import pegData functions
	var isArray=function (a){
		return a && Object.prototype.toString.call(a) === '[object Array]';
    };
    
    var isError=function (tok){
    	return tok==null || tokenType(tok)=="error";
    }
	
    var append=function(ar,elem){
		ar.push(elem);
		return ar;
	}
	
	//import pegData functions
	var token=pegToken.token;
	var tokenElement=pegToken.tokenElement;
	var tokenType=pegToken.tokenType;
	var tokenValue=pegToken.tokenValue;
	var tokenLength=pegToken.tokenLength;
	var tokenToArgs=pegToken.tokenToArgs;
	var pickResult=pegToken.pickResult;

	var advance= function (prev,result){
		  
		  return !isError(result)? prev.slice(tokenLength(result)):prev;
		 };
	
		 //Combinator functions 

     var emptyAbs=function(){
    	 return function(str){
             return str==""? token("empty",""):token("error",null, str);
 			};
     };
     
     var matcherAbs=function (reg){
 		return function(str){
 			var match=str.match(reg);
 			return match?token("unit",match[0]):token("error",null,str);
 		};
 	};
     
     var empty=function(){
         return function(str){
        	 var spaces=str.match(/^\s+/);
        	 spaces=spaces?spaces[0]:"";
 			var start=str.slice(spaces.length);
            return start==""? token("empty","",null,spaces):token("error",null, str);
			};
	}
	 
 
    
	 
	
	var matcher=function (reg){
		return function (str){
			var spaces=str.match(/^\s+/) || "";
			spaces=spaces?spaces[0]:"";
			var start=str.slice(spaces.length);
			var match=start.match(reg);
			return match?token("unit",match[0],null,spaces):token("error",null,start);
		}
	};
	
	var or= function (one,theOther){
		return function(str){
			var r1=one(str) 
			return isError(r1)?theOther(str):r1;
		};

	};
	var seq=function(){
		var parsers=Array.prototype.slice.call(arguments);
		
		var sequence=parsers.reduce(function (p,c){
						               return bind(p,c);
		                               }
						            );
		
		return function(str){
			var ret=sequence(str);
			return !isError(ret)?token("seq",tokenElement(ret)):ret;
				                  
		};
	};
	
	var bind=function (first,second){
		return function(str){
			var result1=first(str);
			var result2=!isError(result1)? second(advance(str, result1)) 
					            :result1;
			if (isError(result2))
					return result2;
			else {
				var type=tokenType(result1);
				var elem=tokenElement(result1);
				if(type=="bind")
					return token("bind",append(elem,result2))
				else
					return token("bind",[result1,result2]);
			}
		};
	};
	
	 

	 
	
	 
	var rep=function(parser){
		return function (str){
			 	var repIter=function(nextStr,res){
			 		var result=parser(nextStr);
			 		return isError(result)?res:repIter(advance(nextStr,result),
		 			    		                        append(res,result));
			 	};
		 var temp=repIter(str,[]);
		 return token("rep",temp);
		};
	}
 

	var map= function(parser,mapfn){
		 return function (str){
			 var result=parser(str);
			 if(isError(result))
				 return result;
			 else {
				 
				 var elem= tokenToArgs(result);
				 var args= isArray(elem)?elem:[elem];
				 var ret= token("mapped",result,mapfn.apply(this,args));
				 return ret;
				 
			 };
		 };
	}
	
	 
	
	var entryPoint= function (parser){
		return function (str){
			var result=parser(str);
			if(isError(result)){
				const err=tokenValue(result);
			    const errStr= str.substring(0,str.length-err.length)+ "^^"+err;
				return {err:true, value:errStr};
				}
			else
			    return {err:false, value: pickResult(result)};
		};
	}
	
	 
	
	 
	return {
		//parser generator functions
		empty:empty,
		matcher: matcher,
		seq: seq,
		rep: rep,
		or:or,
		 
		map:map,
		 
		entryPoint: entryPoint,
		
		//not often used 
		emptyAbs:emptyAbs,
		matcherAbs:matcherAbs
	}
}());

console.log("peg.js loaded...");