const url = "http://localhost:3004/agents";
let tableBody = "";

fetch(url)
	.then((response) => response.json())
	.then((json) => {
		let agentData = json.data;

		const formatter = new Intl.NumberFormat("en-us", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		});

		agentData.forEach((agent) => {
			let ratingColor = "";
			if (agent.rating >= 100) {
				ratingColor = "green";
			} else if (agent.rating >= 90) {
				ratingColor = "blue";
			} else {
				ratingColor = "purple";
			}

			tableBody +=
			`<tr>
                <td>${agent.first_name} ${agent.last_name}</td>
                <td class="${ratingColor}">${agent.rating}%</td>
                <td>${formatter.format(agent.fee)}</td>
            </tr>`;
		});
		document.getElementById("agent").innerHTML = tableBody;
	});