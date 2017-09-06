import {expect} from 'chai';
import RequestParser from '../../src/request/request-parser';

describe('RequestParser', () => {

	describe("#extractRequestData", () => {
		const request = {
			url: '/collection',
			method: 'GET'
		};

		describe("when a request don't has id in path", () => {
			const requestData = RequestParser.extractRequestData(request);

			it("parses to an object with an endpoint without id property", () => {
				expect(requestData).to.exist;
				expect(requestData.endpoint).to.exist;
				expect(requestData.endpoint.id).to.be.undefined;
			});
		});

		describe("when a request has id in path", () => {
			request.url = "/collection/15";
			const requestData = RequestParser.extractRequestData(request);

			it("parses to an object with an endpoint cointaining id property", () => {
				expect(requestData.endpoint.id).to.exist;
			});
		});

		describe("when a request has body", () => {
			request.body = '{ "name" : "object" }';
			const requestData = RequestParser.extractRequestData(request);

			it("parses to an object with non-null body property", () => {
				expect(requestData.body).to.exist;
			});
		});

		describe("when a request don't has body", () => {
			request.body = undefined;
			const requestData = RequestParser.extractRequestData(request);

			it("parses to an object without body property", () => {
				expect(requestData.body).to.be.undefined;
			});
		});

		it("parses to an object with non-null method property", () => {
			const requestData = RequestParser.extractRequestData(request);
			expect(requestData.method).to.exist;
		});

	});

});