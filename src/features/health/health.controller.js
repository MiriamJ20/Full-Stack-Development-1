const ResponseUtil = require('../../shared/utils/response-util').ResponseUtil;
require('dotenv').config();
const port = process.env.PORT;

const helloWorld = async(req, res) => {
  ResponseUtil.respondOk(res,null, 'Hello World')
  // res.send('Hello World!!');
};

const status = (req, res) => {
  ResponseUtil.respondOk(
		res,
		null,
		`Environment '${process.env.ENV_NAME}' running on port: ${process.env.PORT}`
	);
  // res.send(`Environment '${envName}' running on port: ${port}`);
};

const error = (req,res) => {
  ResponseUtil.respondError(res.status(500), null, "error");
  // res.send('error');
};

module.exports = {helloWorld, status, error};