function test(){
		var testData=["100","100+200",
		              "100+3*2","4*5",
		              "100+(30/6)*2",
		              "(100*2)",
		              "(100(30/6)*2", 
		              "(((100*2)/4)+5)/5"];
		               
		testData.forEach(function (e){
			console.log("calc.parse("+e+")=>");
			console.log(calc.parse(e));
		});
}

test();