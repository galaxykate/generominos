/**
 * @author Kate Compton
 */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */

function extend(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
    return destination;
}

// Inspired by base2 and Prototype
(function() {
    var initializing = false, fnTest = /xyz/.test(function() { xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

var utilities = {

	noiseObj : new SimplexNoise(Math.random),

	noise : function() {
		// use the correct number of args
		switch(arguments.length) {
		case 1:
			return utilities.noiseObj.noise2D(arguments[0], 1000);
			break;
		case 2:
			return utilities.noiseObj.noise2D(arguments[0], arguments[1]);
			break;
		case 3:
			return utilities.noiseObj.noise3D(arguments[0], arguments[1], arguments[2]);
			break;
		case 4:
			return utilities.noiseObj.noise4D(arguments[0], arguments[1], arguments[2], arguments[3]);
			break;
		default:
			console.log("Attempting to use Noise with " + arguments.length + " arguments: not supported!");
			return 0;
			break;
		}
	},

	seedNoise : function(rnd) {
		utilities.noiseObj = new _Noise(rnd);
	},

	// convert angle to -PI, PI
	normalizeAngle : function(angle) {
		angle = angle % (Math.PI * 2);
		if (angle > Math.PI)
			angle -= Math.PI * 2;
		return angle;
	},
	// put noise in here too?
	capitaliseFirstLetter : function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	lowerCaseFirstLetter : function(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	},

	words : {
		syllables : {
			first : "B C D F G H J K L M N P Qu R S T V W X Y Z St Fl Bl Pr Kr Ll Chr Sk Br Sth Ch Dhr Dr Sl Sc Sh Thl Thr Pl Fr Phr Phl Wh".split(" "),
			middle : "an all ar art air aean eun eun euh esqu aphn arl ifn ast ign agn af av ant app ab er en eor eon ent enth iar ein irt ian ion iont ill il ipp in is it ik ob ov orb oon ion uk uf un ull urk".split(" "),
			composites : "estr antr okl ackl".split(" "),
			last : "a ia ea u y en am is on an o ang ing io i el ios ius ae ie ee i".split(" "),
		},
		animals : "cobra okapi moose amoeba mongoose capybara yeti dragon unicorn sphinx kangaroo boa nematode sheep quail goat corgi agouti zebra giraffe rhino skunk dolphin whale bullfrog okapi sloth monkey orangutan grizzly moose elk dikdik ibis stork finch nightingale goose robin eagle hawk iguana tortoise panther lion tiger gnu reindeer raccoon opossum".split(" "),
		moods : "vexed indignant impassioned wistful astute courteous benevolent convivial mirthful lighthearted affectionate mournful inquisitive quizzical studious disillusioned angry bemused oblivious sophisticated elated skeptical morose gleeful curious sleepy hopeful ashamed alert energetic exhausted giddy grateful groggy grumpy irate jealous jubilant lethargic sated lonely relaxed restless surprised tired thankful".split(" "),
		colors : "ivory silver ecru scarlet red burgundy ruby crimson carnelian pink rose grey pewter charcoal slate onyx black mahogany brown green emerald blue sapphire turquoise aquamarine teal gold yellow carnation orange lavender purple magenta lilac ebony amethyst jade garnet".split(" "),
		material : "fire water cybernetic steampunk jazz steel bronze brass leather pearl cloud sky river great crystal rainbow iron gold silver titanium".split(" "),
		adventures : "lament story epic tears wish desire dance mystery enigma drama path training sorrows joy tragedy comedy riddle puzzle regret victory loss song adventure question quest vow oath tale travels".split(" "),
		getRandomBotName : function() {
			var adj = randomCap(utilities.words.moods);
			if (Math.random() > .8)
				adj = randomCap(utilities.words.material);
			if (Math.random() > .6)
				adj = randomCap(utilities.words.colors);

			return adj + " " + randomCap(utilities.words.animals);
		},

		getUserName : function() {
			var f = utilities.getRandom(utilities.words.moods);
			if (Math.random() > .5)
				f = utilities.getRandom(utilities.words.colors);
			f = utilities.capitaliseFirstLetter(f);
			f += utilities.capitaliseFirstLetter(utilities.getRandom(utilities.words.animals));
			if (Math.random() > .6)
				f += Math.floor(Math.random() * 50);
			return f;
		},

		getStatement : function() {
			return "This " + utilities.getRandom(utilities.words.moods) + " " + utilities.getRandom(utilities.words.adventures) + " made me " + utilities.getRandom(utilities.words.moods);
		},

		getRandomTitle : function() {
			var adj = randomCap(this.moods);
			if (Math.random() > .5)
				adj = randomCap(this.colors);
			return "The " + randomCap(this.adventures) + " of the " + adj + " " + randomCap(this.animals);
		},

		getRandomWord : function(lengthMult) {
			if (!lengthMult)
				lengthMult = 1;
			var s = utilities.getRandom(this.syllables.first);
			if (Math.random() < .5)
				s = utilities.capitaliseFirstLetter(utilities.getRandom(this.syllables.middle));

			var count = Math.floor(Math.random() * lengthMult * 3);
			for (var i = 0; i < count; i++) {
				var mid = utilities.getRandom(this.syllables.middle);
				s += mid;

			}
			s += utilities.getRandom(this.syllables.last);

			if (s.length > 6 * lengthMult && Math.random < .8)
				s = utilities.words.getRandomWord();
			if (s.length > 9 * lengthMult && Math.random < .9)
				s = utilities.words.getRandomWord();

			if (s.length < 6 * lengthMult && Math.random() < .2)
				s += " " + utilities.words.getRandomWord();
			else if (s.length < 6 * lengthMult && Math.random() < .2)
				s += "'" + utilities.getRandom(this.syllables.last);

			return s;
		},

		getDollName : function() {
			return utilities.capitaliseFirstLetter(utilities.words.getRandomWord());
		}
	},

	arrayToString : function(array) {
		s = "";
		$.each(array, function(index, obj) {
			if (index !== 0)
				s += ", ";
			s += obj;
		});
		return s;
	},
	inSquareBrackets : function(s) {
		return "[" + s + "]";
	},
	getSpacer : function(count) {
		var s = "";
		for (var i = 0; i < count; i++) {
			s += " ";
		}
		return s;
	},

	sigmoid : function(v) {
		return 1 / (1 + Math.pow(Math.E, -v));
	},

	sCurve : function(v, iterations) {
		if (iterations === undefined)
			iterations = 1;
		for (var i = 0; i < iterations; i++) {
			var v2 = .5 - .5 * Math.cos(v * Math.PI);
			v = v2;
		}
		return v;
	},

	within : function(val, min, max) {
		return (val >= min) && (val <= max);
	},

	// Inefficient, fix someday
	// the weight is determined by the function getWeight(index, item, list)
	getWeightedRandomIndex : function(array) {
		var totalWeight = 0;
		var length = array.length;

		for (var i = 0; i < length; i++) {

			totalWeight += array[i];
		};

		var target = Math.random() * totalWeight;
		var cumWeight = 0;

		for (var i = 0; i < length; i++) {
			cumWeight += array[i];

			if (target <= cumWeight) {
				return i;
			}

		};

	},

	// Get a random, from an array
	getRandom : function(array, power) {
		if (power)
			return array[Math.floor(Math.pow(Math.random(), power) * array.length)];
		else
			return array[Math.floor(Math.random() * array.length)];
	},
	getRandomIndex : function(array) {
		return Math.floor(Math.random() * Math.round(array.length - 1));
	},
	getRandomKey : function(obj) {
		return this.getRandom(Object.keys(obj));
	},

	constrain : function(val, lowerBound, upperBound) {
		if (Math.max(val, upperBound) === val)
			return upperBound;
		if (Math.min(val, lowerBound) === val)
			return lowerBound;
		return val;
	},
	lerp : function(start, end, percent) {
		return (start + percent * (end - start));
	},
	lerpAngles : function(start, end, pct) {
		var dTheta = end - start;
	},

	// angle between 0 and 2 PI
	normalizeAngle : function(theta) {
		var twopi = Math.PI * 2;
		theta = (((theta % twopi) + twopi) % twopi);
		return theta;
	},

	// Rertun a random, possible between two numbers
	random : function() {
		if (arguments.length === 0)
			return Math.random();
		if (arguments.length === 1)
			return Math.random() * arguments[i];
		if (arguments.length === 2)
			return Math.random() * (arguments[1] - arguments[0]) + arguments[0];

		return Math.random();
	},
	roundNumber : function(num, places) {
		// default 2 decimal places
		if (places === undefined) {
			return parseFloat(Math.round(num * 100) / 100).toFixed(2);
		} else {
			return parseFloat(Math.round(num * 100) / 100).toFixed(places);
		}
	},
	angleBetween : function(a, b) {
		var dTheta = b - a;
		dTheta = ((dTheta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
		if (dTheta > Math.PI)
			dTheta -= Math.PI * 2;
		return dTheta;
	},

	addSlider : function(parent, overrideOptions, onChange) {

		var options = {
			range : "min",
			value : 50,
			min : 0,
			max : 100,
			step : 1,

		};
		$.extend(options, overrideOptions);

		options.slide = function(event, ui) {
			$("#" + options.key + "amt").text(ui.value);
			console.log("Slide " + ui.value);
			if (onChange !== undefined) {
				onChange(options.key, ui.value);
			}
		};

		// Create an empty slider div
		var optionDiv = $("<div/>", {
		});
		optionDiv.css({
			"pointer-events" : "auto"
		});
		parent.append(optionDiv);

		var slider = $('<div />', {
			id : 'slider_' + options.key,
			class : "tuning_slider",
			value : options.key
		});

		slider.appendTo(optionDiv);
		slider.slider(options);

		// Create a lable
		$('<label />', {
			'for' : 'slider_' + options.key,
			text : options.key + ": "
		}).appendTo(optionDiv);

		// Create a lable
		$('<span />', {
			id : options.key + "amt",
			text : options.defaultValue
		}).appendTo(optionDiv);

		return slider;
	},

	HSVtoRGB : function(h, s, v) {
		var r,
		    g,
		    b;
		h *= 6;
		h = h % 6;

		var i = Math.floor(h);
		var f = h - i;
		var p = v * (1 - s);
		var q = v * (1 - (s * f));
		var t = v * (1 - (s * (1 - f)));
		if (i == 0) {
			r = v;
			g = t;
			b = p;
		} else if (i == 1) {
			r = q;
			g = v;
			b = p;
		} else if (i == 2) {
			r = p;
			g = v;
			b = t;
		} else if (i == 3) {
			r = p;
			g = q;
			b = v;
		} else if (i == 4) {
			r = t;
			g = p;
			b = v;
		} else if (i == 5) {
			r = v;
			g = p;
			b = q;
		}
		r = Math.floor(r * 255);
		g = Math.floor(g * 255);
		b = Math.floor(b * 255);
		return [r, g, b];
	},
};

// Private functions

// Make the Vector class
function KColor(h, s, b, a) {
	this.h = h;
	this.s = s;
	this.b = b;
	if (a !== undefined)
		this.a = a;
	else
		this.a = 1;
};

// Add lots of utilty, modification, lerping, etc functions to deal with colors

KColor.prototype.toString = function() {
	return "hsb: " + this.h.toFixed(2) + " " + this.s.toFixed(2) + " " + this.b.toFixed(2) + " " + this.a.toFixed(2);

};

KColor.prototype.clone = function() {
	return new KColor(this.h, this.s, this.b, this.a);
}

KColor.prototype.constrainToUnit = function(v) {
	return Math.min(Math.max(v, 0), 1);
};

KColor.prototype.cloneShade = function(shade, fade) {
	var clone;

	this.use(function(h, s, b, a) {
		clone = new KColor(h, s, b, a);
	}, shade, fade);

	return clone;
};

// shade goes from -1 to 1, as does fade.
KColor.prototype.fill = function(g, shade, fade) {
	return this.use(g.fill, shade, fade);
};

KColor.prototype.stroke = function(g, shade, fade) {
	return this.use(g.stroke, shade, fade);
};

KColor.prototype.background = function(g, shade, fade) {
	return this.use(g.background, shade, fade);
};

KColor.prototype.use = function(gFunc, shade, fade) {

	var s1 = this.s;
	var h1 = this.h;
	var b1 = this.b;
	var a1 = this.a;

	if (shade !== undefined) {
		if (shade > 0) {
			s1 = this.constrainToUnit(s1 - shade * (s1));
			b1 = this.constrainToUnit(b1 + shade * (1 - b1));
		} else {
			s1 = this.constrainToUnit(s1 - shade * (1 - s1));
			b1 = this.constrainToUnit(b1 + shade * (b1));
		}

		h1 = (h1 + -.06 * shade + 1) % 1;
	}

	// Increase (or decrease) the alpha for this
	if (fade !== undefined) {
		if (fade < 0) {
			a1 = this.constrainToUnit(a1 * (1 + fade));
		} else {
			a1 = this.constrainToUnit((1 - a1) * fade + a1);
		}
	}

	gFunc(h1, s1, b1, a1);
};

//=================================================================
//=================================================================
//=================================================================

KColor.prototype.toCSS = function(shade, fade) {

	if (shade !== undefined) {
		var css;
		this.use(function(h, s, b, a) {
			var rgb = utilities.HSVtoRGB(h, s, b, a);
			var vals = "";
			$.each(rgb, function(index, val) {
				vals += Math.round(val) + ", ";
			});
			vals += a;
			css = "rgba(" + vals + ")";
		}, shade, fade);

		return css;
	}

	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);
	var vals = "";
	$.each(rgb, function(index, val) {
		vals += Math.round(val) + ", ";
	});
	vals += this.a;
	return "rgba(" + vals + ")";
};
KColor.prototype.toThree = function(shade, fade) {

	if (shade !== undefined) {
		var css;
		this.use(function(h, s, b, a) {
			var rgb = utilities.HSVtoRGB(h, s, b, a);
			css = "rgb(" + Math.round(rgb[0]) + ", " + Math.round(rgb[1]) + ", " + Math.round(rgb[2]) + ")";
		}, shade, fade);

		return new THREE.Color(css);
	}

	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);
	var vals = "";
	var css = "rgb(" + Math.round(rgb[0]) + ", " + Math.round(rgb[1]) + ", " + Math.round(rgb[2]) + ")";
	// console.log(css);
	return new THREE.Color(css);
};

var toHexString = function(v) {
	var v2 = v.toString(16);
	if (v2.length == 0)
		v2 = "0" + v2;
	if (v2.length == 1)
		v2 = "0" + v2;
	return v2;
};

KColor.prototype.toRGB = function() {
	return toRGB(this.h, this.s, this.b);
};

KColor.prototype.toHex = function() {
	var rgb = utilities.HSVtoRGB(this.h, this.s, this.b, this.a);

	var hex = rgb[0] << 16 | rgb[1] << 8 | rgb[2];
	hex = toHexString(rgb[0]) + toHexString(rgb[1]) + toHexString(rgb[2]);
	return hex;
};

KColor.prototype.toRGBString = function() {
	var rgb = this.toRGB();

	return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
};

KColor.makeIDColor = function(idNumber) {
	return new KColor((idNumber * .31299 + .42) % 1, 1, 1);
};

var Vector = Class.extend({

	init : function(x, y, z) {
		// actually another vector, clone it
		if (x === undefined) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		} else {
			if (x.x !== undefined) {
				this.x = x.x;
				this.y = x.y;
				this.z = x.z;
			} else {
				this.x = x;
				this.y = y;

				this.z = 0;
				if (z !== undefined)
					this.z = z;

			}
		}

		if (!this.isValid())
			throw new Error(this.invalidToString() + " is not a valid vector");
	},

	clone : function() {
		return new Vector(this);
	},

	cloneInto : function(v) {
		v.x = this.x;
		v.y = this.y;
		v.z = this.z;

	},

	addMultiple : function(v, m) {
		this.x += v.x * m;
		this.y += v.y * m;
		this.z += v.z * m;
	},
	addPolar : function(r, theta) {
		this.x += r * Math.cos(theta);
		this.y += r * Math.sin(theta);
	},

	addSpherical : function(r, theta, phi) {
		this.x += r * Math.cos(theta) * Math.cos(phi);
		this.y += r * Math.sin(theta) * Math.cos(phi);
		this.z += r * Math.sin(phi);
	},

	addRotated : function(v, theta) {
		var cs = Math.cos(theta);
		var sn = Math.sin(theta);
		var x = v.x * cs - v.y * sn;
		var y = v.x * sn + v.y * cs;
		this.x += x;
		this.y += y;
	},

	setToPolar : function(r, theta) {
		this.x = r * Math.cos(theta);
		this.y = r * Math.sin(theta);
	},
	setToCylindrical : function(r, theta, z) {
		this.x = r * Math.cos(theta);
		this.y = r * Math.sin(theta);
		this.z = z;
	},

	setToPolarOffset : function(v, r, theta) {
		this.x = v.x + r * Math.cos(theta);
		this.y = v.y + r * Math.sin(theta);
		this.z = v.z;
	},

	setToSpherical : function(r, theta, phi) {
		this.x = r * Math.cos(theta) * Math.cos(phi);
		this.y = r * Math.sin(theta) * Math.cos(phi);
		this.z = r * Math.sin(phi);
	},

	setToMultiple : function(v, m) {
		this.x = v.x * m;
		this.y = v.y * m;
		this.z = v.z * m;
	},

	setToLerp : function(v0, v1, m) {
		var m1 = 1 - m;
		this.x = v0.x * m1 + v1.x * m;
		this.y = v0.y * m1 + v1.y * m;
		this.z = v0.z * m1 + v1.z * m;
	},

	setToAddMultiple : function(v0, m0, v1, m1) {
		this.x = v0.x * m0 + v1.x * m1;
		this.y = v0.y * m0 + v1.y * m1;
		this.z = v0.z * m0 + v1.z * m1;
	},

	setToDifference : function(v0, v1) {
		this.x = v0.x - v1.x;
		this.y = v0.y - v1.y;
		this.z = v0.z - v1.z;
	},

	setTo : function(x, y, z) {
		// Just in case this was passed a vector
		if (x.x !== undefined) {
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
			if (this.z === undefined)
				this.z = 0;

		} else {
			this.x = x;
			this.y = y;
			if (z !== undefined)
				this.z = z;
		}
		if (!this.isValid())
			throw new Error(this.invalidToString() + " is not a valid vector");

	},

	setScreenPosition : function(g) {
		if (this.screenPos === undefined)
			this.screenPos = new Vector();

		this.screenPos.setTo(g.screenX(this.x, this.y), g.screenY(this.x, this.y));
	},

	magnitude : function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	normalize : function() {
		this.div(this.magnitude());
	},

	constrainMagnitude : function(min, max) {
		var d = this.magnitude();
		if (d !== 0) {
			var d2 = utilities.constrain(d, min, max);
			this.mult(d2 / d);
		}
	},

	getDistanceTo : function(p) {
		var dx = this.x - p.x;
		var dy = this.y - p.y;
		var dz = this.z - p.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	},

	getDistanceToIgnoreZ : function(p) {
		var dx = this.x - p.x;
		var dy = this.y - p.y;

		return Math.sqrt(dx * dx + dy * dy);
	},

	getAngleTo : function(p) {
		var dx = this.x - p.x;
		var dy = this.y - p.y;
		//var dz = this.z - p.z;
		return Math.atan2(dy, dx);
	},

	//===========================================================
	//===========================================================
	// Complex geometry

	dot : function(v) {
		return v.x * this.x + v.y * this.y + v.z * this.z;
	},
	cross : function(v) {
		return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	},

	getAngleBetween : function(v) {
		return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
	},

	getCrossAngleBetween : function(v) {
		var cross = this.cross(v);
		if (cross.z > 0)
			return -Math.asin(cross.magnitude() / (this.magnitude() * v.magnitude()));
		else
			return Math.asin(cross.magnitude() / (this.magnitude() * v.magnitude()));
	},

	getNormalizedAngleBetween : function(v) {
		var theta0 = this.getAngle();
		var theta1 = v.getAngle();
		return normalizeAngle(theta1 - theta0);
	},

	isInTriangle : function(triangle) {

		//credit: http://www.blackpawn.com/texts/pointinpoly/default.html
		var ax = triangle[0].x;
		var ay = triangle[0].y;
		var bx = triangle[1].x;
		var by = triangle[1].y;
		var cx = triangle[2].x;
		var cy = triangle[2].y;

		var v0 = [cx - ax, cy - ay];
		var v1 = [bx - ax, by - ay];
		var v2 = [this.x - ax, this.y - ay];

		var dot00 = (v0[0] * v0[0]) + (v0[1] * v0[1]);
		var dot01 = (v0[0] * v1[0]) + (v0[1] * v1[1]);
		var dot02 = (v0[0] * v2[0]) + (v0[1] * v2[1]);
		var dot11 = (v1[0] * v1[0]) + (v1[1] * v1[1]);
		var dot12 = (v1[0] * v2[0]) + (v1[1] * v2[1]);

		var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		return ((u >= 0) && (v >= 0) && (u + v < 1));

	},

	isInPolygon : function(poly) {
		var pt = this;
		for (var c = false,
		    i = -1,
		    l = poly.length,
		    j = l - 1; ++i < l; j = i)
			((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) && ( c = !c);
		return c;
	},

	//===========================================================
	//===========================================================
	// Add and sub and mult and div functions

	add : function(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	},

	sub : function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	},
	mult : function(m) {
		this.x *= m;
		this.y *= m;
		this.z *= m;
	},
	div : function(m) {
		this.x /= m;
		this.y /= m;
		this.z /= m;
	},
	getOffsetTo : function(v) {
		return new Vector(v.x - this.x, v.y - this.y, v.z - this.z);
	},
	getAngle : function() {
		return Math.atan2(this.y, this.x);
	},

	rotate : function(theta) {
		var cs = Math.cos(theta);
		var sn = Math.sin(theta);
		var x = this.x * cs - this.y * sn;
		var y = this.x * sn + this.y * cs;
		this.x = x;
		this.y = y;
	},

	rotateX : function(theta) {
		var cs = Math.cos(theta);
		var sn = Math.sin(theta);
		var z = this.z * cs - this.y * sn;
		var y = this.z * sn + this.y * cs;
		this.z = z;
		this.y = y;
	},

	//===========================================================
	//===========================================================

	// Lerp a vector!
	lerp : function(otherVector, percent) {
		var lerpVect = new Vector(utilities.lerp(this.x, otherVector.x, percent), utilities.lerp(this.y, otherVector.y, percent), utilities.lerp(this.z, otherVector.z, percent));
		return lerpVect;
	},

	//===========================================================
	//===========================================================
	isValid : function() {
		var hasNaN = isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
		var hasUndefined = this.x === undefined || this.y === undefined || this.z === undefined;
		var hasInfinity = Math.abs(this.x) === Infinity || Math.abs(this.y) === Infinity || Math.abs(this.z) === Infinity;

		var valid = !(hasNaN || hasUndefined || hasInfinity);
		// if (!valid)
		//   console.log(hasNaN + " " + hasUndefined + " " + hasInfinity);
		return valid;
	},

	//===========================================================
	//===========================================================
	translateTo : function(g) {
		g.translate(this.x, this.y);
	},

	//===========================================================
	//===========================================================

	bezier : function(g, c0, c1) {
		g.bezierVertex(c0.x, c0.y, c1.x, c1.y, this.x, this.y);
	},

	bezierTo : function(g, c0, c1, p) {
		g.bezier(this.x, this.y, c0.x, c0.y, c1.x, c1.y, p.x, p.y);
	},
	bezierWithRelativeControlPoints : function(g, p, c0, c1) {
		// "x" and "y" were not defined, so I added "this." in front. Hopefully that's the intended action (April)
		g.bezierVertex(p.x + c0.x, p.y + c0.y, this.x + c1.x, this.y + c1.y, this.x, this.y);
	},

	vertex : function(g) {
		g.vertex(this.x, this.y);
	},

	offsetVertex : function(g, offset, m) {
		if (m === undefined)
			m = 1;
		g.vertex(this.x + offset.x * m, this.y + offset.y * m);
	},

	drawCircle : function(g, radius) {
		g.ellipse(this.x, this.y, radius, radius);
	},

	drawOffsetCircle : function(g, offset, radius) {
		g.ellipse(this.x + offset.x, this.y + offset.y, radius, radius);
	},

	drawOffsetMultipleCircle : function(g, offset, m, radius) {
		g.ellipse(this.x + offset.x * m, this.y + offset.y * m, radius, radius);
	},

	drawLineTo : function(g, v) {
		g.line(this.x, this.y, v.x, v.y);
	},

	drawOffsetLineTo : function(g, v, m, offset) {
		var mx = m * offset.x;
		var my = m * offset.y;

		g.line(this.x + mx, this.y + my, v.x + mx, v.y + my);
	},

	drawLerpedLineTo : function(g, v, startLerp, endLerp) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;

		g.line(this.x + dx * startLerp, this.y + dy * startLerp, this.x + dx * endLerp, this.y + dy * endLerp);
	},

	drawArrow : function(g, v, m) {
		g.line(this.x, this.y, v.x * m + this.x, v.y * m + this.y);
	},

	drawArrowHead : function(g, v, m) {
		var head = 10;
		var d = v.magnitude() * m;
		g.pushMatrix();
		g.rotate(v.getAngle());
		g.beginShape();
		g.vertex(d, 0);
		g.vertex(d - head * 1.2, -head * .3);
		g.vertex(d - head);
		g.vertex(d - head * 1.2, head * .3);

		g.endShape();
		g.popMatrix();
	},

	drawArrowWithHead : function(g, v, m, headSize, offsetLength, offsetNormal) {
		if (isNaN(offsetLength))
			offsetLength = 0;
		if (isNaN(offsetNormal))
			offsetNormal = 0;
		if (isNaN(headSize))
			headSize = 10;

		var head = headSize;
		var d = v.magnitude() * m;
		g.pushMatrix();
		g.translate(this.x, this.y);
		g.rotate(v.getAngle());
		g.translate(offsetLength, offsetNormal);
		g.line(0, 0, d - head, 0);
		g.noStroke();

		g.beginShape();
		g.vertex(d, 0);
		g.vertex(d - head * 1.2, -head * .5);
		g.vertex(d - head);
		g.vertex(d - head * 1.2, head * .5);

		g.endShape();
		g.popMatrix();
	},

	drawAngle : function(g, r, theta) {
		g.line(this.x, this.y, r * Math.cos(theta) + this.x, r * Math.sin(theta) + this.y);
	},

	drawAngleBall : function(g, r, theta, radius) {
		g.ellipse(r * Math.cos(theta) + this.x, r * Math.sin(theta) + this.y, radius, radius);
	},

	drawArc : function(g, r, theta0, theta1) {
		var range = theta1 - theta0;
		var segments = Math.ceil(range / .2);
		for (var i = 0; i < segments + 1; i++) {
			var theta = theta0 + range * (i / segments);
			g.vertex(this.x + r * Math.cos(theta), this.y + r * Math.sin(theta));
		}
	},

	drawText : function(g, s, xOffset, yOffset) {
		g.text(s, this.x + xOffset, this.y + yOffset);
	},
	//===========================================================
	//===========================================================
	toThreeVector : function() {
		return new THREE.Vector3(this.x, this.y, this.z);
	},
	toSVG : function() {
		return Math.round(this.x) + " " + Math.round(this.y);
	},

	toB2D : function() {
		return new Box2D.b2Vec2(this.x, -this.y);
	},

	toCSSDimensions : function() {
		return {
			width : this.x + "px",
			height : this.y + "px",

		};
	},

	toCSSTranslate : function() {
		return "translate(" + this.x.toFixed(2) + "px, " + this.y.toFixed() + "px)";
	},

	//===========================================================
	//===========================================================

	toString : function(precision) {
		if (precision === undefined)
			precision = 2;

		return "(" + this.x.toFixed(precision) + ", " + this.y.toFixed(precision) + ", " + this.z.toFixed(precision) + ")";
	},

	toSimpleString : function() {
		precision = 1;
		return "(" + this.x.toFixed(precision) + ", " + this.y.toFixed(precision) + ")";

	},

	invalidToString : function() {

		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	},
});

// Class functions
Vector.sub = function(a, b) {
	return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
};

Vector.dot = function(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
};

Vector.polar = function(r, theta) {
	return new Vector(r * Math.cos(theta), r * Math.sin(theta));
};

Vector.polarOffset = function(v, r, theta) {
	return new Vector(v.x + r * Math.cos(theta), v.y + r * Math.sin(theta), v.z);
};

Vector.angleBetween = function(a, b) {
	return Math.acos(Vector.dot(a, b) / (a.magnitude() * b.magnitude()));
};

Vector.addMultiples = function(u, m, v, n) {
	var p = new Vector();
	p.addMultiple(u, m);
	p.addMultiple(v, n);
	return p;
};

Vector.average = function(array) {
	var avg = new Vector();
	$.each(array, function(index, v) {
		avg.add(v);
	});
	avg.div(array.length);
	return avg;
};

Vector.calculateIntersection = function(p, q, u, v) {
	var s = Vector.sub(p, u);
	var m = (s.y / v.y - s.x / v.x) / (q.x / v.x - q.y / v.y);

	var n0 = s.x / v.x + m * q.x / v.x;

	// for verification
	//var n1 = s.y / v.y + m * q.y / v.y;
	return [m, n0];
};



function getRandom(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}



// WIP
function splitStrict(s, splitChar) {
	var escape = false;
	var sections = [];
	var levels = [];

	var lastEnd = 0;

	function pushLevel(index, c, mate, selfmate) {
		// At base level?
		if (levels.length === 0) {
			levels.push({
				index: index,
				mate: mate,
				selfmate: selfmate
			});
		}

		// not at base level
		else {
			//ignore
		}
	}

	function popLevel(index, mate, selfmate) {
		var last = levels[levels.length - 1];
		if (last.mate === mate) {
			levels.pop();

		} else {
			//console.warn ("Mismatched: expected " + last.mate + " got " + mate);
		}
	}

	function splitAt(i) {
		if (levels.length === 0) {
			sections.push(s.substring(lastEnd, i));
			lastEnd = i + 1;
		}
	}

	for (var i = 0; i < s.length; i++) {

		if (!escape) {
			var c = s.charAt(i);
			switch (c) {
				case "\\":
					escape = true;
					break;
				case "{":
					pushLevel(i, "{", "}");
					break;
				case "(":
					pushLevel(i, "(", ")");
					break;
				case "[":
					pushLevel(i, "[", "]");
					break;

				case "}":
					popLevel(i, "}");
					break;
				case ")":
					popLevel(i, ")");
					break;
				case "]":
					popLevel(i, "]");
					break;

				case "'":
					if (levels.length === 0)
						pushLevel(i, "'", "'", true);
					else
						popLevel(i, "'", true);
					break;
				case "\"":
					if (levels.length === 0)
						pushLevel(i, '"', '"', true);
					else
						popLevel(i, '"', true);

					break;

				case splitChar:
					splitAt(i);
					break;

			}

		} else {
			escape = false;
		}


	}

	splitAt(s.length);
	

	if (levels.length > 0)
		console.warn("Mismatched: expected ", levels.map(function(level) {
			return level.mate + " " + level.index;
		}).join(", "));

	return sections;

}


function toClosedTag(tagName, attributes) {
	var s = "<" + tagName;
	if (attributes) {
		$.each(attributes, function(key, val) {
			s += " " + key + "=" + inQuotes(val);
		});

	}
	s += "/>";
	return s;
}


function toTag(tagName, attributes, contents) {
	var s = "<" + tagName;
	if (attributes) {
		$.each(attributes, function(key, val) {
			s += " " + key + "=" + inQuotes(val);
		});

	}
	s += ">" + (contents ? contents : "") + "</" + tagName + ">";
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
