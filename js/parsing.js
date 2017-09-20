/* 
 * Parse lines into data
 */



function parseLines(lines, headerIndices) {

	var cells = lines.split("\n").map(function(line) {
		return line.split("\t");
	});

	

	console.log(cells[1]);

	// Add the data from the header index
	var data = {};
	for (var i = 0; i < headerIndices.length; i++) {
		var next = cells[0].length;
		if (i < headerIndices.length - 1)
			next = headerIndices[i + 1].index;

		var header = headerIndices[i];
	//	console.log(header.name + ": " + header.index + "-" + next);
		// Scrape all the data from these columns
		data[header.name] = cells.map(function(cellRow) {
			return cellRow.slice(header.index, next);
		});



	}

	$.each(data, function(type, dataset) {
		$.each(dataset, function(index, cardData) {
		
			if (cardData.length > 1 && cardData[0] !== "")
				var card = new SVGCard(type, cardData);
		});
	})
}


//var cardSettings = "	Inputs	output			transformations	from					renderings					\n3	keyboard	text		1	Voronoi	points		graph		1	sound volume	scalar	1	overlaid on nature	1	a pair of interactors\n3	mouse	points		1	Delaunay	points		graph		2	LED brightness	scalar	1	in a public street	1	a crowd of interactors\n3	kinect	points	depth map	1	detect contours	depth map		[contour lines]curves		1	projection on fog	image	1	on a dress at a fashion show	1	'Ender's Game' interactors don't know their input is being used for art\n3	leap motion	points		1	Stipplegen	depth map		[point distribution]points		3	servo motor	scalar	1	embedded in a tree	1	interactors and viewers aren't the same people\n2	webcam	image		1	calculate gradient	depth map		[gradient directions]vector field		2	LCD screen	image	1	in a commercial gallery	1	interactors and viewers aren't the same species\n1	footsteps	points		2	subtractive motion detection	image		depth map		2	virtual reality	image	1	in a museum gallery	1	interactors and viewers aren't in the same location\n1	drawings on persistent surface	image		4	perlin noise 2D	scalar		depth map	vector field	5	projection on screen	image				\n5	music	sound		4	perlin noise 	scalar		scalar		1	projection on very small screen	image				\n2	voice	sound	text	2	sine curve	scalar		scalar		1	projection on very large screen	image				\n0	blink tracking	scalar		4	construct curve over time	points		curves		1	projection on architecture	image				\n1	squishy touchscreen	depth map		2	mask image	image	depth map	image		1	projection on/in living being	image				\n1	touchscreen	points		3	simulate as particles	points	vector field (gravity)	points		1	print-on-demand	image				\n1	time	scalar		2	render as lights	points		image		1	projection on translucent material	image				\n2	stock market data	scalar		1	pottery wheel	curves		[extruded object]3D object								\n3	famous text corpora (Emma, etc)	text		2	calligraphic rendering	curves		image								\n2	tweets	text		1	render as grass	vector field	[optional color]image	image								\n1	photos	images		10	debug draw	any		image								\n1	microbe tracking	points		2	Monte Carlo Markov Chain	text	graph	[regenerated text]text								\n2	tilt sensor	scalar		1	uniform vector field	[direction]scalar	[direction]scalar	vector field								\n2	proximity sensor	scalar		1	get magnitude	vector field		depth map								\n3	tracery-text	text		1	simulate Braitenberg vehicles	vector field		points								\n1	pendulum swings	scalar		1	sentiment analysis	text		scalar								\n1	global wind speed	vector field		5	render text	text		image								\n1	an ant farm	image		2	split text to particles	text		points								\n2	a joystick	scalar [force]	scalar [direction]		photo labelling	photo		text								\n2	face tracking	points			quilt pattern	image	scalar[tuning]	graph								\n1	eye tracking	vector field			pixelization	image		image								\n1	laser-pointer tracking	points			deepforger	image	image	image								\n1	Conways game of life	depth map			flocking	scalar[cohesion]	scalar[alignment]	curves								\n1	Fabric switches	scalar			simulated theremin	scalar	scalar	sound								\n1	skin conductivity	scalar			get amplitude	sound		curve								\n					get pitch	sound		curve								\n					abc notation	text		sound								\n					volume adjustment	scalar	sound	sound								\n					pitch adjustment	scalar	sound	sound								";

