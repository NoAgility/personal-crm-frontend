import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper'
const SettingsController = {

	deactivateAccount : async (userDetails) => {
		var flag = await SpringBootAdapterWrapper.post(`/account/deactivate`, {}, 
			userDetails
		).then(response => { return true; }).catch(err => {return false;});
		if (!flag) {
			throw new Error("Failed to deactivate account.Try again later.");
		}
	},
	getAccountDetails : async (id) => {
		var res = await SpringBootAdapterWrapper.get(`/account/get?id=${id}`, {})
		.then(response => { return response.data })
		.catch(err => {alert("Failed to fetch account details. Try again later.")});

		if (res !== undefined) {
			return res;
		}
	}
}

export default SettingsController;