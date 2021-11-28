import cheerio from "cheerio";
import request from "request";

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
// Venue Date Opponent result runs balls fours sixes strikerate

//home page
request(url, cb);

function cb(err, response, html) {
	if (err) {
		console.log(err);
	} else {
		extractLink(html);
	}
}

function extractLink(html) {
	let $ = cheerio.load(html);
	let anchorElem = $('a[data-hover="View All Results"]');
	let link = anchorElem.attr("href");
	let fullLink = "https://www.espncricinfo.com/" + link;
	getAllMatchesLink(fullLink);
}

function getAllMatchesLink(url) {
	request(url, function (err, response, html) {
		if (err) {
			console.log(err);
		} else {
			extractAllLinks(html);
		}
	});
}

function extractAllLinks(html) {
	let $ = cheerio.load(html);

	let scorecardElems = $("a[data-hover='Scorecard']");

	for (let i = 0; i < scorecardElems.length; i++) {
		let link = $(scorecardElems[i]).attr("href");

		let fullLink = "https://www.espncricinfo.com/" + link;
		console.log(fullLink);
	}
}
