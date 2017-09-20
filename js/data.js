var cardData = {

	standardInput: [{
		name: "touch-table or tablet (iPad)",
		modOut: "person",
		output: "event(touch happens) vector(touch position) state(is touched)"
	}, {
		name: "time",
		desc: "a value that always ticks forward",
		output: "value"
	}, {
		name: "webcam",
		desc: "camera that creates images",
		modOut: "sensor",
		output: "image"
	}, {
		name: "Rock Band guitar",
		desc: "Harmonix plastic guitar with buttons and a tilt sensor",
		modOut: "person",
		output: "event(activate star power) state(fret buttons) event(strum up) event(strum down)",

	}, {
		name: "DDR Pad",
		desc: "A pressure-sensitive dance pad",
		modOut: "person",
		output: "event(foot down) event(foot up) state(currently pressed)",

	}, {
		name: "microphone",
		desc: "audio input",
		modOut: "sensor",

		output: "waveform"
	}, {
		name: "satellite location",
		desc: "Where is this sensor in the world?",
		modOut: "sensor",

		output: "geolocation"
	}, {
		name: "accelerometer",
		desc: "Which way is this sensor tilted?",
		modOut: "sensor",

		output: "value(accelerationX) value(accelerationY) value(accelerationZ)"
	}, {
		name: "gyroscope",
		desc: "Measure the rate of rotation",
		modOut: "sensor",

		output: "value(X rotation) value(Y rotation) value(Z rotation)"
	}, {
		name: "magnetometer",
		desc: "Which way is north?",
		modOut: "sensor",

		output: "value(direction)"
	}, {
		name: "keyboard",
		modOut: "person",
		desc: "make text or key-events",
		output: ["event(key pressed)", "text"]
	}, {
		name: "MIDI keyboard",
		modOut: "person",
		desc: "a piano keyboard, or other midi controller",
		output: ["event(key pressed)", "value(key intensity)", "waveform(synthesized music)"]
	}, {
		name: "mouse",
		output: ["vector(pointer position)", "event(left mouse button)", "event(right mouse button)", "state(mouse being held)"]
	}, {
		name: "pseudorandom number generator",
		desc: "Generate a random value!",
		output: ["value"]
	}],

	// CONTENT FROM THE REAL WORLD
	contentInputs: [{
		name: "generative text",
		desc: "use a grammar, neural network, or a Markov chain to create generative text when an even occurs.",
		input: "event",
		output: "text(generated text)"
	}, {
		name: "Twitter feed",
		modOut: "person",
		desc: "detect when someone tweets with this hashtag, or tweets to this account",
		output: ["event(when tweeted)", "text(tweet contents)"]
	}, {
		name: "stock market data",
		desc: "Current value of the stock market",

		output: "value"
	}, {
		name: "Google trend value",
		desc: "Current search ranking of keywords",
		input: "*text",
		output: "value"
	}, {
		name: "music",
		desc: "MP3s, OGGs, and WAVs",
		modOut: "content",

		output: "waveform"
	}, {
		name: "text",
		desc: "Books, poetry, newspapers, or other writing",
		modOut: "content",

		output: "text"
	}, ],

	highTech: [{
		name: "Leap Motion",
		desc: "commercial hand-tracking camera",
		modOut: "person",
		output: "graph(joint positions) trimesh(hand model)"
	}, {
		name: "Neurosky MindWave",
		titleScale: .94,
		modOut: "person",
		desc: "EEG headset that detects 5 kinds of brain waves",
		output: ["value(alpha wave)", "value(gamma wave)", "value (beta wave)", "value(delta wave)", "value(theta wave)"],
		link: "http://neurosky.com/2015/05/greek-alphabet-soup-making-sense-of-eeg-bands/"
	}, {
		name: "Kinect",
		desc: "commercial infrared depth sensor by Microsoft",
		modOut: "sensor",

		output: "depthmap(camera depth per pixel) graph(graph of joint positions)"
	}, {
		name: "gamepad",
		desc: "gamepads have many different configuration, but most of them have the same kinds of outputs",
		modOut: "sensor",

		output: "vector(joystick) event(button) state(trigger)"
	}, {
		name: "Oculus Touch",
		modOut: "sensor",
		desc: "positional controls for the Oculus VR set",
		output: "state(buttons) state(triggers) value(left joystick) value(right joystick) vector(position)"
	}],


	// ARDUINO-TYPE ELECTRONIC SENSORS
	arduinoSensors: [{
		name: "photoresistor",
		modOut: "sensor",
		desc: "detect ambient light through a variable resistor (may detect infrared, ultraviolet, or visible light)",
		output: ["value(amount of light detected)"]
	}, {
		name: "heart-rate sensor",
		desc: "detect the user's heartbeat over time<br>(light-based or electrocardiograph with electrodes)",
		output: "waveform(pulse) value(beats per minute)",
		modOut: "person",
	}, {
		name: "breathalyzer",
		desc: "detect the amount of alcohol in someone's breath",
		output: "value(Blood Alcohol Content)",
		modOut: "person",

	}, {
		name: "bend sensor",
		modOut: "sensor",
		desc: "bending the sensor changes resistance.<br>You can make your own out of anti-static bags!",
		output: "value(amount of bend)"
	}, {
		name: "sound sensor",
		modOut: "sensor",
		desc: "detect ambient noise, wind, or someone blowing",
		output: ["value(sound amplitude)"]
	}, {
		name: "speed detector",
		desc: "detect the speed of cars, bikes, or pedestrians",
		modOut: "person",

		output: "value(speed)"
	}, {
		name: "piezo sensors",
		desc: "Creates an electrical charge when tapped or squeezed or vibrated",
		modOut: "sensor",

		output: "value(resulting electrical output)"
	}, {
		name: "laser-beam switch",
		desc: "fire a laser and use a light sensor to detect whether the beam is disturbed",
		modOut: "sensor",

		output: "state(whether the laser is currently disturbed) event(disturbance detected!)"
	}, {
		name: "potentiometer",
		desc: "a knob to turn, like a stereo tuner",
		modOut: "sensor",

		output: "value(amount rotated)"
	}, {
		name: "button",
		desc: "It's a button!<br>Press it, hold it, or click it",
		modOut: "sensor",

		output: "event(touch happens) state(is touched)"
	}, {
		name: "distance sensor",
		modOut: "sensor",
		desc: "detect distance from the sensor to an object.<br>Works better with hard objects than soft objects.",
		output: "value(calculated distance) value(time of flight)"
	}, {
		name: "tilt switch",
		desc: "a simple mechanical switch that closes when tilted",
		modOut: "sensor",

		output: "event(close happens) event(open happens) state(is closed)"
	}, ],


	// BIG SENSORS SUITED TO A SIMULATION

	installationSensors: [{
		name: "swing",
		desc: "a 'smart' swing that can detect when it is swinging, and how fast",
		modOut: "person",

		output: "value(speed) state(is swinging) event(changes direction)"
	}, {
		name: "shadows",
		desc: "Something casts shadows on a surface. A camera detects the shadows and how dark they are.",
		modOut: "sensor",

		output: "depthmap(black & white image of the shadows) shape(calculated shadow borders)"
	}, {
		name: "spinnable wheel",
		desc: "a wheel that can tell how fast it is being spun",
		modOut: "person",

		output: "value(speed) state(is spinning) event(changes direction)"
	}, {
		name: "conductive object",
		titleScale: 1,
		desc: "an object that can sense touch by using the user's skin conductivity to close a circuit",
		modOut: "sensor",

		output: "event(touched!) state(is touched) value(conductivity)"
	}, {
		name: "microbe tracking",
		desc: "Attach a webcam to a microscope to watch microbes moving or mold growing.<br>Look at them go!",
		output: "particle(microbe positions) depthmap(mold density)"
	}, {
		name: "laser pointers",
		modOut: "person",
		desc: "detected laser point positions via camera",
		output: "particle(laser pointer positions)"
	}],


	// TRANSFORMATIONS

	signalProcessing: [{
		name: "Fast Fourier Transform",
		input: "waveform",
		desc: "Turn an audio signal into multiple frequencies",
		output: "value value value value value"
	}, {
		name: "audio analysis",
		input: "waveform(source audio)",
		desc: "Detect beats, current pitch, and more",
		output: "event(beat happens) value(current pitch) value(BPM)"
	}],


	conversions: [{
		name: "state begins or ends",
		desc: "Detect when a state begins or ends",
		input: "state",
		output: "event"
	}],


	// VECTORS AND PARTICLES
	particleMath: [{
		name: "generate particles",
		desc: "Generate particles from a point going in a direction, or generate many random particles all over",
		input: "*vector(point) *value(direction) *value(velocity)",
		output: "particle"
	}, {
		name: "calculate gravity",
		desc: "calculate the attractive (or repulsive) force based on proximity to points",
		input: "vector(masses) value(strength)",
		output: "particle",
	}, {
		name: "calculate paths over time",
		desc: "create curves along the path of some points",
		input: "vector",
		output: "curve"
	}, {
		name: "DeCasteljau's algorithm",
		titleScale: .82,
		desc: "calculate points or tangents along a Bezier curve",
		input: "curve(curve) *value(sample rate) *value(sample pos)",
		output: "vector(points) vector(tangents) vector(accelerations)"
	}, {
		name: "find the average mass and velocity",
		desc: "calculate averages for particles in a neighborhood",
		input: "particle *vector(sample point) *value(sample radius)",
		output: "vector"
	}],

	imageProcessing: [{
		name: "frame difference",
		desc: "subtract each frame's pixel data from the previous frame's data, creating a map of which pixels are changing (white) and which stay the same (black)",
		input: "image",
		output: "image"
	}, {
		name: "split image into color channels",
		input: "image",
		output: "depthmap(hue) depthmap(brightness) depthmap(red) depthmap(green) depthmap(blue)"
	}, {
		name: "sample image color",
		titleScale: .99,

		desc: "what color is this pixel, or what is the average color of this region?",
		input: "image *vector(positions) *shape(region)",
		output: "color"
	}, {
		name: "get color palettes",
		desc: "Use an API like COLOURLovers to get palettes using this color",
		input: "color",
		output: "color(color 1) color(color 2) color(color 3) color(color 4) text(name)",
	}, {
		name: "get color name",
		input: "color(input color)",
		output: "text(closest color name) color(closest named color)",
		desc: "Use the webcolor directory or XKCD Color Survey to get a name for this color"
	}, {
		name: "Stamp shapes along a path",
		titleScale: .7,

		desc: "make a trail out of stamped images or shapes",
		input: "curve(target curve) *image(image to stamp) *shape(shape to stamp)",
		output: "image"
	}, ],


	simulations: [{
		name: "Boids flocking",
		input: "particle(positions) value(separation) value(alignment) value(cohesion)",
		desc: "Simulate bird-like flocking behavior",
		output: "particle(resulting flock)",
	}],

	graphMath: [{

		name: "Stipplegen",
		desc: "Generate stippled points based on a depth map<br>(creates newspaper-style half-tone images)",
		input: "depthmap",
		output: "vector"
	}],

	geopolitical: [{
		name: "do something here",
		desc: "throw a party, plant a garden, or hold a rally at this location",
		input: "geolocation",
	}, {
		name: "population data",
		input: "geolocation(location) *value(year)",
		desc: "Get population data from World Population API",
		output: "value(population) value(GDP) value(life expectancy) value(average age)"
	}, {
		name: "ocean conditions",
		desc: "Get the ocean conditions from NOAA's API",
		input: "*geolocation",
		output: "vector(current) vector(wind) value(salinity) value(visibility) value(water temperature)"
	}],


	math: [{
		name: "calculate statistics",
		input: "value(number) *value *value *value *value",
		output: "value(average) value(median) value(maximum) value(minimum)",
	}],

	inputMods: [{
		name: "two competitors",
		modIn: "person",

	}, {
		name: "romantic partners",
		modIn: "person",

	}, {
		name: "a family",
		modIn: "person",

	}, {
		name: "public domain content",
		modIn: "content",
	}, {
		name: "from a historically or politically significant source",
		modIn: "content",
	}, {
		name: "who doesn't know they're controlling it",
		modIn: "person",

	}, {
		name: "a crowd of strangers",
		modIn: "person",

	}, {
		name: "the user is not actually a person, but something like a tree branch or a wave",
		modIn: "person",

	}, {
		name: "the user must use the control with an unusual body part",
		modIn: "person",

	}, {
		name: "held by a person",
		modIn: "sensor",
		modOut: "person",

	}, {
		name: "attached to something in nature",
		modIn: "sensor",

	}, {
		name: "attached to an animal",
		modIn: "sensor",
		modOut: "person",

	}, {
		name: "who is a different species than the viewer",
		modIn: "person",

	}, {
		name: "scraped from social media",
		modIn: "content",
	}, {
		name: "from a particular user",
		modIn: "content",
		modOut: "person"
	}, {
		name: "the artist themself",
		modIn: "person",

	}, {
		name: "hidden in a public space",
		modIn: "sensor",

	}, {
		name: "a giant version you can stand on",
		modIn: "sensor",

	}],
	etc: [{
			name: "Superformula",
			desc: "Creates an interesting shape from multiple values (non-patented version: superellipse)",
			input: "value value value value value",
			output: "shape"
		}, {
			name: "shape-point collision",
			titleScale: .93,
			desc: "Detect whether points are inside or outside a shape",
			input: "vector shape",
			output: "event(enter shape) event(exit shape) state(inside shape)"
		}, {
			name: "calculate distance",
			desc: "Detect the distance from a point to a point, or the closest point on a curve, or a shape",
			input: "vector *vector *shape *curve",
			output: "value(distance) vector(closest point)"
		}, {
			name: "offset curve",
			desc: "draw a curve parallel to this curve",
			input: "curve(original curve) value(distance to offset)",
			output: "curve"
		}, {
			name: "create smooth curve from points",
			desc: "calculate a smooth curve, or use the points as bezier control points",
			input: "vector",
			output: "curve"
		}, {
			name: "Boolean shape logic",
			desc: "Calculate the union, intersection or excluded area of multiple shapes",
			input: "shape shape",
			output: "shape(union) shape(intersection) shape(exclude)"
		}, {
			name: "threshold value",
			desc: "determine whether the value is above, below, or within a range",
			input: "value *value(minimum) *value(maximum)",
			output: "event(enter) event(exits) state(in threshhold)"
		}, {
			name: "sample amplitude",
			desc: "Calculate the current amplitude of a wave",
			input: "waveform",
			output: "value(amplitude)"
		}, {
			name: "artbrush deformation",
			desc: "Deform the shape along a curve",
			input: "curve shape",
			output: "shape"
		}, {
			name: "modify sound",
			desc: "Change speed, volume, or pitch",
			input: "waveform *value(speed) *value(volume) *value(pitch)",
			output: "waveform"
		}, {
			name: "play sound while true",
			titleScale: .9,
			desc: "Play this sound while in the state<br>(or else play the other sound)",
			input: "state(condition) waveform(sound) *waveform(alternate sound)",
			output: "waveform"
		}, {
			name: "get graph data",
			desc: "given a graph, look at the nodes or edges",
			input: "graph",
			output: "vector(nodes) curve(edges)"
		}, {
			name: "Voronoi diagram",
			desc: "calculate a Voronoi diagram from these points",
			input: "vector(sites)",
			output: ["graph(region edges)", "shape(regions)", "vector(region centers)"]
		}, {
			name: "Delaunay diagram",
			desc: "calculate a Delaunay diagram from these points",
			input: "vector",
			output: "graph(all edges) shape(triangles) vector(triangle centers)"
		}, {
			name: "parametric flower",
			titleScale: 1,
			desc: "procedurally generate a model of a flower<br>(or other 3D shape)",
			input: "value(petal count) value(petal size) value(petal width) *color(inner color) *color(outer color)",
			output: "trimesh"
		},

		{
			name: "distribute points",
			desc: "distribute a number of points inside a shape",
			input: "shape(region) *value(density of points)",

			output: "vector(resulting points)",
		},

		{
			name: "generate color",
			desc: "generate an HSBa color (or an RGB color)",
			input: "value(hue) value(saturation) value(brightness) *value(alpha)",
			output: "color(color)",
		},

		{
			name: "detect gestures",
			desc: "detect a user's gesture from their joint positions",
			input: "graph(body model)",
			output: "event(made a gesture) state(current gesture) text(gesture name)",
		},



		{
			name: "text to shapes",
			desc: "turn this text into outlined shapes",
			input: "text(source text) *shape(font glyphs) *vector(text angle) *vector(font size)",
			output: "shape(text outlines)"
		},

		// Create fields
		{
			name: "2D Perlin noise",
			desc: "given a scale and octaves, create Perlin noise",
			input: ["*value(scale)", "*value(# of octaves)", "*value(xOffset)", "*value(yOffset)"],
			output: "depthmap",

		}, {
			name: "3D Perlin voxel noise",
			titleScale: .9,
			desc: "create thresholded voxels based on the Perlin values at each voxel position",
			input: ["*value(scale)", "*value(# of octaves)", "*value(offset)", "value(threshold)"],
			output: "voxel",
		}, {
			name: "triangulate regions",
			desc: "Tile a polygon with triangles",
			input: "*shape(closed shapes) *graph(graph)",
			output: "shape(tiling triangles)",
		}, {
			name: "calculate contours",
			desc: "calculate topographic contours from a depthmap",
			input: "depthmap *value(height)",
			output: "shape(nested regions) curve(contour lines)",
		}, {
			name: "sample at points",
			desc: "calculate the value of depthmap at points",
			input: "depthmap(depthmap) vector(sample position)",
			output: "value(value at this point)",
		}, {
			name: "cellular automata",
			desc: "Use the color of the image as a map of cells in a cellular automata simulation",
			input: "depthmap *value(time)",
			output: "depthmap",
		}, {
			name: "get social media from a location",
			desc: "search for tweets (or other data) geotagged at some location",
			input: "geolocation",
			output: "text image"
		}, {
			name: "get social media from a keyword",
			desc: "search for tweets containing a word",
			input: "text",
			output: "text image"
		}, {
			name: "sentiment analysis",
			desc: "Analyse how positive or negative a piece of text is",
			input: "text(source text)",
			output: "value(estimated attitude)"
		}, {
			name: "image masking",
			desc: "mask an image using shapes",
			input: "shape(shape to use as a mask) image(source image) *image *image",
			output: "image"
		}, {
			name: "image blending",
			desc: "blend two images using a depthmap",
			input: "image(source image A) image(source image B) depthmap(% from A or B, per pixel)",

			output: "image"
		}, {
			name: "heightmap geometry",
			desc: "create a landscape using a heightmap",
			input: "depthmap(point heights) value(height multiplier)",
			output: "trimesh"
		}, {
			name: "3D print",
			desc: "create 3D print of this mesh",
			input: "trimesh"
		}, {
			name: "3D render",
			desc: "Render this mesh in a 3D engine",
			input: "trimesh",
			output: "image(image) depthmap(z-buffer)"
		}, {
			name: "print as fabric",
			desc: "print this image to fabric",
			input: "image"
		}, {
			name: "laser engraving",
			desc: "use a CNC controlled laser to etch this depthmap to wood, leather, or glass",
			input: "depthmap"
		}, {
			name: "laser cutting",
			desc: "use a CNC controlled laser to cut shapes in wood or plastic",
			input: "shape"
		}, {
			name: "image posterization",
			desc: "calculate the regions in an image according to color similarity",
			input: "image(source image) *value(region count)",
			output: "shape"
		}, {
			name: "switch images",
			desc: "Switch which image is showing based on states",
			input: "state image *image *image",
			output: "image"
		}, {
			name: "detect center of mass",
			desc: "calculate the center and size of shapes",
			input: "shape",
			output: "particle"
		}, {
			name: "construct a location from coordinates",
			input: "value(longitude) value(latitude)",
			output: "geolocation(geolocation)"
		}, {
			name: "face tracking",
			desc: "facial recognition",
			input: "image",

			output: "event(face detected) graph(face shape)"
		}, {
			name: "facial expression recognition",
			input: "image",

			output: "state(current expression) event(expression changed) text(expression name) value(confidence)"
		},

		// Drawing
		{
			name: "draw shapes",
			desc: "render shapes to a finished image",
			input: "shape(shapes) *color(colors to use) *vector(positions)",
			output: "image"
		}, {
			name: "draw points with image colors",
			desc: "draw points as colored by the closest image pixel",
			input: "vector image",
			output: "image"
		}, {
			name: "draw particle trails",
			desc: "draw the trails that moving particles leave behind, or draw curves",
			input: "*particle(particles) *curve(curves)",
			output: "image"
		}, {
			name: "vibration motor",
			desc: "Vibrate a motor to shake sand, water, or people",
			input: "*value(frequency) *waveform(waveform)",
		}, {
			name: "speaker",
			desc: "Amplify a sound",
			input: "waveform",
		}, {
			name: "render 3D",
			desc: "render a 3D scene to an image",
			input: "trimesh",
			output: "image"
		}, {
			name: "render to stereographic VR",
			desc: "render a 3D scene to a stereographic image or a 3D display like a VR headset",
			input: "trimesh",
		}, {
			name: "get weather at a location",
			input: "geolocation",
			output: "text(weather description) value(temperature) value(wind speed) value(humidity)",
		},


		// Outputs
		{
			name: "project image on a screen",
			desc: "or onto fog, water, or plaster heads",
			input: "image",
		},

		{
			name: "move a servo motor",
			desc: "Set a servo motor to move to a certain rotation",
			input: "value",
		}, {
			name: "spin a motor",
			desc: "Spin a motor at a given speed. Is it turning a wheel, a record player, or screwdriver?",
			input: "value",
		},

		{
			name: "LED",
			desc: "Light an LED with certain brightness",
			input: "value",
		},

		{
			name: "RGB LED",
			desc: "Light an LED with red, green, and blue values",
			input: "value(red) value(green) value(blue)",
		}, {
			name: "LED panel",
			desc: "Light a 2D panel of LEDs according to the colors in an image",
			input: "image",
		},

		{
			name: "Fire!",
			desc: "Control the amount of propane (and colorant) of a fire effect",
			input: "value(intensity) *value(color)",
		}, {
			name: "fan",
			desc: "Control a fan that blows wind",
			input: "value(intensity) *value(direction)",
		},

		{
			name: "text-to-speech",
			desc: "Convert text to human-like speech",
			input: "text(source text) *value(speed) *value(pitch)",
			output: "waveform",
		},

		{
			name: "speech-to-text",
			desc: "Recognize words in an audio waveform",
			input: "waveform(source sound)",
			output: "text(detected text)",
		},


		{
			name: "LED cube",
			desc: "Light a cube of LEDs according to a set of voxels",
			input: "*voxel",
		}, {
			name: "triangulate voxels",
			desc: "Compute a triangular mesh from voxels",
			input: "voxel",
			output: "trimesh"
		}, {
			name: "metaballs",
			desc: "Calculate the metaball mesh around these particles",
			input: "particle(position and radius)",
			output: "trimesh(resulting surface mesh)"
		}, {
			name: "crossfade",
			desc: "Mix sound streams based on a value",
			input: "waveform(source audio 1) waveform(source audio 2) value(fade)",
			output: "waveform(resulting audio)"
		},

		{
			name: "extrude shapes",
			desc: "extrude shapes along a tube",
			input: "shape(profile) curve(curve to follow) *value(rotation)",
			output: "trimesh"
		},

		{
			name: "Ruben's Tube",
			desc: "Vibrate a tube of propane, causing fire to change intensity along the length",
			input: "waveform",
		}, {
			name: "play a video game",
			desc: "Super Mario Brothers, Halo and Tetris all require the same kind of inputs",
			input: "event(button) state(left) state(right) state(up) state(down)",
		}, {
			name: "light-changing glass",
			desc: "Glass that changes from clear to opaque",
			input: "value",
		}, {
			name: "...on a piece of fashion",
			desc: "jewelry, clothing, shoes, or a ballgown"
		}, {
			name: "...on architecture"
		}, {
			name: "...on a moving vehicle",
			desc: "bikes, boats, trains, automobiles"
		}, {
			name: "...where no humans can see it"
		}, {
			name: "...on someone's body",
			desc: "the face... or elsewhere"
		}, {
			name: "...in nature",
			desc: "embedded in a tree, out in a field, in the ocean"
		}, {
			name: "...very, very, very small"
		}, {
			name: "...a whole cloud of these outputs"
		}, {
			name: "...very very large"
		}, {
			name: "...in a public space"
		}, {
			name: "...someplace illegal"
		}
	]

};

