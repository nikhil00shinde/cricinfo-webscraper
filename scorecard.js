const request = require("request");
const cheerio = require("cheerio");

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
			}
		}
	}
	// console.log(htmlString);
}

module.exports = {
	ps: processScorecard,
};
