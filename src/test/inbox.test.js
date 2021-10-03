import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from "react-dom";
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import Contacts from '../components/contacts/Contacts';
import Inbox from '../components/inbox/Inbox';
import ChatController from '../components/inbox/ChatController';
import AddContact from '../components/contacts/AddContact';
import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../components/login/Login';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import SpringBootAdapterWrapper from '../util/SpringBootAdapterWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';
import SpringBootAdapterETE from '../util/SpringBootAdapterETE';
import CookieManager from '../util/CookieManager';
import { useEffect } from 'react';
jest.setTimeout(3000000);
jest.unmock('../components/contacts/Contacts');
jest.unmock('../components/inbox/Inbox');

beforeAll(() => {
    LoginControllerWrapper.setController(LoginControllerETE);
    SpringBootAdapterWrapper.setAdapter(SpringBootAdapterETE);
    document.body.innerHTML = '';
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
    });

    CookieManager.eraseCookies();

});
test("ETE Test - Register -> Login -> create chat", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');

    await act( async () => {
        let testHistory, testLocation;

        /**
         * Register Sender account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>
        );
        var username = screen.getByPlaceholderText('Username');
        var password = screen.getByPlaceholderText('Password');
        var name = screen.getByPlaceholderText('Name');
        var dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_sender_1'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_sender_1'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        /**
         * Register Receiver account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>);
        username = screen.getByPlaceholderText('Username');
        password = screen.getByPlaceholderText('Password');
        name = screen.getByPlaceholderText('Name');
        dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_receiver_1'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_receiver_1'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        render(<MemoryRouter intialEntries={"/login"}>
            <Login/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
            }}/>
        </MemoryRouter>);

        /**
         * Login
         */
        const username2 = screen.getByPlaceholderText('Username');
        const password2 = screen.getByPlaceholderText('Password');

        fireEvent.change(username2, {target: {value: 'inbox_test_sender_1'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('inbox_test_sender_1'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();

        var {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Contacts/></div>, {container: document.body});

        const createContact = container.getElementsByClassName("create-contact-btn")[0];
        fireEvent.click(createContact);

        var searchBar = container.querySelector(".search-input")
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_1"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_1"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 500));
        var addContactBtn = await container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());
        fireEvent.click(addContactBtn);

        cleanup();
        //Expect new chat to be added to list
        var inbox_container = render(<div><Inbox/></div>, {container: document.body}).container;


        /**
         * Search for contact in chat page
         */
        var searchBar = inbox_container.querySelector(".chat-body").querySelector(".search-input");
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_1"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_1"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 1000));
        //Click the add contact button in Chat page
        addContactBtn = await inbox_container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());

        fireEvent.click(addContactBtn);

        await waitFor(() => expect(inbox_container.getElementsByClassName("inbox-contact-item").length).toBe(1));

    });
});
test("ETE Test - Register -> Login -> create chat -> send message", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');

    await act( async () => {
        let testHistory, testLocation;

        /**
         * Register Sender account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>
        );
        var username = screen.getByPlaceholderText('Username');
        var password = screen.getByPlaceholderText('Password');
        var name = screen.getByPlaceholderText('Name');
        var dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_sender_2'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_sender_2'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        /**
         * Register Receiver account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>);
        username = screen.getByPlaceholderText('Username');
        password = screen.getByPlaceholderText('Password');
        name = screen.getByPlaceholderText('Name');
        dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_receiver_2'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_receiver_2'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        render(<MemoryRouter intialEntries={"/login"}>
            <Login/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
            }}/>
        </MemoryRouter>);

        /**
         * Login
         */
        const username2 = screen.getByPlaceholderText('Username');
        const password2 = screen.getByPlaceholderText('Password');

        fireEvent.change(username2, {target: {value: 'inbox_test_sender_2'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('inbox_test_sender_2'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();

        var {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Contacts/></div>, {container: document.body});

        const createContact = container.getElementsByClassName("create-contact-btn")[0];
        fireEvent.click(createContact);

        var searchBar = container.querySelector(".search-input")
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_2"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_2"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 500));
        var addContactBtn = await container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());
        fireEvent.click(addContactBtn);

        cleanup();

        var inbox_container = render(<div><Inbox/></div>, {container: document.body}).container;

        /**
         * Search for contact in chat page
         */
        var searchBar = inbox_container.querySelector(".chat-body").querySelector(".search-input");
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_2"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_2"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 1000));
        //Click the add contact button in Chat page
        addContactBtn = await inbox_container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());

        fireEvent.click(addContactBtn);

        //Expect new chat to be added to list
        await waitFor(() => expect(inbox_container.getElementsByClassName("inbox-contact-item").length).toBe(1));

		// Click on chat
		const chat = await inbox_container.getElementsByClassName("inbox-contact-item-info")[0];
		await waitFor(() => expect(chat).not.toBeNull());
        fireEvent.click(chat);

		// send hello
        const message = inbox_container.querySelector(".message-input");

		fireEvent.change(message, {target: {value: 'hello'}});
		await waitFor(() => expect(message).toHaveValue('hello'));

        const send = inbox_container.querySelector(".send-btn");

        fireEvent.click(send);

        await waitFor(() => expect(inbox_container.querySelector(".message-text")).not.toBeNull());
		// expect a 'message-container'
		const sentMessage = await inbox_container.getElementsByClassName("message-container-user")[0];
		await waitFor(() => expect(sentMessage).not.toBeNull());

        unmount();
    });
});

