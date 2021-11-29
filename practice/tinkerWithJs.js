let fs = require("fs");

//To read data
// let buffer = fs.readFileSync("./example.json");

// Another way to read data
let data = require("./example.json");

// let data = JSON.parse(buffer);
console.log(data);

data.push({
	name: "Thor",
	lastName: "Rogers",
	isAvenger: true,
	friends: ["Thor", "Peter", "Natasha"],
	age: 45,
	address: { city: "New York", state: "Manhattan" },
});

let stringData = JSON.stringify(data);
fs.writeFileSync("./example.json", stringData);
