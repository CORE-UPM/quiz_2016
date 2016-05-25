var net = require ("net");

var port = process.argv[2] || 8000;
var fs = require ("fs");
var server = net.createServer (function (socket) {
	
	if (process.argv.length !== 3){
console.log("Sintaxis incorrecta");
process.exit();

	}



	socket.setEncoding ("utf-8");

socket.on("data", function(data){

	var x = data.split("'");
	var nombre= x[1];
	var tlf = x[2];
	
	if(x[0].substring[0,3]=="get"){

		fs.readfile(
process.argv[2],
"utf-8",
fuction(err, data ){

	if(err) {throw err;}
	var entries = process.argv[2].split ("\n");

	for (var i=0; i<entries.length; i++){
var b= entries[i].split(",");
if (b[0]==nombre){

	socket.write(b[1]);
}
if(i>=entries.length-1 && b[0]!=nombre ) { socket.write("KO");}

}


}
);
}

if(x[0].substring[0,3]=="set"){
	fs.readfile(
process.argv[2],
"utf-8",
fuction(err, data ){

	if(err) {throw err;}
	

//   escribir en el archivo process.argv[2] el nombre y el tlf

		);



}


}

if(x[0].substring[0,3]=="qui") {process.exit();}

);
}
);

