import { post } from '../../SpringBootAdapter'

const SettingsController = {

	deactivateAccount : async (userDetails) => {
		var flag = await post(`/account/deactivate`, {}, {
			username: userDetails.id
		}).then(response => { return true; }).catch(err => {return false;});
		if (!flag) {
			throw new Error("Failed to deactivate account.Try again later.");
		}
	}
}

export default SettingsController;