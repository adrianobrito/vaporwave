import {expect} from 'chai';
import MemoryDatabase from '../../src/database/memory-database';
import FileLoader from '../tool/file-loader';

describe('MemoryDatabase', () => {
	let memoryDatabase;

	describe('#get()', () => {
		const collectionName = "collection";
		const demoCollection = [{ "name": "collection", "id" : 1 }];

		before(() => {
			const initialData 			= {};
			initialData[collectionName] = demoCollection;
			memoryDatabase              = new MemoryDatabase(initialData);
		});

		it('should return all values from a specific endpoint', () => {
			const request = {
				"endpoint": { 
					"entity": collectionName
				} 
			};
			const result  = memoryDatabase.get(request);

			expect(result).to.be.not.empty;
			expect(result).to.have.lengthOf(demoCollection.length);
		});

		it('should return a specific object', () => {
			const firstCollectionItem = demoCollection[0];
			const request = {
				"endpoint": { 
					"entity": collectionName,
					"id" : firstCollectionItem.id
				}
			};
			const result  = memoryDatabase.get(request);

			expect(result).to.exist;
			expect(result).to.be.equal(firstCollectionItem);
		});
	});

	describe('#post()', () => {
		it('should return an object with a non-null id property', () => {
			const newItem = {
				name: "New Item";
			};
			const request = {
				"endpoint": { 
					"entity": collectionName,
				},
			};
		});
	});

	describe('#put()', () => {
		it('should return an updated version of an specific object from an endpoint', () => {});
	});

	describe('#delete()', () => {
		it('should return an the removed object', () => {});
	});

});