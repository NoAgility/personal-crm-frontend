import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from "react-dom";
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import Contacts from '../components/contacts/Contacts';

import Inbox from '../components/inbox/Inbox';
import AddContact from '../components/contacts/AddContact';
import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../components/login/Login';
import LoginController from '../components/login/LoginController';
import SpringBootAdapter from '../util/SpringBootAdapter';
import CookieManager from '../util/CookieManager';
import { useEffect } from 'react';
jest.setTimeout(20000);
jest.unmock('../components/contacts/Contacts');
jest.unmock('../components/inbox/Inbox');

beforeAll(() => {
    LoginController.setController(LoginController);
    SpringBootAdapter.setAdapter(SpringBootAdapter);
    document.body.innerHTML = '';
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
    });

    CookieManager.eraseCookies();

});
test("Test - Register -> Login -> create chat -> send message", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');

    await act( async () => {
        let testHistory, testLocation;
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

        fireEvent.change(username, {target: {value: 'contacts1'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('contacts1'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));

        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await new Promise(r => setTimeout(r, 2000));
        await cleanup();
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

        fireEvent.change(username, {target: {value: 'target1'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('target1'));
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
        const username2 = screen.getByPlaceholderText('Username');
        const password2 = screen.getByPlaceholderText('Password');

        fireEvent.change(username2, {target: {value: 'contacts1'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('contacts1'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();

        const {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Inbox/></div>, {container: document.body});

        const addContact = getByTestId("add-contact");
        fireEvent.click(addContact);

        const searchBar = getByPlaceholderText("Username");

        fireEvent.change(searchBar, {target: {value: "target1"}});

        await waitFor(() => expect(searchBar).toHaveValue("target1"));

        const search = await container.querySelector(".search-icon");
        fireEvent.click(search);
        await new Promise(r => setTimeout(r, 500));
        const addContactBtn = await container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).toBeDefined());
        fireEvent.click(addContactBtn);
        //Expect new chat to be added to list
        await waitFor(() => expect(container.getElementsByClassName("inbox-contact-item").length).toBe(1));

		// Click on chat
		const chat = await container.getElementsByClassName("inbox-contact-item");
		await waitFor(() => expect(chat).toBeDefined());
        fireEvent.click(chat);

		// Go to the send message container
		const chatInput = await container.getElementsByClassName("chat-input-container");
		await waitFor(() => expect(chatInput).toBeDefined());
        fireEvent.click(chatInput);

		// send hello
        const message = screen.getByPlaceholderText('');
		fireEvent.change(message, {target: {value: 'hello'}});
		await waitFor(() => expect(message).toHaveValue('hello'));

		// expect a 'message-container'
		const sentMessage = await container.getElementsByClassName("message-container-user");
		await waitFor(() => expect(sentMessage).toBeDefined());

        unmount();
    });
});
