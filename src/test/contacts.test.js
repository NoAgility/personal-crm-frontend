import {render, fireEvent, waitFor, screen, getByPlaceholderText, cleanup } from '@testing-library/react';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import Contacts from '../components/contacts/Contacts';
import AddContact from '../components/contacts/AddContact';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../components/login/Login';

test("Integration Test - Register -> Login -> Add Contact", async () => {

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
        
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: 'status=active',
        });
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
        console.log(document.cookie);
        await cleanup();
        
        render(<Contacts/>);
        const contactAddButton = screen.getByTestId("add-contact");
        fireEvent.click(contactAddButton);
        await waitFor(() => expect(screen.getByTestId("contact-search")).toBeDefined());
        fireEvent.change(input, {target: {value: 'target1'}});
        const input = screen.getByTestId("contact-search");
        fireEvent.change(input, {target: {value: 'target1'}});
        await waitFor(() => expect(input).toHaveValue('target1'));
    });
});