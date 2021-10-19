import React, { useState } from 'react';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';

const ContactMenuItem = ({active, contactItem, add, remove}) => {

    const [checked, setChecked] = useState(active || false);
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
			<input className="task-contact-checkbox" type="checkbox"  checked={checked} onChange={toggleChecked}/>
			<ProfilePic
				key={contactItem.accountID}
				name={contactItem.accountName}
				size={"xs"}
				id={contactItem.accountID}
			/>
			<h6>{contactItem.accountName}</h6>
		</div>
    );

}

export default ContactMenuItem;