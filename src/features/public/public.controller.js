const Data = require('../../shared/resources/data');
const asyncWrapper = require("../../shared/util/base-utils");
const Contact = require("../../shared/db/mongodb/schemas/contact.schema");

const contactUs = asyncWrapper(async (req, res) => {
	try {
		const {
			fullname,
			email,
			phone,
			department,
			company_name,
			project_name,
			project_desc,
			message,
		} = req.body;
		console.log(req.body);

		if (!fullname ||!email ||!phone ||!company_name ||!department ||!project_name ||!project_desc ||!message)
			return res.status(400).json({ error: "Please fill all fields" });

const newContact = new Contact({
	fullname,
	email,
	phone,
	company_name,
	project_name,
	project_desc,
	department,
	message,
});


		await newContact.save();
		res.status(201).json({ success: true, data: newContact });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// Quote Request
const calc = asyncWrapper(async (req, res) => {
	const buildingType = req.query.buildingType;

	if (buildingType !== "residential" && buildingType !== "commercial" && buildingType !== "industrial") {
		return res.status(400).send(`Error: Invalid Building Type`);
	}

	const apts = req.query.apts;
	const floors = req.query.floors;
	const tier = req.query.tier.toLowerCase();
	
	if (!Object.keys(Data.unitPrices).includes(tier)) {
		res.status(400).send(`Error: Invalid tier`);
		return;
	}

	if (buildingType == "residential") {
		if (isNaN(apts) || isNaN(floors)) {
			res.status(400).send(`Error: apts and floors must be specified as numbers`);
			return;
		}

		// if (!Number.isInteger(floors) || !Number.isInteger(apts)) {
		// 	res.status(400).send(`Error: apts and floors must be integers`);
		// 	return;
		// }

		if (floors < 1 || apts < 1) {
			res.status(400).send(`apts and floors must be greater than zero`);
			return;
		}

		const numElevators = calcResidentialElev(floors, apts);
		const totalCost = calcInstallFee(numElevators, tier);

		res.send({
			elevators_required: numElevators,
			cost: totalCost,
		});
	}
	if (buildingType == "industrial") {
		const elevators = req.query.elevators;

		if (isNaN(elevators)) {
			res.status(400).send("Error: elevators must be specified as a number");
			return;
		}

		// if (!Number.isInteger(elevators)) {
		// 	res.status(400).send(`Error: elevators must be integers`);
		// 	return;
		// }

		if (elevators < 1) {
			res.status(400).send(`Error: elevators must be greater than zero`);
			return;
		}

		const numElevators = calcIndustrialElev(elevators);
		const totalCost = calcInstallFee(numElevators, tier);
		
		res.send({
			elevators_required: numElevators,
			cost: totalCost,
		});
	}

	if (buildingType == "commercial") {
		const occupancy = req.query.occupancy;
		const floors = req.query.floors;
		if (isNaN(floors) || isNaN(occupancy)) {
			res.status(400).send(`Error: Occupancy & Floors must be Numbers`);
			return;
		}

		// if (!Number.isInteger(floors) || !Number.isInteger(occupancy)) {
		// 	res.status(400).send(`Error: Occupancy & Floors must be Integers`);
		// 	return;
		// }

		if (floors < 1 || occupancy < 1) {
			res.status(400).send(`Error: Both floors and occupancy must be greater than zero.`);
			return;
		}

		const numElevators = calcCommercialElev(floors, occupancy);
		const totalCost = calcInstallFee(numElevators, tier);

		res.send({
		elevators_required: numElevators,
		cost: totalCost,
	});
	}
});

const calcResidentialElev = (numFloors, numApts) => {
	const elevatorsRequired =
		Math.ceil(numApts / numFloors / 6) * Math.ceil(numFloors / 20);
	return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
	const elevatorsRequired =
		Math.ceil((maxOccupancy * numFloors) / 200) * Math.ceil(numFloors / 10);
	const freighElevatorsRequired = Math.ceil(numFloors / 10);
	return freighElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
	const unitPrice = Data.unitPrices[tier];
	const installPercentFees = Data.installPercentFees[tier];
	const total = numElvs * unitPrice * installPercentFees;
	return total;
};

module.exports = { contactUs, calc };