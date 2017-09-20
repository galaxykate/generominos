function TraceryGrammar(raw) {

	this.refreshFromRaw(raw);
};

TraceryGrammar.prototype.refreshFromRaw = function(raw) {
	this.raw = raw;
	this.symbols = {};
	for (var key in raw) {
		if (raw.hasOwnProperty(key)) {
			this.createSymbol(key, raw[key]);
		}
	}

	this.modifiers = {};

	for (var key in traceryModsEngBasic) {
		if (traceryModsEngBasic.hasOwnProperty(key)) {
			this.modifiers[key] = traceryModsEngBasic[key];
		}


	}
}

TraceryGrammar.prototype.clear = function() {

	$.each(this.symbols, function(key, symbol) {
		symbol.rulesStack = []
	})
}
TraceryGrammar.prototype.setRules = function(key, rules) {
	var found = this.symbols[key];
	if (!found) {
		found = this.createSymbol(key);
		
	}
	found.rulesStack = [rules];
}


TraceryGrammar.prototype.pushRules = function(key, rules) {
	var found = this.symbols[key];
	if (!found) {
		found = this.createSymbol(key);
		console.log("created " + found);
	}
	found.rulesStack.push(rules);
}

TraceryGrammar.prototype.popRules = function(key) {
	var found = this.symbols[key];
	if (!found) {
		console.log("no key found " + key);
	} else {
		found.rulesStack.pop();
		console.log("pop " + key);
	}
};


TraceryGrammar.prototype.applyModifier = function(modName, input, parameters) {
	if (this.modifiers[modName]) {
		return this.modifiers[modName](input, parameters);
	} else {
		return input + "((." + modName + "))";
	}
}

TraceryGrammar.clear = function() {

}

TraceryGrammar.prototype.expandKey = function(key) {
	var node = new TraceryNode({
		key: key,
		grammar: this,
	});
	node.expand();
	return node;
}


TraceryGrammar.prototype.getRules = function(key) {
	if (this.symbols[key]) {
		if (this.symbols[key].rulesStack.length > 0)
			return this.symbols[key].rulesStack[this.symbols[key].rulesStack.length - 1];
		return this.symbols[key].rules;
	}
}

TraceryGrammar.prototype.createSymbol = function(key, settings) {
	if (Array.isArray(settings)) {
		this.symbols[key] = {
			rules: settings,
			rulesStack: [],
		}
	} else if (typeof settings === 'string' || settings instanceof String) {
		this.symbols[key] = {
			rules: [settings],
			rulesStack: [],
		}
	} else {
		//console.log("Unknown rule type: ", settings);
		this.symbols[key] = {
			rules: [],
			rulesStack: [],
		}
	}

	return this.symbols[key];

}


function isVowel(c) {
	var c2 = c.toLowerCase();
	return (c2 === 'a') || (c2 === 'e') || (c2 === 'i') || (c2 === 'o') || (c2 === 'u');
};

function isAlphaNum(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
};

function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

var traceryModsEngBasic = {

	allCaps : function(s) {
return s.toUpperCase();
	},

	capitalizeAll: function(s) {
		var s2 = "";
		var capNext = true;
		for (var i = 0; i < s.length; i++) {

			if (!isAlphaNum(s.charAt(i))) {
				capNext = true;
				s2 += s.charAt(i);
			} else {
				if (!capNext) {
					s2 += s.charAt(i);
				} else {
					s2 += s.charAt(i).toUpperCase();
					capNext = false;
				}

			}
		}
		return s2;
	},

	capitalize: function(s) {
		return s.charAt(0).toUpperCase() + s.substring(1);
	},

	a: function(s) {
		if (s.length > 0) {
			if (s.charAt(0).toLowerCase() === 'u') {
				if (s.length > 2) {
					if (s.charAt(2).toLowerCase() === 'i')
						return "a " + s;
				}
			}

			if (isVowel(s.charAt(0))) {
				return "an " + s;
			}
		}

		return "a " + s;

	},

	firstS: function(s) {
		console.log(s);
		var s2 = s.split(" ");

		var finished = traceryModsEngBasic.s(s2[0]) + " " + s2.slice(1).join(" ");
		console.log(finished);
		return finished;
	},

	s: function(s) {
		switch (s.charAt(s.length - 1)) {
			case 's':
				return s + "es";
				break;
			case 'h':
				return s + "es";
				break;
			case 'x':
				return s + "es";
				break;
			case 'y':
				if (!isVowel(s.charAt(s.length - 2)))
					return s.substring(0, s.length - 1) + "ies";
				else
					return s + "s";
				break;
			default:
				return s + "s";
		}
	},
	ed: function(s) {
		switch (s.charAt(s.length - 1)) {
			case 's':
				return s + "ed";
				break;
			case 'e':
				return s + "d";
				break;
			case 'h':
				return s + "ed";
				break;
			case 'x':
				return s + "ed";
				break;
			case 'y':
				if (!isVowel(s.charAt(s.length - 2)))
					return s.substring(0, s.length - 1) + "ied";
				else
					return s + "d";
				break;
			default:
				return s + "ed";
		}
	},

	
};