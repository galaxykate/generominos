var seedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890".split("");

function generateSeed() {
	var seed = "";
	for (var i = 0; i < 6; i++) {
		seed += getRandom(seedChars);
	}
	return seed;
}

var traceryNodeCount = 0;

var syllables = "foo bar baz zum dah fwee plotz".split(" ");

function TraceryNode(settings) {
	var node = this;

	this.id = traceryNodeCount++;
	this.errors = [];

	if (!settings) {
		this.errors.push("Empty node");
		settings = {};
	}
	// Clone settings
	for (var key in settings)
		if (settings.hasOwnProperty(key))
			this[key] = settings[key];



	if (!this.parent) {
		this.depth = 0;
	} else {
		this.depth = this.parent.depth + 1;
		this.grammar = this.parent.grammar;
	}
	if (!this.parent && !this.grammar)
		console.warn("No parent or grammar");


	this.childSettings = [];

	if (this.key && !this.type) {
		this.type = 1;
	}

	if (!this.key && !this.type && this.rule) {
		this.type = -1;
	}


	this.reroll();

}



TraceryNode.prototype.toString = function() {
	return "Node" + this.id
}


// Set a new seed for this node.  
// What other nodes are now "dirty"?  anything to the right of this
TraceryNode.prototype.setSeed = function(seed, propagate) {
	this.seed = seed;
}

TraceryNode.prototype.reroll = function(propagate) {
	var node = this;
	var postActions = [];
	if (this.preactions && this.preactions.length > 0) {
		
		for (var i = 0; i < this.preactions.length; i++) {
			var parsed = parseAction(this.preactions[i]);
			this.activateRule(parsed);
			postActions.push({
				targetKey: parsed.targetKey,
				action: "POP"
			});
		}
	}
	this.setSeed(generateSeed());
	if (this.key) {

		this.rules = this.getRules(this.key);
		this.selectRule(this.rules);
	} else {
		if (this.rule) {
			this.parsedRule = parseRule(this.rule);
			this.childSettings = this.parsedRule.sections;
		}
	}


	this.children = this.childSettings.map(function(data) {
		data.parent = node;


		return new TraceryNode(data);

	});

	if (this.postActions) {
		for (var i = 0; i < this.postActions.length; i++) {
			this.activateRule(this.postActions[i]);
		}
	}
	this.expand();
}

TraceryNode.prototype.expand = function(recurseUpwards) {


	if (this.type === 1 || this.type === -1) {
		// Create children


		// Flatten
		this.text = "";
		for (var i = 0; i < this.children.length; i++) {
			this.text += this.children[i].text;
		}

		// Apply modifiers
		if (this.modifiers && this.modifiers.length > 0) {

			for (var i = 0; i < this.modifiers.length; i++) {
				this.text = this.grammar.applyModifier(this.modifiers[i].name, this.text, this.modifiers[i].params);

			}
		}
	}
	if (this.type === 2) {
		var grammar = this.grammar;

		this.activateRule(this);
		this.text = "";
	}

}

TraceryNode.prototype.activateRule = function(settings) {
	var grammar = this.grammar;

	if (settings.targetRules) {
		var rules = settings.targetRules.map(function(rule) {
			var n = new TraceryNode({
				type: -1,
				rule: rule,
				grammar: grammar
			});
			return n.text;
		});
		grammar.pushRules(settings.targetKey, rules);
	} else {

		if (settings.action === "POP") {
			grammar.popRules(settings.targetKey);

		}
	}

}


// Get the rule set that applies to this key
// This function is where lots of magic happens

TraceryNode.prototype.getRules = function(key) {
	var rules = [];

	// Check the mask for the key
	if (this.mask && this.mask[key])
		rules = this.mask[key].getRules();
	else {
		return this.grammar.getRules(key);
	}

	return rules;
}

TraceryNode.prototype.selectRule = function() {
	Math.seedrandom(this.seed);

	if (!this.rules || this.rules.length === 0) {
		this.rule = "((" + this.key + "))";
		this.ruleIndex = -1;
		this.errors.push("No symbol found for " + this.key + " in " + this);
	} else {

		this.ruleIndex = Math.floor(Math.random() * this.rules.length);
		this.rule = this.rules[this.ruleIndex];
		//	console.log(this.seed + " " + this.rule);

	}
	if (this.rule === undefined)
		this.rule = "BROKEN RULE";

	this.parsedRule = parseRule(this.rule);
	this.childSettings = this.parsedRule.sections;



}

TraceryNode.prototype.pushRules = function(key, rules) {

}

// How deep is this key since the last anchor point?
TraceryNode.prototype.getAnchorDepth = function(key) {
	// Find the last time an anchor was set on this key
}