import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Meetings from '../components/meetings/Meetings.js';
import MeetingList from '../components/meetings/MeetingList.js';
import MeetingDetails from '../components/meetings/MeetingDetails.js';

import Login from '../components/login/Login';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';
import SpringBootAdapterWrapper from '../util/SpringBootAdapterWrapper';
import SpringBootAdapterETE from '../util/SpringBootAdapterETE';
import CookieManager from '../util/CookieManager';
jest.setTimeout(20000);
jest.unmock('../components/contacts/Contacts');
beforeAll(() => {

    axios.defaults.adapter = require('axios/lib/adapters/http');

    LoginControllerWrapper.setController(LoginControllerETE);
    SpringBootAdapterWrapper.setAdapter(SpringBootAdapterETE);
    document.body.innerHTML = '';
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
    });

    CookieManager.eraseCookies();

});


test("Unit Test - Meetings Page Component renders", async () => {
    const { container } = render(<Meetings/>);

    const createTaskButton = container.querySelector(".add-btn");
    await waitFor(() => expect(createTaskButton).not.toBeNull());
});

test("Unit Test - MeetingList, MeetingItem Component renders", async () => {
    const { container } = render(<MeetingList
		meetings={[{ meetingID: "1",
			meetingName: "Test Meeting 1",
		 	meetingDescription: "Test Description 1",
			meetingCreatorID: "1",
		  	meetingStart: "2099-10-26 13:30",
		  	meetingEnd: "2099-10-26 14:30",
		  	meetingParticipants: [{accepted : "true",
				data : { accountActive: "true",
					accountCreation: "2021-10-15",
					accountDOB: "2021-10-04",
					accountID: "1",
					accountName: "TestUser1",
					accountUsername: "TestUserName 1"}
				}]}]}
		label={"date"}
		meetingOptions={{onEdit: jest.fn(), onDelete: jest.fn()}}
		minuteOptions={{onEdit: jest.fn(), onDelete: jest.fn(), onAdd: jest.fn()}}
		/>);

    await waitFor(() => expect(container).toHaveTextContent("Test Meeting 1"));
    await waitFor(() => expect(container).toHaveTextContent("1:30 PM - 2:30 PM"));
    await waitFor(() => expect(container).toHaveTextContent("Monday, October 26, 2099"));
	const profilePic1 = container.querySelector(".profile-pic");
	await waitFor(() => expect(profilePic1).not.toBeNull());
    await waitFor(() => expect(profilePic1).toHaveTextContent("T"));
});

test("Unit Test - MeetingDetails Component renders", async () => {
	const {container, unmount} = render(<div><MeetingDetails
		meeting={{ meetingID: "2",
			meetingName: "Test Meeting 2",
			meetingDescription: "Test Description 2",
			meetingCreatorID: "2",
			meetingStart: "2099-10-26 13:30",
			meetingEnd: "2099-10-26 14:30",
			meetingMinutes: [{
				meetingID: "2",
				accountID: "2",
				minuteID: "1",
				minuteTime: "2099-11-10 04:00:00",
				minuteText: "Example minute"
			}],
			meetingParticipants: [{
				accepted : "true",
				data : {
					accountActive: "true",
					accountCreation: "2099-10-15",
					accountDOB: "2021-10-04",
					accountID: "2",
					accountName: "TestUser2",
					accountUsername: "TestUserName2"
				}
				}]}}
		show={jest.fn()}
		onHide={jest.fn()}
		meetingOptions={{onEdit: jest.fn(), onDelete: jest.fn()}}
		minuteOptions={{onEdit: jest.fn(), onDelete: jest.fn(), onAdd: jest.fn()}}
		/></div>, {container: document.body});

	const meetingDetails = container.querySelector(".meeting-details");
	await waitFor(() => expect(meetingDetails.textContent).not.toBeNull());
	await waitFor(() => expect(meetingDetails.textContent).toContain("Test Meeting 2"));
	await waitFor(() => expect(meetingDetails.textContent).toContain("Test Description 2"));
	await waitFor(() => expect(meetingDetails.textContent).toContain("Monday, October 26, 2099  :  1:30 PM - 2:30 PM"));
	const profilePic1 = meetingDetails.querySelector(".profile-pic");
	await waitFor(() => expect(profilePic1).not.toBeNull());
	await waitFor(() => expect(profilePic1.textContent).toContain("T"));
	await waitFor(() => expect(meetingDetails.textContent).toContain("Add minutes"));

	unmount();
});