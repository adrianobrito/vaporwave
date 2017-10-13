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
        var urlRegex    = /^([\/A-Za-z]+)((\?)([A-Za-z]*)(=)([A-Za-z0-9]+))?$/;
        var urlRegex2   = /([\/A-Za-z+]+)(\/[\d+]*)/;
        var groups ;
        var lastUrlPath ;
	
        let returnObj = {} ;

        if ( urlRegex.test(url) ){
            groups      = urlRegex.exec(url);
            lastUrlPath = url.replace(urlRegex, '$6').replace('/','');
            returnObj['entity'] = url.replace(urlRegex, '$1');
            returnObj['param'] = url.replace(urlRegex, '$4');
            returnObj['multi'] = true;
            returnObj['value'] = (isDigit(lastUrlPath)) ? parseInt(lastUrlPath) : 
                            ((returnObj['param'] == '') ? '' : lastUrlPath) ;
    
            return (lastUrlPath != '') ? returnObj : { 'entity' : url } ;
        } else {
            groups      = urlRegex2.exec(url);
            lastUrlPath = url.replace(urlRegex2, '$2').replace('/','');
            
            returnObj['entity'] = url.replace(urlRegex2, '$1');
            returnObj['param'] = 'id';
            returnObj['multi'] = false;
            returnObj['value'] = parseInt(lastUrlPath);
            
            return returnObj;
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
        return /^\d+$/.test(str);s
    }
})();

export default RequestParser;
