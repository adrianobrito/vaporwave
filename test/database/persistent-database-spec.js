import {expect} from 'chai';
import PersistentDatabase from '../../src/database/persistent-database';

describe('PersistentDatabase', () => {
    const collectionName     = "collection";
    const persistentDatabase = new PersistentDatabase();

    describe('#get()', () => {
        describe("when this method is executed", () => {
            it("should get the state from a specific file in fileSystem");
        });
    });

    describe('#post()', () => {
        const requestJson = { "username": "test" };
        const request     = {
            "endpoint": {
                "entity": collectionName
            },
            "body" : requestJson
        };

        describe("when this method is executed", () => {
            persistentDatabase.post(request);

            it("should update a specific file in fileSystem", () => {
                const fileContent  = persistentDatabase.fileContent;
                const memorySchema = persistentDatabase.schema;

                expect(fileContent).to.deep.equals(memorySchema);
            });
        });
    });

    describe('#put()', () => {
        describe("when this method is executed", () => {
            it("should update a specific file in fileSystem");
        });
    });

    describe('#delete()', () => {
        describe("when this method is executed", () => {
            it("should update a specific file in fileSystem");
        });
    });
});
