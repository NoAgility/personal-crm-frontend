import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfilePicture from "./ProfilePic/ProfilePicture"
import SearchBar from "../searchbar/SearchBar"
import { Modal } from 'react-bootstrap';
import  './ContactDetails.css'
import  './AddContact.css'
import '../form.css';
import { useHistory } from "react-router-dom";
import ContactController from './ContactController.js'

const AddContact = ({show, onHide, onAdd, contactIDs}) => {
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
		setHasSearched(false);
	}

	const handleAdd = (e) => {
		setAddComplete(true);
		onAdd(result);
		contactIDs.push(result.accountID);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		// reset search results
		setQueryFound(false);
		setResult({});

		// search for username
		const contact = await ContactController.fetchUserByUsername(usernameSearch).then(res => {
			return res.data;});
		if (contact) {
			setQueryFound(true);
			setResult(contact);
			if (contactIDs.includes(contact.accountID)) {
				setAddComplete(true);
			}
		} else {
			setHasSearched(true);
		}
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
					<h6>@{username}</h6>
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
		if (hasSearched) return <h5>Not found</h5>
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="close-add-form">
				<MdClose className="close-button" onClick={handleClose} size={30}/>
			</div>
			<Modal.Body className="add-form">
				<h1>Search for a Contact</h1>

				<SearchBar
					className="search-bar"
					data-testid="contact-search"
					name="username"
					colorMode="light"
					width="md"
					onSubmit={onSubmit}
					placeholder="Username"
					value={usernameSearch}
					onChange={event => {setUsernameSearch(event.target.value)}}
				/>

				{queryFound ? queryResult(result.accountName, result.accountUsername, result.accountID) : noResult()}

			</Modal.Body>
		</Modal>
	)
}

export default AddContact;