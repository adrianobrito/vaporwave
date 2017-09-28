import {expect} from 'chai';
import PersistentDatabase from '../../src/database/persistent-database';

describe('PersistentDatabase', () => {
    const demoObject            = { "username": "demo", "id" : 1 };
    const initialData           = {};
    const collectionName        = "collection";
    initialData[collectionName] = [demoObject];
    const persistentDatabase    = new PersistentDatabase(initialData);

    after(() => persistentDatabase.clear());

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

            it("should update a specific file in fileSystem", expectSchemaToBeEqualsPersistentFile);
        });
    });

    describe('#put()', () => {
        const newObject = {"content" : "anything", "id": demoObject.id};
        const request   = {
            "endpoint": {
                "entity": collectionName,
                "id" : demoObject.id
            },
            "body" : newObject
        };

        describe("when this method is executed", () => {
            persistentDatabase.put(request);

            it("should update a specific file in fileSystem", expectSchemaToBeEqualsPersistentFile);
        });
    });

    describe('#delete()', () => {
        const request   = {
            "endpoint": {
                "entity": collectionName,
                "id" : demoObject.id
            }
        };

        persistentDatabase.delete(request);

        describe("when this method is executed", () => {
            it("should update a specific file in fileSystem", expectSchemaToBeEqualsPersistentFile);
        });
    });

    describe("with any fixture data", () => {
        const previousData                     = persistentDatabase.fileContent;
        const persistentDatabaseWithAnyFixture = new PersistentDatabase();

        it("have fixture data equals previous schema and database file content", () => {
            expect(previousData).to.deep.equals(persistentDatabaseWithAnyFixture.schema);
            expect(previousData).to.deep.equals(persistentDatabaseWithAnyFixture.fileContent);
        });
    })

    function expectSchemaToBeEqualsPersistentFile() {
        const fileContent  = persistentDatabase.fileContent;
        const memorySchema = persistentDatabase.schema;

        expect(fileContent).to.deep.equals(memorySchema);
    }
});
