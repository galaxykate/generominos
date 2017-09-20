/* 
 * Automatically generate cards with Puppeteer
 * Currently set up to work with *just* the Generominos base cards
 * so if exporting cards, disable the cheatsheet drawing in app.js
 */

console.log("doing puppeteer things!")


const puppeteer = require('puppeteer');

const dim = {
	x: 823,
	y: 597
};
const cardCount = 160;

const tileCount = 1;

(async() => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setViewport({
		width: tileCount * dim.x + 100,
		height: 597
	})
	await page.goto('file:///Users/Compton/Dropbox/Code/galaxykate/generominos/cardgenerator.html');

	var indices = [];
	for (var i = 0; i < cardCount; i++) {
		indices[i] = i;
	}

	for (let index of indices) {
		var x = index % tileCount;
		var y = Math.floor(index / tileCount)
		await page.screenshot({

			path: 'example' + index + '.png',
			clip: {
				x: x * dim.x + 10,
				y: y * dim.y + 10,
				width: dim.x,
				height: dim.y
			}
		});
	}


	await browser.close();
})();