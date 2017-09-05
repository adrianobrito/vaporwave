import figlet from 'figlet';

const AsciiArt = (() =>{

    function onError(error) {
        console.log("[ERROR] The splash failed on render");
        console.error(error);
    }

    return { 
        render() {
            figlet.text('Vaporwave', {
                font: 'Big Chief',
            }, (err, data) => {
                if (err) {
                    onError(err);
                    return;
                }
                console.log(data);
            });     
        }
    };

})();

export default AsciiArt;