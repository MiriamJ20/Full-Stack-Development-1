const url = "http://localhost:3004/agents";
let tableBody = "";
let agentData = [];
// The updateTable function fetches agent data from the API
const updateTable = (region) => {
	fetch(`http://localhost:3004/agents`)
		.then((response) => response.json())
		.then((json) => {
			const agentData = json.data;

			agentData.sort((a, b) => b.rating - a.rating);

			const formatter = new Intl.NumberFormat("en-us", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			});

			tableBody = "";
			// Loop through the sorted agent data and add a table row for each agent
			agentData.forEach((agent) => {
				let ratingColor = "";
				if (agent.rating >= 100) {
					ratingColor = "green";
				} else if (agent.rating >= 90) {
					ratingColor = "blue";
				} else {
					ratingColor = "purple";
				}
				// Add a table row to the table body for each agent
				tableBody += `<tr>
          <td>${agent.first_name} ${agent.last_name}</td>
          <td style="color: ${ratingColor}">${agent.rating}%</td>
          <td>${formatter.format(agent.fee)}</td>
          <td>${agent.region}</td>
        </tr>`;
			});
			// Update the table body with the new data
			document.getElementById("agent").innerHTML = tableBody;
		})
		.catch((error) => {
			console.error(
				`Error fetching data for region ${region}: ${error.message}`
			);
		});

};
// The sortTable function sorts the agent data by the specified column
// in ascending or descending order
const sortTable = (column) => {
	const isNumeric = column === "rating" || column === "fee";

	agentData.sort((a, b) => {
		if (isNumeric) {
			return a[column] - b[column];
		} else {
			return a[column].localeCompare(b[column]);
		}
	});
//  After sorting, update the table with the sorted data
	updateTable("all");
};
// The filterTableByRegion function updates the table with agent data
// for the selected region
const filterTableByRegion = () => {
	const regionFilter = document.getElementById("regionFilter");
	const selectedRegion = regionFilter.value;
	updateTable(selectedRegion);
};
updateTable("all");