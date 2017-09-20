// Parse text, but also visualize the parsing
var openProtectors = "#[(";
var closeProtectors = "#])";



// http://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '\\&quot;',
	"'": '&#39;',
	"/": '&#x2F;',
	"\\": '\\\\'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/\\]/g, function(s) {
		return entityMap[s];
	});
}


// [name:I,"]
function parseAction(s) {
	var sections = splitIgnoreEscaped(s, ":");
	if (sections[1] === "POP") {
		return {
			targetKey: sections[0],
			action: sections[1],
		}
	}

	var s = {
		targetKey: sections[0],
		targetRules: splitIgnoreEscaped(sections[1], ","),
	}
	return s;
}

function parseModifier(s) {
	return {
		name: s,
		parameters: [],
	};
}

// rule format:
// text
// [action] text #tag#
function parseRule(s) {
	var parsed = {
		sections: [],
		errors: [],
	};
	var last = 0;
	var escaped = false;
	// Go through s and split on any non-protected
	for (var i = 0; i < s.length; i++) {
		if (!escaped) {

			var c = s.charAt(i);
			if (c === "\\")
				escaped = true;

			if (openProtectors.indexOf(c) >= 0 && c !== "(") {

				var next = findNextBaseLevel(s, openProtectors, closeProtectors, i);
				if (!next.errors && next > i) {
					parsed.sections.push({
						text: s.substring(last, i),
						type: 0
					});
					parsed.sections.push({
						text: s.substring(i + 1, next),
						type: openProtectors.indexOf(c) + 1,
					});
					i = next;
					last = i + 1;
				} else
					parsed.errors = parsed.errors.concat(next.errors);
			}
		} else {
			escaped = false;
		}

	}
	parsed.sections.push({
		text: s.substring(last, i),
		type: 0
	});



	parsed.sections = parsed.sections.filter(function(s) {
		if (s.type === 1) {
			var parsedTag = parseTag(s.text);
			s.key = parsedTag.key;
			s.errors = parsedTag.errors;
			s.modifiers = parsedTag.modifiers;
			s.preactions = parsedTag.actions;
		}

		if (s.type === 2) {
			var parsedAction = parseAction(s.text);
			s.targetKey = parsedAction.targetKey;
			s.errors = parsedAction.errors;
			s.action = parsedAction.action;
			s.targetRules = parsedAction.targetRules;
		}

		return s.text.length > 0;
	});

	//console.log(s, parsed);

	return parsed;
}



// tag format:
// #key#
// #key.mod#
// #key.mod(#otherKey#,5,foo)#
// #[foo:bar]key.mod#
// #[OPTIONAL:ACTION#TAGS.CRAP[FOO]#]CHARACTERS.MOD.MOD(PARAMS,RULES[]#TAGS#)#
// Order of operations to parse:
//   get first bracket
function parseTag(s) {
	var parsed = {
		errors: [],
		key: undefined,
		modifiers: [],
		actions: []
	}

	s = s.trim();
	// Search for the first color

	var count = 0;
	while (s.charAt(0) === "[" && count < 10) {

		var index = findNextBaseLevel(s, openProtectors, closeProtectors);
		if (index.errors) {
			parsed.errors = parsed.errors.concat(index.errors);
			break;
		}
		parsed.actions.push(s.substring(1, index));
		s = s.substring(index + 1, s.length);
		count++;
	}


	var last = 0;
	// Go through s and split on any non-protected
	var sections = [];
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (c === ".") {
			// split
			sections.push(s.substring(last, i));
			last = i + 1;
			//consol.elog("split" + )
		}

		if (openProtectors.indexOf(c) >= 0) {

			var next = findNextBaseLevel(s, openProtectors, closeProtectors, i);
			if (!next.errors && next > i) {
				i = next;
			} else
				parsed.errors = parsed.errors.concat(next.errors);
		}
	}
	sections.push(s.substring(last, i));

	parsed.key = sections[0];
	parsed.modifiers = sections.slice(1);
	// Further parse modifiers 
	parsed.modifiers = parsed.modifiers.map(function(raw) {
		return parseModifier(raw);
	});


	return parsed;


}



function findNextBaseLevel(s, openProtectors, closeProtectors, startIndex) {
	var lvls = [];
	var escaped = false;
	if (!startIndex)
		startIndex = 0;
	for (var i = startIndex; i < s.length; i++) {
		var c = s.charAt(i);
		if (!escaped) {
			if (c === "\\")
				escaped = true;
			else {

				// Does it close a previous one?
				if (c === lvls[lvls.length - 1]) {
					lvls.pop();
					if (lvls.length === 0)
						return i;
				} else {

					// Is it a new protector?
					var p0 = openProtectors.indexOf(c);

					// Ignore parens not in tags
					if (c === "(" && lvls[lvls.length - 1] != "#") {
						p0 = -1;
					}

					if (p0 >= 0) {
						lvls.push(closeProtectors[p0]);

					} else {

					}

				}

			}
		} else {
			escaped = false;
		}
	}

	return {
		errors: "Error parsing: " + s + ", missing: " + lvls
	};
}

function splitIgnoreEscaped(s, split) {
	var sections = [];
	var escaped = false;
	var last = 0;
	var sections;
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (!escaped) {
			if (c === "\\") {
				escaped = true;
			}

			if (c === split) {
				sections.push(s.substring(last, i));
				last = i + 1;
			}
		} else {
			escaped = false;
		}
	}
	sections.push(s.substring(last, i));
	return sections;
}

function spacer(count) {
	var s = "";
	for (var i = 0; i < count; i++) {
		s += " ";

	}
	return s;
}