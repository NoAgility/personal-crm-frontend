import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';
import  './Sort.css'

const Sort = ({ sortTypes }) => {
	// sortTypes : an array of a sortTypes objects consisting of a label and sort function

	return (
		<Dropdown >
			<Dropdown.Toggle
				id="button-dropdown-body"
				className="dropdown-button"
				align="end"
			>
				<BiFilter className="menu-icon" size={40}/>
			</Dropdown.Toggle>

			<Dropdown.Menu variant="dark">
				{sortTypes
					.map((type) => (
					<Dropdown.Item onClick={type.sortFunction}>
						{type.label}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default Sort;
