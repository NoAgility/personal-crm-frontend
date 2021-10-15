import React, { useState } from 'react';

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
    return (<label><input type="checkbox" checked={checked} onChange={toggleChecked}/>{contactItem.accountName}</label>);
}

export default ContactMenuItem;