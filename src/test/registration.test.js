import {render, fireEvent, waitFor, screen, getByPlaceholderText} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
test("Test rendering of links", async () => {

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
        const generalError = screen.getByTestId('error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(generalError).toHaveTextContent('Loading...'));
        await waitFor(() => expect(generalError).toHaveTextContent('Done'));

        expect(testLocation.pathname).toBe('/registration_success');
    });
    
});