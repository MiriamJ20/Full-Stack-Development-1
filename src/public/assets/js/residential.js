const url = "http://localhost:3004/agents";
let tableBody = "";
const updateTable = (region) => {
	fetch(`${url}?region=${region}`)
		.then((response) => response.json())
		.then((json) => {
			let agentData = json.data;

			agentData.sort((a, b) => b.rating - a.rating);

			const formatter = new Intl.NumberFormat("en-us", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			});

			tableBody = "";

			agentData.forEach((agent) => {
				let ratingColor = "";
				if (agent.rating >= 100) {
					ratingColor = "green";
				} else if (agent.rating >= 90) {
					ratingColor = "blue";
				} else {
					ratingColor = "purple";
				}

			tableBody += `<tr>
          <td>${agent.first_name} ${agent.last_name}</td>
          <td style="color: ${ratingColor}">${agent.rating}%</td>
          <td>${formatter.format(agent.fee)}</td>
          <td>${agent.region}</td>
        </tr>`;
			});

			document.getElementById("agent").innerHTML = tableBody;
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
};

const filterTableByRegion = () => {
	const regionFilter = document.getElementById("regionFilter");
	const selectedRegion = regionFilter.value;
	updateTable(selectedRegion);
};
updateTable("all");