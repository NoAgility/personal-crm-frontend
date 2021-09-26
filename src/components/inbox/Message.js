import React, { useState, useEffect } from 'react';

import  './Message.css'

const Message = ({content, sender}) => {
	// content - A string with the contents of the message
	// sender - [contact, user] - whether the message is sent by the user or received from a contact

	return (
		<div className={`message message-${sender}`}>
			<h6>{content}</h6>
		</div>
	)
}

export default Message;