/*

	input: [



		
		//

	],


	transformation: [

		,
	],


	inputModifiers: {

	},

	outputModifiers: {

	},
}
*/


var metacardData = {
	systems: [{
		name: "The Best Art",
		author: "Nicole He",
		date: "",
		site: ""

	}, {}]
}


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

var scenarios = [{
		title: "Science Museum installation",
		constraints: "Teach something about science | maximum durability, loud boisterous environment | • Usable by children age 4-16 (consider height, control-complexity, and number of interactors)"
	}, {
		title: "Rock concert game",
		constraints: "A game to be played on a big screen by crowds at a rock concert if the band is late | • Assume 4000 drunk, loud players and 4000 drunk loud non-players | • It is dark, loud, and everyone has a cell phone"
	}, {
		title: "Seventh Inning stretch",
		constraints: "A game to be played on a big screen at a ballpark during a break |• How many people can play at a time? | • Many people are sitting with their families and friends | • Consider the 'kiss cam'"
	}, {
		title: "Public park bench",
		constraints: "Outdoor long-term installation of an interactive bench | • Maximum durabiity, weatherproofness, resistance to theft | • Has to be powered by a small solar panel | • Needs to still function as a bench"
	}, {
		title: "County Fair game",
		constraints: "You have a booth at a county fair for one day | • Bright sunshine, large crowds of families | • You can charge $1 per play | Can you earn money?"
	}, {
		title: "An enrichment game for bored pigs on farms",
		constraints: "Playable by pigs and networked humans (or just pigs) | • Low maintenance | • Pigs can follow bright lights, but don't understand images",
		link: "https://www.polygon.com/2012/10/29/3572848/the-philosophy-of-playing-with-your-food"
	}, {
		title: "A game for orangutans",
		constraints: "Orangutans are enormously strong (they can snap an iPad) and can be dangerous to trainers | • Orangutans can recognize shapes, but have to be trained to understand cause-and-effect logic | • They have good hearing, color vision, and love to touch strange objects",
		link: "http://www.bbc.co.uk/newsround/35583313"
	}, {
		title: "An installation for a cat shelter",
		constraints: "Playable by many cats at the shelter, for a few hours at a time (with human supervision) | • Should make the cats look cute on webcams to encourage adoption | • Can humans play with the cats remotely?",
	}, {
		title: "Decrease loneliness in senior centers",
		constraints: "Make an installation to be installed in many senior centers to help seniors socialize with each other | • Design for limited mobility, eyesight, strength| • Design for no prior video game experience",
	}, {
		title: "Creativity for senior centers",
		constraints: "Creativity is linked to positive aging outcomes.  Design a way for seniors to make art, and feel proud of their work | • Design for limited mobility, eyesight, strength| • Design for no prior video game experience",
	}, {
		title: "An art installation for a hospital atrium",
		constraints: "Make an installation that can be interacted with quickly, or just appreciated as people walk through an atrium | • The environment is stressful and noisy, design something calming | • For sanitation, no touching the art is allowed",
	}, {
		title: "An installation for a department store window",
		constraints: "Usable by passing people from behind the glass window | • Attract attention from across the street | • The funders want people to engage the brand on social media | How will people realize it's interactive?",
	}, {
		title: "Indiecade 'soaker'",
		constraints: "Indiecade has commissioned you to show a game | • It has to absorb 100 players per hour | • You can choose whether its played at day or at night"
	}, {
		title: "Airport game",
		constraints: "A game that can be played while waiting at the luggage carousel | • Played on a screen or other sculpture in the center of the carousel | • Everyone has luggage with them, can you use that?"
	}, {
		title: "Rollercoaster queue game",
		constraints: "A game to be played while in line at an amusement park | • People will be moving though the space for an hour or more | • Consider groups of friends, families or strangers"
	}, {
		title: "Stair game",
		constraints: "A game or artwork to be installed in the back staircase in your office | • Get more people to take the stairs | • Don't impede people who don't want to play | • Installed for a day, or over months?"
	}, {
		title: "Everybody recycle!",
		constraints: "An commission to be installed in a recycling can in a park | • Make recycling fun | • Ideally: get people to tweet about recycling"
	}, {
		title: "Stroke rehab game",
		constraints: "A commission for an installation in a stroke rehab center | • Encourage people of many different physical abilities (and wheelchairs) to move more"
	}, {
		title: "Finals Week Stress Relief",
		constraints: "Your college wants you to make a stress relief game to be played by students each day at 6pm during finals week | • Should handle 200+ students | • Budget $200"
	}, {
		title: "Gym game",
		constraints: "A gym has commissioned an digital game to attract people to the gym | to be installed next to the cardio machines | • It should make working out fun | • It should stand up to sweaty, energetic people"
	}, {
		title: "Musical improv",
		constraints: "A string quartet (or rockband, or jazz trio) wants some digital art to respond to their music | • Should respond to their music | • Should be engaging to the audience | • Will only be played during a few concerts"
	}

];


