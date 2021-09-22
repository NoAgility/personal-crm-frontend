import { fetch, post } from "../../util/SpringBootAdapter";

const ContactController = {

	// Fetch all contacts of the user
	fetchContacts: async () => {
		try{
			await fetch("/contact/read").then(
				response => { return response; }
			);
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their contactID
	fetchContactData: async (user) => {
		try {
			await fetch (`/account/get?id=${user.contactID}`).then(
				response => {
					const data = response;
					data.contactCreatedOn = user.contactCreatedOn;
					return response;
				}
			);
		} catch (err) {
			console.log(err)
		}
	},

	// Fetch a contact's data by their username
	fetchUserByUsername: async (user) => {
		try {
			await fetch (`/account/get?username=${user.username}`).then(
				response => { return response; }
			);
		} catch (err) {
			console.log(err)
		}
	},

	// Delete a contact using their contactID
	deleteContact: async (user) => {
		try {
			await post ("/contact/create", "", {"contact": user.username})
		} catch (err) {
			console.log(err)
		}
	},

	addContact: async (user) => {
		try {
			await post ("/contact/create", "", {"contact": user.username})
		} catch (err) {
			console.log(err)
		}
	},


}


export default ContactController;