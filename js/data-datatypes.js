
/*
 * Data types for the cards
 */

var inputColor = "hsla(235, 60%, 84%, 1)";
var inputShadow = "hsla(235, 60%, 40%, 1)";
var inputFaint = "hsla(235, 60%, 90%, 1)";

var imageColor = "hsla(50,80%, 70%, 1)";
var imageShadow = "hsla(50,80%, 30%, 1)"
var imageFaint = "hsla(50,80%, 93%, 1)"

var vectorColor = "hsla(200, 70%, 80%, 1)";
var vectorShadow = "hsla(200, 70%, 40%, 1)";

var vectorFaint = "hsla(200, 70%, 93%, 1)";


var threeColor = "hsla(320, 70%, 80%, 1)";
var threeShadow = "hsla(320, 70%, 40%, 1)";
var threeFaint = "hsla(320, 70%, 93%, 1)";

var waveColor = "hsla(220, 10%, 90%, 1)";
var waveShadow = "hsla(220, 10%, 50%, 1)";
var waveFaint = "hsla(220, 10%, 96%, 1)";

var dataTypes = {

	person: {
		color: inputColor,
		shadow: inputShadow,
		faint: inputFaint,
		isSensor: true,
	},

	content: {
		isSensor: true,
		color: inputColor,
		shadow: inputShadow,
		faint: inputFaint
	},

	sensor: {
		isSensor: true,
		color: inputColor,
		shadow: inputShadow,
		faint: inputFaint
	},
value: {
		color: waveColor,
		shadow: waveShadow,
		faint: waveFaint,
		desc: "A number changing over time"
	},

	waveform: {
		color: waveColor,
		shadow: waveShadow,
		faint: waveFaint,
		desc: "A digital or analog recording of a sound's vibration"
	},

	event: {
		color: "hsla(5, 80%, 80%, 1)",
		shadow: "hsla(5, 60%, 40%, 1)",
		faint: "hsla(5, 60%, 93%, 1)",
		desc: "Events are things that happen instantaneously, like a key press or button click"
	},

	state: {
		color: "hsla(25, 80%, 80%, 1)",
		shadow: "hsla(25, 60%, 40%, 1)",
		faint: "hsla(25, 60%, 93%, 1)",
		desc: "Whether something is true or false, over time, between starting and stopping points"
	},

	geolocation: {
		color: "hsla(225, 80%, 60%, 1)",
		shadow: "hsla(225, 80%, 30%, 1)",
		faint: "hsla(225, 80%, 93%, 1)",
		desc: "A location somewhere on the Earth"
	},



	shape: {
		color: "hsla(280, 70%, 80%, 1)",
		shadow: "hsla(280, 70%, 40%, 1)",
		faint: "hsla(270, 70%, 94%, 1)",
		desc: "Shapes mathematically defined by curves or straight lines"
	},

	graph: {
		color: vectorColor,
		shadow: vectorShadow,
		faint: vectorFaint,
		desc: "A set of edges and nodes"
	},

	curve: {
		color: vectorColor,
		shadow: vectorShadow,
		faint: vectorFaint,
		desc: "A set of points describing a path.  May also have control points for smooth curves"
	},
	particle: {
		color: vectorColor,
		shadow: vectorShadow,
		faint: vectorFaint,
		desc: "Points with properties like mass, velocity, size, and color"
	},
	vector: {
		color: vectorColor,
		shadow: vectorShadow,
		faint: vectorFaint,
		desc: "A three- or two- dimensional point in space"
	},
	

	text: {
		color: "hsla(155, 50%, 80%, 1)",
		shadow: "hsla(155, 50%, 40%, 1)",
		faint: "hsla(155, 50%, 90%, 1)",
		desc: "Letters, numbers, words or other symbols. May be emoji or non-English characters"
	},


	trimesh: {
		color: threeColor,
		shadow: threeShadow,
		faint: threeFaint,
		desc: "A triangle mesh represents a 3D scene or object as a set of triangular faces (which may have texture or color)"
	},
	voxel: {
		color: threeColor,
		shadow: threeShadow,
		faint: threeFaint,
		desc: "A 'volumetric pixel' that represents volume in space"
	},

	color: {
		color: "hsla(95, 70%, 80%, 1)",
		shadow: "hsla(95, 70%, 40%, 1)",
		faint: "hsla(95, 70%, 90%, 1)",
		desc: "A color represented by RGB (or HSLA) values"
	},

	depthmap: {
		color: imageColor,
		shadow: imageShadow,
		faint: imageFaint,
		desc: "A greyscale image of a scene, where the brightness of each pixel shows its distance from a hypothetical camera"
	},
	image: {
		color: imageColor,
		shadow: imageShadow,
		faint: imageFaint,
		desc: "A picture, represented by pixel data (which may be RGB or HSL)"
	},
}