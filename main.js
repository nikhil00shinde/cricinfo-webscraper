import cheerio from "cheerio";
import request from "request";

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
// Venue Date Opponent result runs balls fours sixes strikerate

import { getAllMatchesLink } from "./Allmatch.js";

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
