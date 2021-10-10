import "./SearchBar.css";
import {BiSearch} from 'react-icons/bi';
import React from 'react';


const SearchBar = ({ name, width, colorMode, onSubmit, placeholder, value, onChange }) => {
	// name: name of search query
	// width : (lg, md, sm)
	// colorMode : (light, dark)
	// onSubmit: function to be executed upon submission
	// Placeholder: Placeholder text
	// value: state to be updated
	// onChange: function to update the state

	return (
		<form onSubmit={onSubmit}>
			<div className={`search-box ${colorMode} box-${width}`}>
				<div className="search-button">
					<BiSearch className={`search-icon ${colorMode}`} size={25} onClick={onSubmit}/>
				</div>
				<input
					className={`search-input ${colorMode} search-${width}`}
					type="text"
					name={name}
					id={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
				>
				</input>

			</div>
		</form>
	)
}

export default SearchBar;