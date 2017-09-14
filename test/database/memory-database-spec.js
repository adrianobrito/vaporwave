import {expect} from 'chai';
import MemoryDatabase from '../../src/database/memory-database';
import FileLoader from '../tool/file-loader';

describe('MemoryDatabase', () => {
	const collectionName        = "collection";
	const demoObject            = { "name": "collection", "id" : 1 };
	const demoCollection        = [demoObject];
	const initialData 			= {};
	initialData[collectionName] = demoCollection;
	const memoryDatabase        = new MemoryDatabase(initialData);

	describe('#get()', () => {
		const firstItemCollection = demoCollection[0];

		describe("when an id is not specified in request", () => {
			const request = {
				"endpoint": { 
					"entity": collectionName
				} 
			};
			const result  = memoryDatabase.get(request);

			it('should return all values from a specific endpoint', () => {
				expect(result).to.be.not.empty;
				expect(result).to.have.lengthOf(demoCollection.length);
			});
		});

		describe("when an id is specified in request", () => {
			const request = {
				"endpoint": { 
					"entity": collectionName,
					"id" : firstItemCollection.id
				}
			};
			const result  = memoryDatabase.get(request);

			it('should return a specific object', () => {
				expect(result).to.exist;
				expect(result).to.be.equal(firstItemCollection);
			});
		});
	});

	describe('#post()', () => {
		const collectionRequest = {
			"endpoint": {
				"entity": collectionName
			}
		};
		const object = {
			"name" : "Adriano Brito"
		};
		const request = {
			"endpoint": {
				"entity": collectionName
			},
			"body"  : object
		};
		const previousCollectionSize = memoryDatabase.get(collectionRequest).length;

		describe("when an JSON is sent in request body",  () => {
			const currentObject = memoryDatabase.post(request);

			it('should return an object with a non-null id property', () => {
				expect(currentObject).to.exist;
				expect(currentObject.id).to.exist;
				expect(currentObject.name).to.be.equal(object.name);
			});

			it('should add the JSON object in a specific endpoint', () => {
				const currentCollection = memoryDatabase.get(collectionRequest);

				expect(currentCollection).to.exist;
				expect(currentCollection).to.deep.include(object);
				expect(currentCollection).to.have.lengthOf(previousCollectionSize + 1);
			});

			it('should able to get the added object sending the id in endpoint of request', () => {
				const currentEndpoint = collectionRequest.endpoint;
				currentEndpoint.id = currentObject.id;

				const responseObject = memoryDatabase.get(collectionRequest);
				expect(responseObject).to.exist;
				expect(responseObject.id).to.be.equals(currentEndpoint.id);
			});
		});
	});

	describe('#put()', () => {
		demoObject.name = "new updated name";
		const request = {
			"endpoint": { 
				"entity": collectionName,
				"id"    : demoObject.id
			},
			"body"  : demoObject
		};

		describe("when an JSON is sent in request body with id specified in endpoint",  () => {
			const currentObject = memoryDatabase.put(request);

			it('should return an updated version of an specific object from an endpoint', () => {
				expect(currentObject).to.exist;
				expect(currentObject).to.be.equals(request.body);
			});
			
			it('should update the specific object in database', () => {
				const responseObject = memoryDatabase.get(request);
				expect(responseObject).to.be.equals(currentObject);
			});			
		});
	});

	describe('#delete()', () => {
		let demoDeletedObject = {
			"name" : "deleted object"
		};
		const postRequest = {
			"endpoint": { 
				"entity": collectionName
			},
			"body" : demoDeletedObject
		};
		demoDeletedObject = memoryDatabase.post(postRequest);

		describe("when an id is specified in endpoint", () => {
			const deleteRequest = {
				"endpoint": { 
					"entity": collectionName,
					"id"    : demoDeletedObject.id
				}
			};
			const currentObject = memoryDatabase.delete(deleteRequest);
			
			it('should return the removed object', () => {
				expect(currentObject).to.exist;
			});

			it('should remove the object from the endpoint', () => {
				const responseObject = memoryDatabase.get(deleteRequest);
				expect(responseObject).to.be.undefined;
			});			
		});
	});

});