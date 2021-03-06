import "./ProfilePic.css"
import { GrGroup } from 'react-icons/gr';
import React from 'react';


// extracts the initials from an accountName
const getInitials = (name) => {
    if (!name) {return null;}
    let initials;
    const nameSplit = name.toString().split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
}

// sets the background color pseudo randomly based on accountID number
const getColor = (id) => {
    if (id % 6 === 0) {
        return "#70d4cc";
    }
    if (id % 5 === 0) {
        return "#d4a46c";
    }
    if (id % 4 === 0) {
        return "#be8bfc";
    }
    if (id % 3 === 0) {
        return "#5dbc94";
    }
    if (id % 2 === 0) {
        return "#54a3fb";
    }
    else {
        return "#fb5454";
    }
}

ProfilePic.defaultProps = {
    name: "",
    id: 2,
    size: "sm",
    isGroupChat: false
}

function ProfilePic( { name, id, size, isGroupChat } ) {
    // size : lg, md, sm, xs
	return (
		<>
		<div className={`profile-pic profile-pic-${size}`} style={{backgroundColor: getColor(id)}}>
			<h1 className={`pp-${size}`}>
				{isGroupChat ? <GrGroup /> : getInitials(name)}
			</h1>
		</div>
		</>
	);
}

export default ProfilePic;