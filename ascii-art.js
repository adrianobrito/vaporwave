(function (asciiArt) {
	var figlet = require('figlet');

	asciiArt.render = render;

	function render() {
		figlet.text('Vaporwave', {
		    font: 'Big Chief',
		}, function(err, data) {
		    if (err) {
		    	onError(err);
		        return;
		    }
		    console.log(data);
		});
	}

	function onError(error) {
		console.log("[ERROR] The splash failed on render");
		console.error(error);
	}

})(module.exports);