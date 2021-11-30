const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

// const url =
// 	"https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
// Venue Date Opponent result runs balls fours sixes strikerate

//home page
function processScorecard(url) {
	request(url, cb);
}

function cb(err, response, html) {
	if (err) {
		console.log(err);
	} else {
		extractMatchDetails(html);
	}
}

function extractMatchDetails(html) {
	// Venue Date Opponent result runs balls fours sixes strikerate
	//ipl
	//team
	//player
	//date opponent result runs balls fours sixes strikerate venue date result

	//venue date -> .header-info .description
	//result -> .event .status-text

	let $ = cheerio.load(html);
	let descElem = $(".header-info .description").text();
	let result = $(".event .status-text").text();
	let stringArr = descElem.split(",");
	let venue = stringArr[1].trim();
	let date = stringArr[2].trim();

	let innings = $(".card.content-block.match-scorecard-table > .Collapsible ");
	let htmlString = "";
	for (let i = 0; i < innings.length; i++) {
		// htmlString += $(innings[i]).html();
		//team opponent
		let teamName = $(innings[i]).find("h5").text();
		teamName = teamName.split("INNINGS")[0].trim();
		let opponentIndex = i == 0 ? 1 : 0;

		let opponentName = $(innings[opponentIndex]).find("h5").text();
		opponentName = opponentName.split("INNINGS")[0].trim();
		// console.log(teamName);
		// console.log(opponentName);

		let cInnings = $(innings[i]);
		let allRows = cInnings.find(".table.batsman tbody tr");
		for (let j = 0; j < allRows.length; j++) {
			let allCols = $(allRows[j]).find("td");
			let isWorthy = $(allCols[0]).hasClass("batsman-cell");

			if (isWorthy == true) {
				// players runs balls fours sixes strikerate
				let playerName = $(allCols[0]).text().trim();
				let runs = $(allCols[2]).text().trim();
				let balls = $(allCols[3]).text().trim();
				let fours = $(allCols[5]).text().trim();
				let sixes = $(allCols[6]).text().trim();
				let sr = $(allCols[7]).text().trim();

				console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);

				processPlayer(
					teamName,
					playerName,
					runs,
					balls,
					fours,
					sixes,
					sr,
					opponentName,
					venue,
					date,
					result
				);
			}
		}
	}
	// console.log(htmlString);
}

function processPlayer(
	teamName,
	playerName,
	runs,
	balls,
	fours,
	sixes,
	sr,
	opponentName,
	venue,
	date,
	result
) {
	let teamPath = path.join(__dirname, "ipl", teamName);
	dirCreater(teamPath);

	let filePath = path.join(teamPath, playerName + ".xlsx");
	let content = excelReader(filePath, playerName);
	let playerObj = {
		teamName,
		playerName,
		runs,
		balls,
		fours,
		sixes,
		sr,
		opponentName,
		venue,
		date,
		result,
	};
	content.push(playerObj);
	excelWriter(filePath, content, playerName);
}

function dirCreater(filePath) {
	if (fs.existsSync(filePath) == false) {
		fs.mkdirSync(filePath);
	}
}
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
	if (fs.existsSync(filePath) == false) {
		return [];
	}
	//READ
	//workbook get
	let wb = xlsx.readFile(filePath);
	//sheet
	let excelData = wb.Sheets[sheetName];
	//sheet data get
	let ans = xlsx.utils.sheet_to_json(excelData);
	return ans;
}

module.exports = {
	ps: processScorecard,
};
