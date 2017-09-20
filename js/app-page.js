var app = {
	cards: [],
}


$(document).ready(function() {
	// Create a bunch of art cards
	console.log("App");
	console.log("Cheat sheet");
	createCheatSheet2();

});



function createCheatSheet2() {
console.log("Create cheat sheet");
var holder = $("#cheat-holder");

	$.each(["sensor", "person", "content"], function(index, name) {

		var div = $("<div/>", {
			class: "type"
		}).appendTo(holder)

		createTile(div, name, false, "item-tile");

		var label = $("<div/>", {
			class: "item-label",
			html: name
		}).appendTo(div);


	});


holder.append("<br>");
	$.each(dataTypes, function(name, data) {

		var div = $("<div/>", {
			class: "item"
		}).appendTo(holder)

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


function createScenarios() {
	$.each(scenarios, function(index, data) {
		var div = $("<div/>", {
			class: "scenario card"
		}).appendTo($("#scenario-holder"))

		var header = $("<div/>", {
			class: "scenario-title",
			html: data.title
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