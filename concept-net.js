//done by Deyuan Tang(Lance) 12/12/2019

const Data = require('./Data.js');
const data = new Data();
//search if parent already exist in object, if yes, append it under the right path
function exist(a,b,c){//a is string, b is object,c is temp
	for (var key in b){
		if (a == key){
			bool = true;
			for (var k in c){
				b[a][k] = c[k];
			}
		}else{
			exist(a,b[key],c);
		}
	}
	return bool;
}
function queryAnItem(term){
	var res = {[term]:{}}; //initialize result to {}
	var n = 3;
	while (n >0){
		var countOfHighestLevel = 0;//if an item does not have any parent, count ++, if count equals to the number of object,break loop
		for (var key in res){
			term = key;
			var dirs = data.getTerm(term);
			if (dirs == null || dirs.length == 0){
				countOfHighestLevel += 1;
				continue;
			}
			let temp = JSON.parse(JSON.stringify(res[key]));//clone res
			temp = {[key]:temp}
			delete res[key]; //delete cloned item
	//while there are more than one child in parents
			for (var j in dirs){
				bool = false;
				if(exist(dirs[j],res,temp)){
				//if key already in res, append it under that key
					continue;
				}else{
					res[dirs[j]] = temp;
				}
			}
		}
		if(countOfHighestLevel >= Object.keys(res).length){
			break;
		}
	}
	var obj = JSON.stringify(res,null,2);
	return obj;
}
console.log(queryAnItem("saturn"));
