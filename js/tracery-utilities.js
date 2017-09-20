var operators = ["&&", "||", "!", "!=", "==", "<=", ">=", ">", "<", "+", "-", "/", "*", "%", "^"];


/*
 * UTILITY
 * Split the string into top-level sections
 * Some open-chars open a new section
 */

function splitIntoTopSections(s, type, errors) {


	if (typeof s !== 'string')
		console.warn("non-string", s);


	// Initialize the section list
	var sections = [];
	var start = 0;

	parseProtected(s, {
		// Open and close section handlers
		onCloseSection: function(section) {

			// Open top-level sections only

			if (section.depth === 1) {


				sections.push({
					depth: 1,
					start: section.start,
					end: section.end,
					inner: section.inner,
					openChar: section.context.open
				});
				start = section.end + 1;

			}
		},

		onOpenSection: function(section) {


			if (section.depth === 1) {

				// Make a base-level section from the last section to the start of this one

				sections.push({
					depth: 0,
					start: start,
					end: section.start,
					inner: s.substring(start, section.start - 1)
				});
				start = section.start;

			}
		},
		onError: function(error) {
			console.warn(error);
			if (errors !== undefined) {
				errors.push(error);
			}
		}
	}, type);

	// Add the last section
	sections.push({
		depth: 0,
		start: start,
		end: s.length,
		inner: s.substring(start)
	});

	// Ignore empty sections
	sections = sections.filter(s => s.inner.length > 0)

	return sections;
}


/*
 * Utility: split this string on unprotected characters
 * Take: a string
 * splitters: a string or array of strings
 * saveSplitters: if true, return the splitters with the sections
 */

function splitOnUnprotected(s, splitters, saveSplitters, settings) {

	if (typeof s !== 'string')
		console.warn("non-string", s);

	if (s.length === 0)
		return [];

	if (!settings)
		settings = {};

	if (typeof splitters === 'string' || splitters instanceof String)
		splitters = [splitters];

	var sections = [];
	var lastSplitterEnd = 0;

	settings.onChar = function(c, index, depth) {


		// If at an unprotected level, 
		// *and* we're no longer in a splitter (for ambiguous splitters like "::" and ":")
		// This uses a greedy algorithm, so might miss 'optimal' splits
		if (depth === 0 && index >= lastSplitterEnd) {
			var splitter = undefined;

			// Find the longest valid splitter
			var maxLength = 0;
			for (var i = 0; i < splitters.length; i++) {

				var s2 = splitters[i];
				if (s.startsWith(s2, index) && s2.length > maxLength) {
					splitter = {
						splitterIndex: i,
						index: index,
						splitter: s2,
					}
					maxLength = s2.length;
				}
			}

			if (splitter) {
				var s3 = s.substring(lastSplitterEnd, index);
				sections.push(s3);
				lastSplitterEnd = index + splitter.splitter.length;

				// Add the splitter to the array if we want to record it
				if (saveSplitters) {
					sections.push(splitter);
				}
			}
		}
	};

	parseProtected(s, settings);
	sections.push(s.substring(lastSplitterEnd));
	return sections;
}


/*
 * Get indices of unprotected
 * Find each unprotected query
 * settings 
 * simplifiedResults: return only the indices, not which query was found
 */

function getUnprotectedIndices(s, queries, settings) {


	if (settings === undefined)
		settings = {};

	// wrap single queries in an array
	if (typeof queries === 'string' || queries instanceof String)
		queries = [queries];
	var indices = [];
	var start = 0;


	settings.onChar = function(c, index, depth) {



		if (index >= start && depth === 0) {

			var found = [];

			// Check which queries can be found from this index
			var maxLength = 0;
			for (var i = 0; i < queries.length; i++) {
				// Record all queries found
				// for ambiguous queries ("startling" for "s", "star", "start", etc), 
				//    choose the first, unless settings say otherwise
				if (s.startsWith(queries[i], index)) {
					found.push([i, queries[i]]);
					// skip the rest if we're prioritizing just by first found
					if (!settings.prioritizeLongest && !settings.getAll)
						break;
				}
			}

			if (found.length > 0) {

				if (settings.prioritizeLongest) {
					found.sort(function(a, b) {
						return a[1].length - b[1].length;
					})
				}

				if (!settings.getAll) {
					found = found.slice(0, 1);
					start = index + found[0][1].length;
				}

				for (var i = 0; i < found.length; i++) {
					// add to the index list
					if (settings && settings.simplifiedResults) {
						indices.push(index);
					} else {
						indices.push({
							index: index,
							query: found[i][1],
							queryIndex: found[i][0],
						});
					}
				}
			}
		}
	};

	parseProtected(s, settings);

	return indices;
}



