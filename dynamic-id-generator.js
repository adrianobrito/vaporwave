(function (dynamicIdGenerator) {

	var RANDOM_RANGE                = 100000;
    dynamicIdGenerator.generatedIds = [];
    dynamicIdGenerator.generateId   = generateId;

    function generateId(){
        console.log("[INFO] Generating a new ID");
        var newGeneratedId = parseInt(Math.random() * RANDOM_RANGE);
        if(dynamicIdGenerator.generatedIds.some(containsId(newGeneratedId))){
            return generateId();
        } else {
            dynamicIdGenerator.generatedIds.push(newGeneratedId);
            console.log("[INFO] New Generated ID: " + newGeneratedId);
            return newGeneratedId;
        }
    }

    function containsId(id) {
        return function(generatedId){
            return generatedId === id;
        }
    }

})(module.exports);