test("ETE Test - Register -> Login -> create chat -> send message -> read message -> delete message", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');

    await act( async () => {
        let testHistory, testLocation;

        /**
         * Register Sender account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>
        );
        var username = screen.getByPlaceholderText('Username');
        var password = screen.getByPlaceholderText('Password');
        var name = screen.getByPlaceholderText('Name');
        var dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_sender_3'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_sender_3'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        /**
         * Register Receiver account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>);
        username = screen.getByPlaceholderText('Username');
        password = screen.getByPlaceholderText('Password');
        name = screen.getByPlaceholderText('Name');
        dob = screen.getByTestId('DOB');

        fireEvent.change(username, {target: {value: 'inbox_test_receiver_3'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('inbox_test_receiver_3'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();

        render(<MemoryRouter intialEntries={"/login"}>
            <Login/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
            }}/>
        </MemoryRouter>);

        /**
         * Login
         */
        const username2 = screen.getByPlaceholderText('Username');
        const password2 = screen.getByPlaceholderText('Password');

        fireEvent.change(username2, {target: {value: 'inbox_test_sender_3'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('inbox_test_sender_3'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();

        var {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Contacts/></div>, {container: document.body});

        const createContact = container.getElementsByClassName("create-contact-btn")[0];
        fireEvent.click(createContact);

        var searchBar = container.querySelector(".search-input")
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_3"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_3"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 500));
        var addContactBtn = await container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());
        fireEvent.click(addContactBtn);

        cleanup();

        var inbox_container = render(<div><Inbox/></div>, {container: document.body}).container;

        /**
         * Search for contact in chat page
         */
        var searchBar = inbox_container.querySelector(".chat-body").querySelector(".search-input");
        fireEvent.change(searchBar, {target: {value: "inbox_test_receiver_3"}});
        await waitFor(() => expect(searchBar).toHaveValue("inbox_test_receiver_3"));
        fireEvent.submit(searchBar);

        await new Promise(r => setTimeout(r, 1000));
        //Click the add contact button in Chat page
        addContactBtn = await inbox_container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).not.toBeNull());

        fireEvent.click(addContactBtn);

        //Expect new chat to be added to list
        await waitFor(() => expect(inbox_container.getElementsByClassName("inbox-contact-item").length).toBe(1));

		// Click on chat
		const chat = await inbox_container.getElementsByClassName("inbox-contact-item-info")[0];
		await waitFor(() => expect(chat).not.toBeNull());
        fireEvent.click(chat);

		// send hello
        const message = inbox_container.querySelector(".message-input");

		fireEvent.change(message, {target: {value: 'hello'}});
		await waitFor(() => expect(message).toHaveValue('hello'));

        const send = inbox_container.querySelector(".send-btn");

        fireEvent.click(send);

        console.debug(document.cookie);

        await waitFor(() => expect(inbox_container.querySelector(".message-text")).not.toBeNull());
		// expect a 'message-container'
		const sentMessage = await inbox_container.getElementsByClassName("message-container-user")[0];
		await waitFor(() => expect(sentMessage).not.toBeNull());


        const containerMessage = await inbox_container.querySelector(".message-options");
		await waitFor(() => expect(containerMessage).not.toBeNull());

        fireEvent.mouseEnter(containerMessage);
        await waitFor(() => expect(inbox_container.getElementsByClassName("message-container")).not.toBeNull());
        const optionsMessage = await inbox_container.querySelector(".message-options");
		await waitFor(() => expect(optionsMessage).not.toBeNull());

        const optionsBtnMessage = await inbox_container.querySelector(".message-options");
		await waitFor(() => expect(optionsBtnMessage).not.toBeNull());

        fireEvent.focus(optionsBtnMessage);

        const deleteMessage = await inbox_container.getElementsByClassName("message-options-btn")[1];

        console.debug(inbox_container.innerHTML);
		await waitFor(() => expect(deleteMessage).not.toBeNull());

        fireEvent.click(deleteMessage);

        await waitFor(() => expect(inbox_container.querySelector(".message-text")).toBeNull());
        unmount();
    });
});
