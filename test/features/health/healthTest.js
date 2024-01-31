const chai = require('chai');
const sinon = require('sinon');
const HealthController = require('../src/features/health/health.controller');
const ResponseUtil = require('../src/shared/utils/response-util').ResponseUtil;

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
});

  describe('#status()', () => {
    it('responds with status message', (done) => {
      const expectedMessage = `Environment 'test' running on port: 3004`;

      sinon.stub(process.env, 'ENV_NAME').value('test');
      sinon.stub(ResponseUtil, 'respondOk').callsFake((res, data, message) => {
        chai.assert.equal(message, expectedMessage);
        done();
      });

      void HealthController.status();
    });
  });

  describe('#error()', () => {
    it('responds with error message and status 400', (done) => {
      sinon.stub(ResponseUtil, 'respondError').callsFake((res, message, status) => {
        chai.assert.equal(status, 400);
        chai.assert.equal(message, 'error');
        done();
      });

      void HealthController.error();
    });
  });
