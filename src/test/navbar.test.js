import {render, fireEvent, waitFor, screen, getByText} from '@testing-library/react';
import Navbar from './../components/navbar/Navbar';

test("Test rendering of links", async () => {
    render(<Navbar/>);

    screen.getByText("Tasks");
    screen.getByText("Meetings");
    screen.getByText("Calendar");
    screen.getByText("Inbox");
    screen.getByText("Contacts");
});