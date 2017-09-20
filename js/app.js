var app = {
	cards: [],
}



$(document).ready(function() {


	createCheatSheet();
	var cards = [];

	var typeCount = 0;

	$.each(dataTypes, function(name, data) {
		data.in = 0;
		data.out = 0;
	});

	$.each(cardData, function(type, typeData) {

		$.each(typeData, function(index, data) {

			// Create the cards
			var c = new Card(data, type, typeCount)
			cards.push(c);

		});

		typeCount++;
	});


	createScenarios();
	//shuffle(cards);


	var cardHolder = $("#card-holder");

	cards = cards.slice(0, 200)

	cards.forEach(function(card, index) {
		card.div = card.createCard(cardHolder);
	});



});


// Create the top cheat sheet
function createCheatSheet() {
	var holder = $("#cheat-holder");

	var infoHeader = $("<div/>", {
		class: "title"
	}).appendTo(holder);

	var typeHolder = $("<div/>", {}).appendTo(holder);

	var title = $("<div/>", {
		class: "card-back-title",
		html: "Generominos"
	}).appendTo(infoHeader)

	var subtitle = $("<div/>", {
		html: "generative ideation cards by GalaxyKate<br>www.galaxykate.com/generominos<br><span id='license'>Creative Commons under the <a href='http://creativecommons.org/licenses/by-sa/4.0/'>Attribution-ShareAlike 4.0 International</a> license<br>Copyright Kate Compton, 2017</span>",
		class: "card-back-subtitle",
	}).appendTo(infoHeader)

	var instruction = $("<div/>", {
		class: "data-instruction",
		html: "Generominos are here to help you design your interactive artwork, alt-control game, or generative art experiment!<p>Each card represents a step in a generative pipeline that transforms <b>input data</b> into <b>output data</b>. Inputs and outputs have <b>data types</b>, and not all data types are compatible! If you have a card producing <b>geolocation</b> data, and want to use that in a card that needs <b>text</b> input, you'll need a card to convert that data into the right output type.<p>To design a pipeline, connect some number of <b>input cards</b> (they have a blue bar at the top) to some number of <b>output cards</b> (with a red bar at the top), passing vertically through as many conversion cards as you need to along the way.<p>Is your design not quite exciting enough? Add <b>input modifiers</b> (white cards with a blue bar at the top) horizontally next to your input cards.  The input icons at the top will suggest ways that these can link together. <p>Or add <b>output modifiers</b> (white cards with a red bar at the bottom) next to your outputs. What if the output were giant? Or on your body? Or hidden somewhere?<p>If you need inspiration, draw one of the <b>scenario cards</b>, each of which has a real-world design challenge on it.  You can also use these cards to play a\"Cards Against Humanity\" variation, where one player acts as the granting agency with a design need, and the other players attempt to propose designs to get their approval.<p><div id='signature'>I hope you enjoy using these, they were a lot of fun to design. -Kate Compton (galaxykate)</div>"
	}).appendTo(infoHeader)


	var div = $("<div/>", {
		class: "data-description",
		html: "Pro-tip! Data with the same symbol is compatible. Data in the same family (with the same color) is often compatible with a little tweaking"
	}).appendTo(typeHolder)



	$.each(dataTypes, function(name, data) {


		var div = $("<div/>", {
			class: "item"
		}).appendTo(typeHolder)
		if (data.isSensor) {
			div.addClass("item-sensor");
		}

		div.css({
			backgroundColor: data.faint
		})

		createTile(div, name, false, "item-tile");

		var label = $("<div/>", {
			class: "item-label",
			html: name
		}).appendTo(div);

		var desc = $("<div/>", {
			class: "item-description",
			html: data.desc
		}).appendTo(div);


	});
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

function createScenarios() {

	shuffle(scenarios)
	$.each(scenarios, function(index, data) {
		var div = $("<div/>", {
			class: "scenario card"
		}).appendTo($("#scenario-holder"))

		var h2 = index * 23;
		var h1 = index * 23 + 20;

		div.css({
			background: "hsla(" + h2 + ", 90%, 90%, 1)",
			border: "10px solid hsla(" + h2 + ", 90%, 80%, 1)"
		})



		var header = $("<div/>", {
			class: "scenario-title",
			html: data.title,
		}).appendTo(div)

		var details = $("<div/>", {
			class: "scenario-details",
			html: data.constraints.split("|").map(s => "<div class='scenario-constraint'>" + s + "</div>").join("")
		}).appendTo(div);
	})
}

function parseParens(s) {
	var i0 = s.indexOf("(");

	var i1 = s.indexOf(")");
	if (i0 > -0 && i1 >= 0) {
		return [s.substring(0, i0).trim(), s.substring(i0 + 1, i1).trim(), s.substring(i1).trim()]
	}
	return [s.trim()];
}


function parseSockets(raw) {
	if (raw === undefined)
		return [];

	if (!Array.isArray(raw)) {
		raw = splitOnUnprotected(raw, " ");
	}
	return raw.map(function(s) {
		var s2 = parseParens(s)

		var optional = false;
		var type = s2[0];
		if (type.charAt(0) === "*") {
			optional = true;
			type = type.substring(1);
		}

		var socket = {
			type: type,
			optional: optional
		}
		if (s2.length > 1) {
			socket.label = s2[1]
		}
		return socket
	})
}