(function (urlResolver) {

    function extractRequestData(url) {
        var urlRegex     = /((\/\w+)+)(\/\d)*/;
        var groups       = urlRegex.exec(url);
        var lastUrlPath  = groups[groups.length - 2].replace('/','');

        /*return isDigit(lastUrlPath) ?
            {entity: }*/
    }

    function isDigit(str) {
        return /^\d+$/.test(str);
    }

})(module.exports);