import cheerio from "cheerio";
import request from "request";

const url =
	"https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
// Venue Date Opponent result runs balls fours sixes strikerate

//home page
request(url, cb);

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
	console.log(venue);
	console.log(date);
	console.log(result);
}
