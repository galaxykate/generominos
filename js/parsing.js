// UTILITY
// Split the string into top-level sections
// Some open-chars open a new section

function splitIntoTopSections(s, settings) {

	
	if (typeof s !== "string")
		console.warn("non-string", s);

	if (!settings)
		settings = {};

	// rule settings
	if (settings.sectionTypes === undefined)
		settings.sectionTypes = ["[", "#"];

	settings.onCloseSection = function(section) {

		// Open top-level sections only
		var isTopSection = (section.depth === 1) && (settings.sectionTypes.indexOf(section.openChar) >= 0);

		if (isTopSection) {
			var topSection = section;
			start = section.end + 1;
			sections.push(topSection);
		}
	};

	settings.onOpenSection = function(section) {

		var isTopSection = (section.depth === 1) && (settings.sectionTypes.indexOf(section.openChar) >= 0);

		if (isTopSection) {

			// Make a base-level section from the last section to the start of this one
			var topSection = {

				depth: 0,
				start: start,
				end: section.start,
				inner: s.substring(start, section.start)
			};
			start = section.start;
			sections.push(topSection);
		}
	};

	settings.error = function(error) {
		sections.errors.push(error);
	};

	// Initialize the section list
	var sections = [];
	var start = 0;
	parseProtected(s, settings);

	// Add the last section
	sections.push({
		depth: 0,
		start: start,
		end: s.length,
		inner: s.substring(start)
	});



	sections = sections.filter(function(s) {
		if (!settings.ignoreEmptySections && s.depth > 0)
			return true;
		return s.inner.length > 0;
	})

	return sections;
}


function splitOnUnprotected(s, splitters, saveSplitters, settings) {

	if (typeof s !== "string")
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



// UTILITY Hero function
// Runs all the parsing stuff

// Example input:
// 	#stuff.foo(['test#bar#'])#  
// 	#stuff.foo('feelin' #emotion#')#  
// 	feelin' )'( :-} #foo.test('foo {#protectThis#} :-)')#
// Outermost layers can ignore non-starting symbols, like ' " ( {
// But inner layers have to watch them

//	parseProtected("feelin' )'( :-} #foo.test('foo {#protectThis#} :-)')#");
//	parseProtected("feelin' \\# )'( :-} #foo.test('foo {#protectThis#} :-)')#");

function parseProtected(s, settings) {
	if (!settings)
		settings = {};

	// Defaults
	var openChars = ["[", "#", "{", "(", "'", '"'];
	var closeChars = ["]", "#", "}", ")", "'", '"'];
	var firstLevelIgnore = [""];
	if (settings.firstLevelIgnore !== undefined)
		firstLevelIgnore = settings.firstLevelIgnore;
	if (settings.openChars !== undefined)
		openChars = settings.openChars;
	if (settings.closeChars !== undefined)
		closeChars = settings.closeChars;

	var sectionStack = [];
	var topSection;
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

				// Top priority: can we close the current top section?
				if (topSection !== undefined && topSection.closeChar === c) {

					// Close this section
					topSection.end = i;
					topSection.inner = s.substring(topSection.start + 1, topSection.end);

					//	console.log(tabSpacer(topSection.depth) + topSection.openChar + "  close " + inQuotes(topSection.inner));


					if (settings.onCloseSection)
						settings.onCloseSection(topSection);

					// Pop it off the stack and set the new top section
					sectionStack.pop();
					topSection = sectionStack[sectionStack.length - 1];

				} else {
					// Is this character an opening character?
					var openIndex = openChars.indexOf(c);

					// Is this also a closing character?  what does it close?
					var closeIndex = closeChars.indexOf(c);

					// If we are at the base level, 
					//  ignore opening and closing except for the appropriate chars
					//console.log(firstLevelIgnore.indexOf(c), c, sectionStack.length);
					if (sectionStack.length === 0 && firstLevelIgnore.indexOf(c) >= 0) {
						//	console.log("Ignoring the " + c);
						closeIndex = -1;
						openIndex = -1;
					}

					// Regardless, do something with it
					if (settings.onChar)
						settings.onChar(c, i, sectionStack.length, s);

					// If its not an opening character, 
					//  but it *should* close something other than the current section, 
					//  then this is an error
					if (openIndex < 0 && closeIndex >= 0) {
						if (settings.onError)
							settings.onError("Unmatched " + inQuotes(c) + " at " + i);
					}

					// open a new section
					if (openIndex >= 0) {

						// Create a new section
						var topSection = {
								openChar: openChars[openIndex],
								closeChar: closeChars[openIndex],
								start: i,
								depth: sectionStack.length + 1,
							}
							//console.log(tabSpacer(topSection.depth) + topSection.openChar + "  new section ");

						sectionStack.push(topSection);



						if (settings.onOpenSection)
							settings.onOpenSection(topSection);

					} else {


						if (settings.onChar)
							settings.onChar(c, i, sectionStack.length, s);
					}
				}
			}
		}
	}



	for (var i = 0; i < sectionStack.length; i++) {

		if (settings.onError) {
			settings.onError("Unmatched " + inQuotes(sectionStack[i].openChar) + " at " + sectionStack[i].start);
		}
	}

	if (settings.onEnd)
		settings.onEnd(depth);

}