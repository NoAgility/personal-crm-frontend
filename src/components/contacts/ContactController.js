import { fetch, post } from "../../util/SpringBootAdapter";

const ContactController = {

	// Fetch all contacts of the user
	fetchContacts: async () => {
		try{
			const res = await fetch("/contact/read").then(
				response => { return response; }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their contactID
	fetchContactData: async (contactID) => {
		try {
			const res = await fetch (`/account/get?id=${contactID}`).then(
				response => {
					return response;
				}
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their username
	fetchUserByUsername: async (user) => {
		try {
			const res = await fetch (`/account/get?username=${user}`).then(
				response => { return response; }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	// Delete a contact using their contactID
	deleteContact: async (user) => {
		try {
			const res = await post ("/contact/create", "", {"contact": user});
			return res;
		} catch (err) {
			console.log(err)
		}
	},

	addContact: async (user) => {
		try {
			const res = await post ("/contact/create", "", {"contact": user});
			return res;
		} catch (err) {
			console.log(err)
		}
	},


}


export default ContactController;