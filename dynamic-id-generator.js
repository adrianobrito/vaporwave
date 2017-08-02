(function (dynamicIdGenerator) {

	var RANDOM_RANGE                = 100000;
    dynamicIdGenerator.generatedIds = [];
    dynamicIdGenerator.generateId   = generateId;

    function generateId(){
        var newGeneratedId = parseInt(Math.random() * RANDOM_RANGE);
        if(dynamicIdGenerator.generatedIds.some(containsId(newGeneratedId))){
            return generateId();
        } else {
            dynamicIdGenerator.generatedIds.push(newGeneratedId);
            return newGeneratedId;
        }
    }

    function containsId(id) {
        return function(generatedId){
            return generatedId === id;
        }
    }

})(module.exports);