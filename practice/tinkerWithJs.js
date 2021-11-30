let fs = require("fs");
let xlsx = require("xlsx");

//To read data
// let buffer = fs.readFileSync("./example.json");

// Another way to read data
let data = require("./example.json");

// let data = JSON.parse(buffer);
// console.log(data);

// data.push({
// 	name: "Thor",
// 	lastName: "Rogers",
// 	isAvenger: true,
// 	friends: ["Thor", "Peter", "Natasha"],
// 	age: 45,
// 	address: { city: "New York", state: "Manhattan" },
// });

// let stringData = JSON.stringify(data);
// fs.writeFileSync("./example.json", stringData);

function excelWriter(filePath, json, sheetName) {
	// Write Excel File
	// //wb -> filePath, ws -> name,json data
	let newWB = xlsx.utils.book_new();

	// json data -> excel format convert
	let newWS = xlsx.utils.json_to_sheet(json);
	// newWB , ws,sheetname
	xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
	//file path
	xlsx.writeFile(newWB, filePath);
}

function excelReader(filePath, sheetName) {
	if (fs.existsSync(filePath) == true) {
		return [];
	}
	//READ
	//workbook get
	let wb = xlsx.readFile(filePath);
	//sheet
	let excelData = wb.Sheets[sheetName];
	//sheet data get
	let ans = xlsx.utils.sheet_to_json(excelData);
}

let wb = xlsx.readFile("abc.xlsx");
//sheet
let excelData = wb.Sheets["sheet-1"];
//sheet data get
let ans = xlsx.utils.sheet_to_json(excelData);
console.log(ans);