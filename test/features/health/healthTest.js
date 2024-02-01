const chai = require('chai');
const sinon = require('sinon');
require("dotenv").config();
const HealthController = require('../../../src/features/health/health.controller');
const ResponseUtil = require('../../../src/shared/utils/response-util').ResponseUtil;

describe('HealthController',()=>{
  afterEach(() => {
    sinon.restore();
  });

  describe('#helloWorld()', () => {
		// Test to ensure that the helloWorld function responds with 'Hello World'
		it("respond with Hello World", (done) => {
			sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
				chai.assert.equal(message, "Hello World");
				done();
			});
			// Call the helloWorld function
			void HealthController.helloWorld();
		});
	});

  describe('#status()', () => {
		// Test to ensure that the status function responds with a status message
		it("responds with Status OK", (done) => {
			sinon.stub(ResponseUtil, "respondOk").callsFake((res, data, message) => {
				chai.assert.equal(
					message,
					`Environment '${process.env.ENV_NAME}' running on port: ${process.env.PORT}`
				);
				done();
			});
			// Call the status function
			void HealthController.status();
		});
	});

  describe('#error()', () => {
		// Test to ensure that the error function responds with a 500 status code and an error message
		it("responds with respondBadRequest", (done) => {
			const stubRes = { status: sinon.stub() };
			sinon.stub(ResponseUtil, "respondError").callsFake((res, data, errMessage) => {
				chai.assert.equal(errMessage, "error");
				// Ensure that the status function was called with the correct status code
				sinon.assert.calledWith(stubRes.status, 500);
			});
			done();
      // Call the Error function
			void HealthController.error();
		});
	});
});