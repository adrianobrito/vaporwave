const QueryExecutor = {

    executeQueryIn(collection, query) {
        console.log(`[INFO] Performing query`);
        const queryKeys = Object.keys(query);
        return collection.filter(
            item => queryKeys.reduce((result, key) => result && (item[key].toString() === query[key]), true)
        );
    }

}

export default QueryExecutor;
