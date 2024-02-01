const chai = require('chai');
const sinon = require('sinon');
require("dotenv").config();
const HealthController = require('../../../src/features/health/health.controller');
const ResponseUtil = require('../../../src/shared/utils/response-util').ResponseUtil;

describe('HealthController',()=>{
  afterEach(() => {
    sinon.restore();
  });

  describe('#helloWorld()',()=>{
    it('respond with Hello World',(done)=>{
      sinon.stub(ResponseUtil,'respondOk').callsFake((res,data,message)=>{
        chai.assert.equal(message,'Hello World');
        done();
      });
      void HealthController.helloWorld();
    });
  });

  describe('#status()', () => {
    it('responds with Status OK', (done) => {
      sinon.stub(ResponseUtil, 'respondOk').callsFake((res, data, message) => {
        chai.assert.equal(message, `Environment '${process.env.ENV_NAME}' running on port: ${process.env.PORT}`);
        done();
      });

      void HealthController.status();
    });
  });

  describe('#error()', () => {
    it('responds with respondBadRequest', (done) => {
      const stubRes =  {status: sinon.stub()};
			sinon.stub(ResponseUtil, "respondError").callsFake((res, data, errMessage) => {
        chai.assert.equal(errMessage, 'error');
        sinon.assert.calledWith(stubRes.status, 500)
			});
      done();

			void HealthController.error();
		});
  });
});