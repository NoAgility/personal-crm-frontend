import SpringBootAdapterWrapper from "../../util/SpringBootAdapterWrapper";

const ChatController = {

	// Fetch all chats that the user is in
	fetchChats: async () => {
		try{
			const res = await SpringBootAdapterWrapper.get("/chat/getAccountChats").then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Fetch a chat by it's chatID
	fetchChatsByChatID: async (chatID) => {
		try{
			const res = await SpringBootAdapterWrapper.post(`/chat/getChatByID/${chatID}`).then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Create a chat
	createChat: async (contactIDs) => {
		try{
			const res = await SpringBootAdapterWrapper.post('/chat/createChat', '', {"accountIDs": contactIDs}).then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Delete a message
	deleteMessage: async (chatID, messageID) => {
		try{
			const res = await SpringBootAdapterWrapper.post('/chat/deleteMessage','',
					{
						"chatID": chatID,
						"messageID": messageID
					})
				.then(
					response => { return response.data; }
				);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Delete a chat
	deleteChat: async (chatID) => {
		try{
			const res = await SpringBootAdapterWrapper.post('/chat/leaveChat','',
					{
						"chatID": chatID,
					})
				.then(
					response => { return response.data; }
				);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Edit a message
	editMessage: async (chatID, messageID, newText) => {
		try{
			const res = await SpringBootAdapterWrapper.post('/chat/editMessage',
					'',
					{
						"chatID": chatID,
						"messageID": messageID,
						"newText": newText
					}).then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err);
		}
	},

	// Send a message to a chat
	sendMessage: async (chatID, messageText) => {
		try{
			const res = await SpringBootAdapterWrapper.post(
					'/chat/sendMessage',
					'',
					{
						"chatID": chatID,
						"messageText": messageText
					}
				).then(
				response => { return response.data; }
			);
			return res;
		} catch (err) {
			console.log(err);
		}
	},
}


export default ChatController;