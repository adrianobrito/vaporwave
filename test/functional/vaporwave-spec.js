import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import Server from '../../src/server';

describe('Vaporwave Server', () => {

	const port           = 8000;
	const serverUrl      = `http://localhost:${port}`;
	const collectionName = 'collection';
	const path = `/${collectionName}`;

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
			it("should return a JSON with same id specified in path");			
		});
	});

	describe("HTTP POST", () => {
		const jsonObject = {"name" : "Adriano"};

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

			it("should add a new object in server", () => {
				let serverCollection;

				function getCollectionFromServer() {
					return new Promise((resolve, reject) => {
						chai.request(serverUrl)
							.get(path)
							.end((err, res) => {
								resolve(res.body);
							});
					});
				}

				before((done) => {
					getCollectionFromServer().then((responseBody) => {
						serverCollection = responseBody;
					});
				});

				chai.request(serverUrl)
					.post(path)
					.send(jsonObject)
					.then((res) => {
						expect(res).to.have.status(200);
						getCollectionFromServer().then((responseBody) => {
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