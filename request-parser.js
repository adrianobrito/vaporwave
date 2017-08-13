(function (requestParser) {

    requestParser.extractRequestData = extractRequestData;

    function extractRequestData(request) {
        return {
            endpoint : extractEndpoint(request),
            method   : extractMethod(request),
            body     : extractBody(request)
        };
    }

    function extractEndpoint(request) {
        var url         = request.url;
        var urlRegex    = /([\/A-Za-z+]+)(\/[\d+]*)/;
        var groups      = urlRegex.exec(url);
        var lastUrlPath = url.replace(urlRegex, '$2').replace('/','');

        return isDigit(lastUrlPath) ?
            {entity: url.replace(urlRegex, '$1'), id: parseInt(lastUrlPath)} :
            {entity: url};
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

})(module.exports);