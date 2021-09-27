import { fetch, post } from "../../util/SpringBootAdapter";

const ContactController = {

	// Fetch all contacts of the contact
	fetchContacts: async () => {
		try{
			const res = await fetch("/contact/read").then(
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
			const res = await fetch (`/account/get?id=${contact.contactID}`).then(
				response => {
					const data = response.data;
					data.contactCreatedOn = contact.contactCreatedOn;
					return data;
				}
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their contactname
	fetchUserByUsername: async (contact) => {
		try {
			const res = await fetch (`/account/get?username=${contact}`).then(
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
			const res = await post ("/contact/delete", "", {"contact": contact.accountUsername});
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	addContact: async (contact) => {
		try {
			const res = await post ("/contact/create", "", {"contact": contact.accountUsername});
			return res;
		} catch (err) {
			console.log(err)
		}
	},

}


export default ContactController;