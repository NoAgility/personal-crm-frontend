import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils'; 
import ReactDOM from "react-dom";
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import Contacts from '../components/contacts/Contacts';
import AddContact from '../components/contacts/AddContact';
import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../components/login/Login';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';
import SpringBootAdapterWrapper from '../util/SpringBootAdapterWrapper';
import SpringBootAdapterETE from '../util/SpringBootAdapterETE';
import CookieManager from '../util/CookieManager';
import { useEffect } from 'react';
jest.setTimeout(20000);
jest.unmock('../components/contacts/Contacts');
beforeAll(() => { 
    LoginControllerWrapper.setController(LoginControllerETE);
    SpringBootAdapterWrapper.setAdapter(SpringBootAdapterETE);
    document.body.innerHTML = '';
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
    });

    CookieManager.eraseCookie("jwt");
});
test("ETE Test - Register -> Login -> Add Contact -> See Contact", async () => {

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
        
        const {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Contacts/></div>, {container: document.body});

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
        //Expect new contact item to be added to list
        await waitFor(() => expect(container.getElementsByClassName("contact-item").length).toBe(1));
        unmount();
    });
});

test("ETE - Register -> Login -> Add Contact -> See Contact -> Remove Contact", async () => {

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
        
        fireEvent.change(username, {target: {value: 'contacts2'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('contacts2'));
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
        
        fireEvent.change(username, {target: {value: 'target2'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('target2'));
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

        fireEvent.change(username2, {target: {value: 'contacts2'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('contacts2'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();
        
        const {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><Contacts/></div>, {container: document.body});

        const addContact = getByTestId("add-contact");
        fireEvent.click(addContact);

        const searchBar = getByPlaceholderText("Username");

        fireEvent.change(searchBar, {target: {value: "target1"}});

        await waitFor(() => expect(searchBar).toHaveValue("target1"));

        const search = await container.querySelector(".search-icon");
        fireEvent.click(search);
        await new Promise(r => setTimeout(r, 500));
        const addContactBtn = await container.querySelector(".add-contact-btn");
        await waitFor(() => expect(addContactBtn).toBeInTheDocument());
        fireEvent.click(addContactBtn);
        //Expect new contact item to be added to list
        var item = container.getElementsByClassName("contact-item");
        await waitFor(() => expect(item.length).toBe(1));

        const dropdownBtn = container.querySelector(".edit-contact-options");
        await waitFor(() => expect(dropdownBtn).toBeInTheDocument());

        fireEvent.click(dropdownBtn);
        const deleteBtn = container.querySelector(".delete-btn")
        await waitFor(() => expect(deleteBtn).toBeInTheDocument());

        fireEvent.click(deleteBtn);

        item = container.getElementsByClassName("contact-item");
        await waitFor(() => expect(item.length).toBe(0));
        unmount();
    });
});