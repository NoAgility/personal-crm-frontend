import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ProfilePicture from "../UIComponents/profilePic/ProfilePic"
import SearchBar from "../UIComponents/searchbar/SearchBar"
import { Modal } from 'react-bootstrap';
import ContactController from './ContactController.js'
import  './ContactDetails.css'
import  './AddContact.css'
import '../form.css';

const AddContact = ({show, onHide, onAdd, contactIDs}) => {
	// show : open/closed state for the add contact modal
	// onHide : function to close the add contact modal
	// onAdd : function to add contact
	// contactIDs : list of all contactIDs

	const [usernameSearch, setUsernameSearch] = useState("");
    const [queryFound, setQueryFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isAdded, setAddComplete] = useState(false);
	const [result, setResult] = useState({});

	// Closes the add contact modal and resets the states
	const handleClose = () => {
		setUsernameSearch("");
		setResult({});
		setQueryFound(false);
		setAddComplete(false);
		onHide(false);
		setHasSearched(false);
	}
	const changeInput = (e) => {
		setUsernameSearch(e.target.value);
	}
	// Adds a contact
	const handleAdd = () => {
		setAddComplete(true);
		onAdd(result);
		contactIDs.push(result.accountID);
	}

	// Searchs for the input username
	const onSubmit = async (e) => {
		e.preventDefault();
		isAdded && setAddComplete(false);
		// reset search results
		setQueryFound(false);
		setResult({});

		// search for username
		try {
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
		} catch (err) {
			//Failed to fetch account
			setQueryFound(false);
			setHasSearched(true);
		}
		
	}

	// A component to display a contact search result
	const queryResult = (name, username, id) => {
		return (<div className="contact-search-result">
			<ProfilePicture
				name={name}
				id={id}
				size="md"
			/>
			<div className="column contact-search-name">
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
	};

	// A component to display when no contact search results are found
	const noResult = () => {
		if (hasSearched) return <h5>Not found</h5>
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
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
					width="lg"
					onSubmit={onSubmit}
					placeholder="Username"
					value={usernameSearch}
					onChange={event => {changeInput(event)}}
				/>
				<div className="row-spacer"/>
				<div>{queryFound ? queryResult(result.accountName, result.accountUsername, result.accountID) : noResult()}</div>

			</Modal.Body>
		</Modal>
	)
}

export default AddContact;