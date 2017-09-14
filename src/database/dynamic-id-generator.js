const DynamicIdGenerator = (() => {
    const maximunRange = 100000;
    const generatedIds = [];

    function containsId(id) {
        return function(generatedId){
            return generatedId === id;
        }
    }

    return {
        generateId() {
            console.log("[INFO] Generating a new ID");
            var newGeneratedId = parseInt(Math.random() * maximunRange);
            if(generatedIds.some(containsId(newGeneratedId))){
                return this.generateId();
            } else {
                generatedIds.push(newGeneratedId);
                console.log("[INFO] New Generated ID: " + newGeneratedId);
                return newGeneratedId;
            }
        }
    }
})();

export default DynamicIdGenerator;