var cardSettings = "3	keyboard	text		1	Voronoi	points		graph		1	sound volume	scalar	1	overlaid on nature	1	a pair of interactors\n3	mouse	points		1	Delaunay	points		graph		2	LED brightness	scalar	1	in a public street	1	a crowd of interactors\n3	kinect	points	depth map	1	detect contours	depth map		[contour lines]curves		1	projection on fog	image	1	on a dress at a fashion show	1	'Ender's Game' interactors don't know their input is being used for art\n3	leap motion	points		1	Stipplegen	depth map		[point distribution]points		3	servo motor	scalar	1	embedded in a tree	1	interactors and viewers aren't the same people\n2	webcam	image		1	calculate gradient	depth map		[gradient directions]vector field		2	LCD screen	image	1	in a commercial gallery	1	interactors and viewers aren't the same species\n1	footsteps	points		2	subtractive motion detection	image		depth map		2	virtual reality	image	1	in a museum gallery	1	interactors and viewers aren't in the same location\n1	drawings on persistent surface	image		4	perlin noise 2D	scalar		depth map	vector field	5	projection on screen	image				\n5	music	sound		4	perlin noise 	scalar		scalar		1	projection on very small screen	image				\n2	voice	sound	text	2	sine curve	scalar		scalar		1	projection on very large screen	image				\n0	blink tracking	scalar		4	construct curve over time	points		curves		1	projection on architecture	image				\n1	squishy touchscreen	depth map		2	mask image	image	depth map	image		1	projection on/in living being	image				\n1	touchscreen	points		3	simulate as particles	points	vector field (gravity)	points		1	print-on-demand	image				\n1	time	scalar		2	render as lights	points		image		1	projection on translucent material	image				\n2	stock market data	scalar		1	pottery wheel	curves		[extruded object]3D object		1	3D printed	3D				\n3	famous text corpora (Emma, etc)	text		2	calligraphic rendering	curves		image		1	played on a speaker	sound				\n2	tweets	text		1	render as grass	vector field	[optional color]image	image			printed on fabric	image				\n1	photos	images		10	debug draw	any		image			knitting instructions	scalar				\n1	microbe tracking	points		2	Monte Carlo Markov Chain	text	graph	[regenerated text]text								\n2	tilt sensor	scalar		1	uniform vector field	[direction]scalar	[direction]scalar	vector field								\n2	proximity sensor	scalar		1	get magnitude	vector field		depth map								\n3	tracery-text	text		1	simulate Braitenberg vehicles	vector field		points								\n1	pendulum swings	scalar		1	sentiment analysis	text		scalar								\n1	global wind speed	vector field		5	render text	text		image								\n1	an ant farm	image		2	split text to particles	text		points								\n2	a joystick	scalar [force]	scalar [direction]		photo labelling	photo		text								\n2	face tracking	points			quilt pattern	image	scalar[tuning]	graph								\n1	eye tracking	vector field			pixelization	image		image								\n1	laser-pointer tracking	points			deepforger	image	image	image								\n1	Conway's game of life	depth map			flocking	scalar[cohesion]	scalar[alignment]	curves								\n1	Fabric switches	scalar			simulated theremin	scalar	scalar	sound								\n1	skin conductivity	scalar			get amplitude	sound		curve								\n					get pitch	sound		curve								\n					abc notation	text		sound								\n					volume adjustment	scalar	sound	sound								\n					pitch adjustment	scalar	sound	sound								\n					sample pixels	image		[color]scalar	[brightness]scalar							\n																";