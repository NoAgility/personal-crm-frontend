import "./Settings.css";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SettingsController from "./SettingsController.js"
import AuthService from './AuthService.js'
import { Redirect } from "react-router-dom";

const Settings = (props) => {
    const [generalError, setGeneralError] = useState("");

	const onClick = async (e) => {

        let userDetails = AuthService.getUserId();

        try {
            SettingsController.deactivateAccount(userDetails);
        } catch (err) {
            setGeneralError(err)
            return;
        }

		const state = { redirect: "/login" };
		return <Redirect to={state.redirect} />
    }

	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					<h2>Account</h2>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body classname="settings-content">
				<div classname="settings-item">
					<h3>Email</h3>
						<Button href="/account/email" variant="outline-light" size="sm" disabled>
							Change email
						</Button>
				</div>
				<div classname="settings-item">
					<h3>Password</h3>
					<Button href="/account/password" variant="outline-light" size="sm" disabled>
						Change password
					</Button>
				</div>
				<div classname="settings-item">
					<h3>Permanently delete account</h3>
					<p>This will immediately delete all of your data including tasks,
						contacts, meetings and more. This can’t be undone.</p>
						<Button onClick={onClick} variant="outline-danger"size="sm">
							Delete
						</Button>
					<div data-testid='general-error' className='error'>{generalError}</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default Settings;
