/**	CONTACT FORM
*************************************************** **/
var _hash = window.location.hash;

/**
	BROWSER HASH - from php/contact.php redirect!

	#alert_success 		= email sent
	#alert_failed		= email not sent - internal server error (404 error or SMTP problem)
	#alert_mandatory	= email not sent - required fields empty
**/	jQuery(_hash).show();

// CONTACT FORM POST REQUEST //
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	// Extract form data using FormData
	const contactFormData = new FormData(contactForm);
	const data = {};
	// Convert FormData to a plain JavaScript object
	for (const [key, value] of contactFormData.entries()) {
		data[key] = value;
	}
	try {
		// Send a POST request to the contact form API endpoint
		const contactSubmit = await fetch("http://localhost:3004/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// Convert form data to JSON format for the request body
			body: JSON.stringify({
				fullname: data["contact[fullname]"],
				email: data["contact[email]"],
				phone: data["contact[phone]"],
				company_name: data["contact[company_name]"],
				project_name: data["contact[project_name]"],
				project_desc: data["contact[project_desc]"],
				department: data["contact[department]"],
				message: data["contact[message]"],
				file: null,
			}),
		});
		// Parse the response as JSON
		const result = await contactSubmit.json();
		console.log("success: 201", result);
	} catch (error) {
		console.error("Error:", error);
	}
});