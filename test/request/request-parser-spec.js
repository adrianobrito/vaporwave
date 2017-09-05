import {expect} from 'chai';

describe('RequestParser', () => {

	describe("#extractRequestData", () => {

		describe("when a request don't has id in path", () => {
			it("parses to an object with an endpoint without id property");
		});

		describe("when a request has id in path", () => {
			it("parses to an object with an endpoint cointaining id property");
		});

		describe("when a request has body", () => {
			it("parses to an object with non-null body property");
		}

		describe("when a request don't has body", () => {
			it("parses to an object without body property");
		}

		it("parses to an object with non-null method property");

	});

});