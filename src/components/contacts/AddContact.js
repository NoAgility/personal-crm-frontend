import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfilePicture from "./ProfilePic/ProfilePicture"
import SearchBar from "../searchbar/SearchBar"
import { Modal } from 'react-bootstrap';
import  './ContactDetails.css'
import  './AddContact.css'

import { useHistory } from "react-router-dom";
import ContactController from './ContactController.js'

const AddContact = ({show, onHide, onAdd}) => {
	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isAdded, setAddComplete] = useState(false);
	const [result, setResult] = useState({});

	const handleClose = (e) => {
		e.preventDefault();
		setUsernameSearch("");
		setResult({});
		setQueryFound(false);
		setAddComplete(false);
		onHide(false);
	}

	const handleAdd = (e) => {
		setAddComplete(true);
		onAdd(result);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		// search for username
		const contact = await ContactController.fetchUserByUsername(usernameSearch).then(res => {
			return res.data;});
		if (contact) {
			setQueryFound(true);
			setResult(contact);
		}
		setHasSearched(true);
	}

	const queryResult = (name, username, id) => {
			return (<div className="contact-search-result">
				<ProfilePicture
					name={name}
					id={id}
					size="md"
				/>
				<div className="column">
					<h4>{name}</h4>
					<p>@{username}</p>
				</div>

				<button
					data-testid='add'
					className={`add-contact-btn ${isAdded ? 'add-complete' : ''}`}
					onClick={handleAdd}
					disabled={isAdded}
					>{isAdded ? 'Added' : 'Add'}
				</button>
			</div>)
		}

	const noResult = () => {
		if (hasSearched) return <h4>Not found</h4>
	}

	return (
		<>
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="close-add-contact">
				<MdClose className="edit-contact-options" onClick={handleClose} size={30}/>
			</div>
			<Modal.Body className="add-contact">
				<h1>Search for a Contact</h1>

				<SearchBar
					data-testid="contact-search"
					name="username"
					colorMode="light"
					width="md"
					onSubmit={onSubmit}
					placeholder="Username"
					value={usernameSearch}
					onChange={event => {setUsernameSearch(event.target.value)}}
				/>

				{queryFound ? queryResult(result.name, result.username, result.contactID) : noResult}

			</Modal.Body>
		</Modal>
		</>
	)
}

export default AddContact;