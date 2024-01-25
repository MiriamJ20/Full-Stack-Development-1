const Data = require('../../shared/resources/data');

const contactUs = (req,res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const message = req.body.message;

  const responseMessage = `Message received from ${firstName} ${lastName}`;

  console.log(responseMessage);
  res.send(responseMessage);
};

const calcQuote = (req,res) => {
  // define constants
  const buildingType = req.params.buildingType;

  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const tier = req.query.tier.toLowerCase();

  // validate request object
  if (!vaildBuildingType(buildingType)) {
    return res.status(400).send(`Error: Invaild Building Type`);
  };

  if(!Object.keys(Data.unitPrices).includes(tier)){
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  };
  
  if(isNaN(floors) || isNaN(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be specified as numbers`);
    return;
  };

  if(!Number.isInteger(floors) || !Number.isInteger(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be integers`);
    return;
  };

  if(floors < 1 || apts < 1){
    res.status(400);
    res.send(`apts and floors must be greater than zero`);
    return;
  };

  // business logic
  const numElevators = calculateElevators(floors, apts);
  const totalCost = calculateTotalCost(numElevators,tier);

  // format response
  res.send({
    elevators_required:numElevators,
    cost: totalCost
  });
};

// Validate Building Types 
function vaildBuildingType(type) {
  const validTypes = ["residential", "commercial", "industrial"];
  return validTypes.includes(type);
};

function calculateElevators(buildingType, numFloors, numApts) {
	if (buildingType === "residential") {
		return Math.ceil(numApts / numFloors / 6) * Math.ceil(numFloors / 20);
	} else if (buildingType === "commercial") {
		const elevatorsRequired =
			Math.ceil((numApts * numFloors) / 200) * Math.ceil(numFloors / 10);
		const freighElevatorsRequired = Math.ceil(numFloors / 10);
		return freighElevatorsRequired + elevatorsRequired;
  } else if (buildingType === "industrial") {
    return Math.ceil(Number(elevatorsInput.value)); 
	}
  return 0;
};

// Function to calculate total cost
function calculateTotalCost(numElvs, tier) {
	const unitPrice = Data.unitPrices[tier];
	const installPercentFees = Data.installPercentFees[tier];
	return numElvs * unitPrice * installPercentFees;
};

module.exports = {contactUs,calcQuote};