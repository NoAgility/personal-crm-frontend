import SpringBootAdapterWrapper from "../../util/SpringBootAdapterWrapper";

const ContactController = {

	// Fetch all contacts of the contact
	fetchContacts: async () => {
		try{
			const res = await SpringBootAdapterWrapper.get("/contact/read").then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their contactID
	fetchContactData: async (contact) => {
		try {
			const res = await SpringBootAdapterWrapper.get(`/account/get?id=${contact.contactID}`).then(
				response => {
					return response.data;
				}
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a user by their accountID
	fetchUserByID: async (accountID) => {
		try {
			const res = await SpringBootAdapterWrapper.get(`/account/get?id=${accountID}`).then(
				response => {
					const data = response.data;
					return data;
				}
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their username
	fetchUserByUsername: async (contact) => {
		try {
			const res = await SpringBootAdapterWrapper.get(`/account/get?username=${contact}`).then(
				response => { return response; }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Delete a contact using their contactID
	deleteContact: async (contact) => {
		try {
			const res = await SpringBootAdapterWrapper.post("/contact/delete", "", {"contact": contact.accountUsername});
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Add a contact
	addContact: async (contact) => {
		try {
			const res = await SpringBootAdapterWrapper.post("/contact/create", "", {"contact": contact.accountUsername});
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Update a contact
	updateContact: async (contact) => {
		try {
			const res = await SpringBootAdapterWrapper.post("/contact/update", "", contact);
			return res;
		} catch (err) {
			console.log(err)
		}
	}

}


export default ContactController;