var spares = [{
		name: "directional bleed",
		desc: "Directionally blur the pixels, based on the direction of the vector field at that point",
		input: "image vectorfield",
		output: "image"
	}, {
		name: "cellular automata (grid)",
		desc: "Change values in the grid, depending on the values of the neighboring nodes",
		input: "vectorfield",
		output: "vectorfield",
	},

	{
		name: "turn points into particles",
		desc: "add velocity and other values to points to turn them into particles",
		input: "vector(points) *vectorfield(velocity) *vectorfield(color) *vectorfield(mass)",
		output: "particle",
		set: 1,
	},

	{
		name: "calculate gradients",
		desc: "calculate the gradient from points in a depthmap. Useful for finding edges in images, or simulating water on terrain",
		input: "*depthmap *image *vectorfield",
		output: "vectorfield",
	}, {
		name: "apply forces to particles",
		desc: "simulate the particles moving in a field of forces",
		input: "particle vectorfield",
		output: "particle",
	},

	{
		name: "Directional vectorfield",
		input: "value(direction) value(velocity)",
		output: "vectorfield",
	}, {
		name: "Deform text along a curve",
		desc: "",
		input: "curve text *value(offset)",
		output: "shape"
	}, {
		name: "get particle data",
		desc: "get data about particles",
		input: "particle",
		output: "vector(position) value(direction) value(velocity)"
	}, {
		name: "Sine",
		desc: "Calculate the sine value",
		input: "value",
		output: "value",
		set: 1
	}, {
		name: "conductive fabric switch",
		desc: "fabric that can sense when it is closed",
		modOut: "sensor",

		output: "event(touch happens) state(is touched)"
	}, {
		name: "Mechanical switch",
		desc: "common toggle switches",
		modOut: "sensor",

		output: "event(close happens) event(open happens) state(is closed)"
	},

]