const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		company_name: {
			type: String,
			required: true,
		},
		project_name: {
			type: String,
			required: true,
		},
		project_desc: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			enum: ["commercial", "residential"],
			required: true,
		},
		message: {
			type: String,
		},
		file: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Contact", contactUsSchema);