import {render, fireEvent, waitFor, screen, getByPlaceholderText, cleanup } from '@testing-library/react';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../components/login/Login';
test("Integration Test - Successful Login", async () => {

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
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        
        fireEvent.change(username, {target: {value: 'notthisagain'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('notthisagain'));
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

        fireEvent.change(username2, {target: {value: 'notthisagain'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('notthisagain'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);

        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
    });
});

test("Integration Test - Unsuccessful Login", async () => {

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
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        
        fireEvent.change(username, {target: {value: 'notthisagain2'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('notthisagain2'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));

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
        username = screen.getByPlaceholderText('Username');
        password = screen.getByPlaceholderText('Password');

        fireEvent.change(username, {target: {value: 'thisagain'}});
        fireEvent.change(password, {target: {value: 'password'}});
        await waitFor(() => expect(username).toHaveValue('thisagain'));
        await waitFor(() => expect(password).toHaveValue('password'));

        submit = screen.getByTestId("submit");

        fireEvent.click(submit);

        await waitFor(() => expect(screen.getByTestId("container")).toHaveTextContent("Incorrect username and or password"));
    });
});