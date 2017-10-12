const RequestParser = (() => {
    return {
        extractRequestData(request) {
            return {
                endpoint : extractEndpoint(request),
                method   : extractMethod(request),
                body     : extractBody(request)
            };
        }
    };

    function extractEndpoint(request) {
        console.log("[INFO] Parsing incoming request");
        var url         = request.url;
        var urlRegex    = /([\/A-Za-z+]+)(\/[\d+]*)/;
	var myRegex     = /^([\/A-Za-z]+)((\?)([A-Za-z]*)(=)([A-Za-z0-9]+))$/
	var lastUrlPath ;
	if (myRegex.test(url)){
		myRegex.exec(url);
		lastUrlPath = url.replace(myRegex, '$6')
		let obj = {} ;
		obj['entity'] = url.replace(myRegex, '$1');
		obj['select'] = url.replace(myRegex, '$4');
		obj[url.replace(myRegex, '$4')] = (url.replace(myRegex, '$4')=='id')?parseInt(lastUrlPath):lastUrlPath;
		return obj ;
	} else {
        	urlRegex.exec(url);
	        lastUrlPath = url.replace(urlRegex, '$2').replace('/','');
	        return isDigit(lastUrlPath) ?
        	    {entity: url.replace(urlRegex, '$1'), id: parseInt(lastUrlPath)} :
	            {entity: url};
	}
    }

    function extractBody(request) {
        var body = request.body;
        return body && JSON.parse(body) || undefined;
    }

    function extractMethod(request) {
        return request.method;
    }

    function isDigit(str) {
        return /^\d+$/.test(str);
    }
})();

export default RequestParser;
