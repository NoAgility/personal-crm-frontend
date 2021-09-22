// import { fetch, post } from "../../util/SpringBootAdapter";
import React from 'react';

const ContactController = {

	fetchContacts: async () => {
		const res = await fetch ("http://localhost:5000/contactIDs");
		return await res.json();
	},

	fetchContactData: async (user) => {
		const res = await fetch (`http://localhost:5000/contactData/${user.contactID}`);
		const data = await res.json();
		data.contactCreatedOn = user.contactCreatedOn;
		return data;
	},

	fetchUserByUsername: async (user) => {
		const res = await fetch (`http://localhost:5000/contactData/9`);
		const data = await res.json();
		return data;
	},

	deleteContact: async (user) => {
		await fetch (`http://localhost:5000/contactData/${user.contactID}`
		, {method: 'DELETE'});
		await fetch (`http://localhost:5000/contactIDs/${user.contactID}`
		, {method: 'DELETE'});
	},

	addContact: async (user) => {
		const res = await fetch (`http://localhost:5000/contactData/${user.contactID}`
		, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})

		const data= res.json()
		// return [...contacts, data]

	},


}


export default ContactController;