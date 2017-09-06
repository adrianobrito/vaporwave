import {expect} from 'chai';
import Server from '../../src/server';

describe('Vaporwave Server Spec', () => {

	before(() => {
		Server.start();
	});

	describe("HTTP GET", () => {
		describe("when the URL doesn't have a specific id in its path", () => {
			it("should return a Array");			
		});

		describe("when the URL has a specific id in its path", () => {
			it("should return a JSON with same id specified in path");			
		});
	});

	describe("HTTP POST", () => {
		describe("when a JSON is sent in request body", () => {
			it("should return a JSON with a non-null id property");
			it("should add a new object in server");
		});
	});

	describe("HTTP PUT", () => {
		describe("when a JSON is sent in request body with id specified in request URL", () => {
			it("should return a JSON with a non-null id property");
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