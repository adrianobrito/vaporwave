(function (urlResolver) {

    urlResolver.extractRequestData = extractRequestData;

    function extractRequestData(url) {
        var urlRegex     = /([\/A-Za-z+]+)(\/[\d+]*)/;
        var groups       = urlRegex.exec(url);
        var lastUrlPath  = url.replace(urlRegex, '$2').replace('/','/');

        return isDigit(lastUrlPath) ?
            {entity: url.replace(urlRegex, '$1'), id: lastUrlPath} :
            {entity: url}
    }

    function isDigit(str) {
        return /^\d+$/.test(str);s
    }

})(module.exports);