var currentGrammar, editor;

$(document).ready(function() {

	console.log("Start");

	$("#debug-panel").draggable();


	initUI();
	
	//testParse($("#left-col > .section-contents"));

	$("<div/>", {
		id: "node-holder",

	}).appendTo($("#node-viz"));


	//var rootUI = new UINode(root, $("#node-holder"));
	//var grammarView = new GrammarView($("#grammar-holder"));
	//grammarView.setGrammar(grammar);


});