/*
 * UTILITY Hero function
 * Runs all the parsing stuff
 * "#foo[bar(baz + '#')][test:he's ok (I think)][color:'red']"
 *
 * Handlers: onChar, onError, onOpenSection, onCloseSection, onEnd
 */

function parseProtected(s, sectionHandlers, contextChar) {



	var ruleChars = ["#", "[", "{", "("];
	var context = {

		"[": {
			open: "[",
			close: "]",
			openChars: ["'", "\"", "(", "#", "["],
		},
		"#": {
			open: "#",
			close: "#",
			openChars: ["{", "(", "["],
		},
		"{": {
			open: "{",
			close: "}",
			openChars: ruleChars
		},
		"'": {
			open: "'",
			close: "'",
			openChars: ruleChars,
		},
		"\"": {
			open: "\"",
			close: "\"",
			openChars: ruleChars,
		},

		// Expressions? Parameters?
		"(": {
			open: "(",
			close: ")",
			openChars: ["(", "#", "[", "'", "\""],
		}
	}



	var closeChars = {
		"]": "[",
		"}": "{",
		")": "(",
		"#": "#",
		"'": "'",
		"\"": "\""
	}


	var currentContext = {
		openChars: ruleChars,
	};

	if (contextChar) {
		currentContext.openChars = context[contextChar];
		if (context[contextChar] === undefined) {
			console.warn("No context for parsing ", contextChar);
		}
	}


	var topSection;
	var sectionStack = [{
		context: currentContext
	}];
	var escaped = false;

	for (var i = 0; i < s.length; i++) {

		// Ignore the escape chars
		if (escaped) {
			escaped = false;
		} else {

			var c = s.charAt(i);

			// Deal with escape char
			if (c === "\\")
				escaped = true;

			else {

				if (sectionHandlers.onChar)
					sectionHandlers.onChar(c, i, sectionStack.length-1, s);

				// Does this close the current context (top priority)?
				if (c === currentContext.close) {

					// CLOSE A SECTION
					topSection.end = i;
					topSection.inner = s.substring(topSection.start, topSection.end);
				//	console.log(getTabSpacer(topSection.depth) + "CLOSE  " + topSection.depth + " " + topSection.context.open + "     " + inQuotes(topSection.inner) + "     " + topSection.context.close);

					if (sectionHandlers.onCloseSection)
						sectionHandlers.onCloseSection(topSection);

					sectionStack.pop();
					topSection = sectionStack[sectionStack.length - 1];
					currentContext = topSection.context;

				}

				// Else, check for opening a new section, or an orphaned close character
				else {

					// Is this character an opening character in this context?
					if (currentContext.openChars.indexOf(c) >= 0) {

						// OPEN A SECTION
						currentContext = context[c];

						topSection = {
								context: currentContext,
								start: i + 1,
								depth: sectionStack.length
							}
						//	console.log(getTabSpacer(topSection.depth) + "OPEN SECTION " + c, "special chars: " + currentContext.openChars);

						sectionStack.push(topSection);

						if (sectionHandlers.onOpenSection)
							sectionHandlers.onOpenSection(topSection);

					}

					// Is this also a closing character in this context?  what does it close?
					else {

						// TRYING TO CLOSE A SECTION THAT HASN'T BEEN OPENED: "[djsfjs)]"
						var closesChar = closeChars[c];
						if (currentContext.openChars.indexOf(closesChar) >= 0) {

							if (sectionHandlers.onError)
								sectionHandlers.onError("No " + inQuotes(closesChar) + " for " + inQuotes(c) + " at " + i + " of " + inQuotes(s));

						} else {
							// Normal character
						}
					}
				}
			}
		}
	}


	// Pop off the unclosed states, and add errors for each one
	while (sectionStack.length > 1) {
		var state = sectionStack.pop();

		if (sectionHandlers.onError)
			sectionHandlers.onError("No " + inQuotes(state.context.close) + " for " + inQuotes(state.context.open) + " at " + state.start + " of " + inQuotes(s));
	}


	if (sectionHandlers.onEnd)
		sectionHandlers.onEnd(depth);

}


function getSpacer(count) {
	var s = "";
	for (var i = 0; i < count; i++) {
		s += " ";
	}
	return s;
}

function getTabSpacer(count) {
	var s = "";
	for (var i = 0; i < count; i++) {
		s += "\t";
	}
	return s;
}

function inEscapedQuotes(s) {
	return '\\"' + s + '\\"';
}

function inQuotes(s) {
	return '"' + s + '"';
}

function inParens(s) {
	return '(' + s + ')';
}

function inBrackets(s) {
	return '[' + s + ']';
}