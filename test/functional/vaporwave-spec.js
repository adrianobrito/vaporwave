import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Server from '../../src/server';
import MemoryDatabase from '../../src/database/memory-database.js';
import DynamicIdGenerator from '../../src/database/dynamic-id-generator.js';

describe('Vaporwave Server', () => {

	const port           = 8000;
	const serverUrl      = `http://localhost:${port}`;
	const collectionName = 'collection';
	const path           = `/${collectionName}`;

	before(() => {
		chai.use(chaiHttp);
		Server.start();
	});

	describe("HTTP GET", () => {
		describe("when the URL doesn't have a specific id in its path", () => {
			it("should return a Array", (done) => {
				chai.request(serverUrl)
					.get(path)
					.end((err, res) => {
						expect(res).to.have.status(200);
						expect(res.body).to.be.a('array');
						done();
					});
			});
		});

		describe("when the URL has a specific id in its path", () => {
			const memoryDatabase = new MemoryDatabase();
			const mockedId       = DynamicIdGenerator.generateId();
			const mockedRequest  = {
				method   : 'GET',
				endpoint : {
					entity : "collection",
					id : mockedId
				},
				body: undefined
			};
			const expectedReturn = { name: "zimba", id: mockedId };
			const pathWithId     = `${path}/${mockedId}`;

			before(() => {
				const stubbedGet = sinon.stub();
				stubbedGet
					.withArgs(mockedRequest)
					.returns(expectedReturn);

				memoryDatabase.get = stubbedGet;
			});

			after(() => {
				Server.setDatabase(new MemoryDatabase());
			})

			it("should return a JSON with same id specified in path", (done) => {
				chai.request(serverUrl)
					.get(pathWithId)
					.end((err, res) => {
						expect(res).to.have.status(200);
						expect(res.body).to.exist;
						expect(res.body.id).to.be.equals(mockedRequest.id);
						done();
					});
			});
		});
	});

	describe("HTTP POST", () => {
		const jsonObject = {"name" : "Adriano"};

		function fetchDataFromServer(id) {
			const currentPath = id ? `${path}/${id}` : path;
			return new Promise((resolve, reject) => {
				chai.request(serverUrl)
					.get(currentPath)
					.end((error, response) => {
						if(error) {
							reject(error);
						} else {
							resolve(response.body);
						}
					});
			});
		}

		describe("when a JSON is sent in request body", () => {
			it("should return a JSON with a non-null id property", (done) => {
				chai.request(serverUrl)
					.post(path)
					.send(jsonObject)
					.then((res) => {
						expect(res).to.have.status(200);
						expect(res.body.id).to.exist;
						done();
					});
			});

			it("should be possible access the object with id in path", (done) => {
				chai.request(serverUrl)
					.post(path)
					.send(jsonObject)
					.then((response) => {
						expect(response).to.have.status(200);
						fetchDataFromServer(response.body.id)
							.then((responseBody) => {
								expect(responseBody).to.exist;
								expect(response.body.id).to.be.equals(responseBody.id);
								done();
							});
					});
			});

			it("should add a new object in server", () => {
				let serverCollection;

				before((done) => {
					fetchDataFromServer().then((responseBody) => {
						serverCollection = responseBody;
					});
				});

				chai.request(serverUrl)
					.post(path)
					.send(jsonObject)
					.then((res) => {
						expect(res).to.have.status(200);
						fetchDataFromServer().then((responseBody) => {
							expect(responseBody.length).to.be.equal(serverCollection.length + 1);
							done();
						});
					});
			});
		});
	});

	describe("HTTP PUT", () => {
		describe("when a JSON is sent in request body with id specified in request URL", () => {
			it("should return a JSON with a non-null id property", );
			it("should update the object sent in request in server");
		});
	});

	describe("HTTP DELETE", () => {
		describe("when a JSON is sent in request body with id specified in request URL", () => {
			it("should return a JSON with a non-null id property");
			it("should remove the object related with specified in server");
		});
	});

});
