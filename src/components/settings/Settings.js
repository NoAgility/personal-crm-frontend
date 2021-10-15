import "./Settings.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SettingsController from "./SettingsController.js";
import CookieManager from "../../util/CookieManager";
import Confirmation from "../UIComponents/confirm/Confirmation";
import AuthService from "../../util/AuthService";

const Settings = (props) => {
    const [generalError, setGeneralError] = useState("");
	const [showConfirm, setShowConfirm] = useState(false);
	const [userDetails, setUserDetails] = useState({});
	const onDeactivate = async (e) => {

        let userDetails = {id: parseInt(CookieManager.getCookie("accountID"))};

        try {
            SettingsController.deactivateAccount(userDetails).then(() => AuthService.logOut());
        } catch (err) {
            setGeneralError(err)
            return;
        }
    }
	useEffect(() => {
		SettingsController.getAccountDetails(CookieManager.getCookie("accountID")).then(res => setUserDetails(res));
	}, []);

	return (
		<React.Fragment>
			<Confirmation
				show={showConfirm}
				onHide={() => setShowConfirm(false)}
				msg="Confirm Deactivation?"
				accept={onDeactivate}
				cancel={() => setShowConfirm(false)}
			/>
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					<h2>Account Settings</h2>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body classname="settings-content">
				
				<div classname="settings-item">
					<h3>Account Username</h3>
					<div>{userDetails.accountUsername}</div>
				</div>
				<div classname="settings-item">
					<h3>Account Name</h3>
					<div>{userDetails.accountName}</div>
				</div>
				<div classname="settings-item">
					<h3>Permanently deactivate account</h3>
					<p>This will immediately disable your account and prevent access to all of your data including tasks,
						contacts, meetings and more. This can’t be undone.</p>
						<Button onClick={() => {setShowConfirm(true)} } variant="outline-danger"size="sm">
							Deactivate
						</Button>
					<div data-testid='general-error' className='error'>{generalError}</div>
				</div>
			</Modal.Body>
		</Modal>
		</React.Fragment>
	)
}

export default Settings;
