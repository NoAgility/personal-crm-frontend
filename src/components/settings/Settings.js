import "./Settings.css";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Settings = (props) => {

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

				<Button variant="outline-danger"size="sm">
					Delete
				</Button>
			</div>
			</Modal.Body>
		</Modal>
	)
}

export default Settings;