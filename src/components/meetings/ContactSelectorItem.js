import React, { useState } from 'react';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';

const ContactSelectorItem = ({ active, contactItem, add, remove, isChecked }) => {

    const [checked, setChecked] = useState(active);

	const toggleChecked = () => {
        if (!checked) {
            add(contactItem);
        } else {
            remove(contactItem);
        }
        setChecked(!checked);
    };

    return (
		<div className='contact-checkbox-container'>
			<input className="contact-checkbox" type="checkbox"  checked={isChecked } onChange={toggleChecked}/>
			<ProfilePic
				key={contactItem.accountID}
				name={contactItem.accountName}
				size={"xs"}
				id={contactItem.accountID}
			/>
			<h6>{contactItem.accountName}</h6>
		</div>);
}

export default ContactSelectorItem;