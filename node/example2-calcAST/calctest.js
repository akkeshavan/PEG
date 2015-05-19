var calc=require("./calcAst.js")

function testCalc(e){
	console.log("calc.parse("+e+")=>");
	var result=calc.parse(e);
	if(result.err)
		console.log(result.value);
	else{
		console.log("Polish: "+calc.polish(result.value));
		console.log("Result: "+ calc.evaluate(result.value))
		 
	}
};

function test(){
		var testData=["100"," 100+200",
		              "  100+3*2\n","4*5",
		              "\t 100+(30/6)*2",
		              "(100*2)",
		              "(((100*2)/4)+5)/5"];
		               
		testData.forEach(testCalc);
		console.log("Erroneous expressions:")
		var errorData=["100abc", "(100(30/6)*2"," "]
		errorData.forEach(testCalc);
}

test();