/* Simple JavaScript Inheritance
 * By John Resig https://johnresig.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
   
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
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
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
        })(name, prop[name]) :
        prop[name];
    }
     
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
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


function createCardBack(holder) {
	var card = $("<div/>", {
		class: "card card-back",
	}).appendTo(holder).css({

	});
	/*
var title = $("<div/>", {
		class: "card-back-title",
		html: "Generominos"
	}).appendTo(card)

var subtitle = $("<div/>", {
	html: "generative ideation cards by GalaxyKate",
		class: "card-back-subtitle",
	}).appendTo(card)
	*/
}


function createTile(holder, type, optional, myClass) {

	if (dataTypes[type] === undefined) {
		console.warn("no " + type);
	}

	var typeTile = $("<div/>", {
		class: "socket-type tile",

	}).appendTo(holder).css({
		backgroundImage: "url('css/img/articons_" + type + ".png')"
	}).css({
		backgroundColor: dataTypes[type].color
	});
	if (myClass)
		typeTile.addClass(myClass);

	typeTile.css({
		border: "solid 9px " + dataTypes[type].shadow
	})
	if (optional) {
		typeTile.addClass("tile-optional");
		typeTile.css({
			border: "dashed 9px " + dataTypes[type].shadow
		})
	}



}

function createSockets(holder, socketTypes, dir) {


	if (socketTypes && socketTypes.length > 0) {



		$.each(socketTypes, function(index, socketData) {
			if (dataTypes[socketData.type] === undefined)
				console.warn(socketData.type);

			if (dir === "input")
				dataTypes[socketData.type].in++;
			else
				dataTypes[socketData.type].out++;

			var socket = $("<div/>", {
				class: "socket socket-" + socketData.type + " socket-" + dir,
			}).appendTo(holder);



			//	if (socketData.label)
			var label = $("<div/>", {
				class: "socket-label",
				html: socketData.label
			}).appendTo(socket);

			createTile(socket, socketData.type, socketData.optional);


			if (dir === "input")
				label.appendTo(socket);

		})
	}
}

var Card = Class.extend({
	init: function(data, set) {
		$.extend(this, data);

		this.input = parseSockets(data.input);
		this.output = parseSockets(data.output);


		this.type = "transformation";
		if (this.input.length === 0)
			this.type = "input";

		if (this.output.length === 0) {
			this.type = "output";
		}

		if (this.output.length === 0 && this.input.length === 0) {
			this.type = "mod";

			if (this.modIn !== undefined)
				this.type = "inputmod";
			else
				this.type = "outputmod";
		}



	},

	createSocketRow: function(holder, label) {
		var socketsL = $("<div/>", {
			class: "socket-col socket-col-side"
		}).appendTo(holder);

		var socketMain = $("<div/>", {
			class: "socket-col socket-col-main"
		}).appendTo(holder);


		var socketsR = $("<div/>", {
			class: "socket-col socket-col-side"
		}).appendTo(holder);


		if (label === "input") {
			if (this.modIn) {
				createTile(socketsL, this.modIn)
			}
			if (this.modOut) {
				createTile(socketsR, this.modOut)
			}
		}


		createSockets(socketMain, this[label], label)


	},


	createCard: function(holder) {
		var card = $("<div/>", {
			class: "card",
		}).appendTo(holder).css({

			//transform: "scale(1.1) rotate(" + (Math.random()*.6 - .3) + "rad)"
		});

		var myType;
		var types = {};
		var data =this;
		$.each(this.input, function(index, type) {
			if (types[type.type] === undefined)
				types[type.type] = 0;
			if (type.optional)
				types[type.type] += .3/data.input.length;
			else
				types[type.type]+= 1/data.input.length;
		})
		$.each(this.output, function(index, type) {
			if (types[type.type] === undefined)
				types[type.type] = 0;

			types[type.type]+= 1/data.output.length;
		})

		var highest = 0;

		$.each(types, function(type, count) {
			var v = count;
			if (type === "value")
				v = .1
			if (v > highest) {
				highest = v;
				myType = type;
			}
		})


		if (!myType) {
			var hue = Math.random() * 360;
			card.css({
				//	boxShadow: "inset 0px 0px 0px 17px hsla(" + hue + ", 90%, 40%,1)",
				//backgroundColor: "hsla(" + hue + ", 70%, 95%,1)"
			});
		} else {
			card.css({
				//	boxShadow: "inset 0px 0px 0px 17px hsla(" + hue + ", 90%, 40%,1)",
				backgroundColor: dataTypes[myType].faint
			})
		}

		card.addClass("card-" + this.type);


		var inputRow = $("<div/>", {
			class: "input-row socket-row",
		}).appendTo(card);

		this.createSocketRow(inputRow, "input");


		var main = $("<div/>", {
			class: "main",
		}).appendTo(card);



		var contentCol = $("<div/>", {
			class: "content-col",
		}).appendTo(main);

		var modCol = $("<div/>", {
			class: "mod-col",
		}).appendTo(main);


		var content = $("<div/>", {
			class: "card-content",
		}).appendTo(contentCol);


		var title = $("<div/>", {
			class: "card-name",
			html: this.name
		}).appendTo(content);

		var descSize = 1;

		title.css({
			fontSize: "70px"
		})


		if (this.titleScale)
			title.css({
				fontSize: 70 * this.titleScale + "px"
			})



		if (this.desc) {
			var desc = $("<div/>", {
				class: "card-details",
				html: capFirst(this.desc)
			}).appendTo(content);

			desc.css({
				fontSize: 35 + "px"
			})



		}



		var outputRow = $("<div/>", {
			class: "output-row socket-row",
		}).appendTo(card);

		this.createSocketRow(outputRow, "output");


		card.card = this;

		return card;
	}
})

function capFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}