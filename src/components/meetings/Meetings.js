
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddMeetingForm from './AddMeetingForm';
import MeetingController from './MeetingController';
import ContactController from '../contacts/ContactController.js'
import MeetingList from './MeetingList';
import MeetingInvites from './MeetingInvites';
import Cookies from 'js-cookie';
import "./Meetings.css";
import Sort from '../UIComponents/sort/Sort.js';

const Meetings = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};
    const [meetings, setMeetings] = useState([]);
    const [meetingInvites, setMeetingInvites] = useState([]);
    const [meetingsByGroup, setMeetingsByGroup] = useState([]);
    const [activeSort, setActiveSort] = useState("date");

    const setSortByDate = () => {
        setActiveSort("date");
        dateGroupSort();
    };
    const setSortByAlpha = () => {
        setActiveSort("alpha");
        alphaGroupSort();
    };
    /**
     * Function for wrapping an edit meeting call to the backend
     * @param {*} meeting The new meeting details
     */
    const editMeeting = async (meeting) => {
        await MeetingController.editMeeting(meeting);
        getMeetings();
    }

    /**
     * Function to call to the backend to delete meeting for user
     * @param {*} meeting Meeting to be deleted
     */
    const deleteMeeting = async (meeting) => {
        await MeetingController.deleteMeeting(meeting);
        getMeetings();
    }

    /**
     * Call to backend to add meeting for user
     * @param {*} meeting Meeting to be added
     */
    const addMeeting = async (meeting) => {
        await MeetingController.addMeeting(meeting);
        getMeetings();
    };

     /**
     * Call to backend to accept a meeting
     * @param {*} meeting Meeting to be accepted
     */
      const acceptMeeting = async (meeting) => {
        await MeetingController.acceptMeetingInvite(meeting);
        getMeetings();
    };

     /**
     * Call to backend to accept a meeting
     * @param {*} meeting Meeting to be declined
     */
      const declineMeeting = async (meeting) => {
        await MeetingController.declineMeetingInvite(meeting);
        getMeetings();
    };

     /**
     * Call to backend to accept a meeting
     * @param {*} meeting Meeting to be declined
     */
      const addMinute = async (meeting, minute) => {
        await MeetingController.addMinute(meeting, minute);
        getMeetings();
    };

     /**
     * Call to backend to accept a meeting
     * @param {*} meeting Meeting to be declined
     */
      const deleteMinute = async (meeting, minute) => {
        await MeetingController.deleteMinute(meeting, minute);
        getMeetings();
    };

      /**
     * Call to backend to accept a meeting
     * @param {*} meeting Meeting to be declined
     */
       const editMinute = async (meeting, minute) => {
        await MeetingController.editMinute(meeting, minute);
        getMeetings();
    };

    /**
    * Groups meetings by dates
    * @param {*} ms Meetings to be grouped
    * @returns Array of groups of meetings by date
    */
    const groupByDate = (ms) => {
        const reduced = {};
        ms.forEach((meeting) => {(
            reduced[meeting.meetingStart.substring(0,10)] = reduced[meeting.meetingStart.substring(0,10)] || [] ).push(meeting);
        })
        return reduced;
    };

    // /**
    //  * Custom sorter for meetings, sorts by dates closest to Today
    //  * null Dates or 1970 January 1 will always be last
    //  * @param {*} meetings Meetings to be sorted
    //  */
    const sortByDate = (ms) => {
        ms.sort((a, b) => {
            var dateA = new Date(a.meetingStart.substring(0,10));
            var dateB = new Date(b.meetingStart.substring(0,10));
            if (dateA.toLocaleDateString() === new Date(0).toLocaleDateString()) return 1;
            if (dateB.toLocaleDateString() === new Date(0).toLocaleDateString()) return -1;
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        }
    )};
    const sortByAlpha = (ms) => {
        ms.sort((a, b) => {
            if (a.meetingAlpha > b.meetingAlpha) return -1;
            if (a.meetingAlpha < b.meetingAlpha) return 1;
            return 0;
        }
    )};
    const groupByAlpha = (ms) => {
        const reduced = {};
        ms.forEach((meeting) => {(
            reduced[meeting.meetingAlpha] = reduced[meeting.meetingAlpha] || [] ).push(meeting);
        })
        return reduced;
    };
    const dateGroupSort = (data) => {
        let toSort = data !== undefined ? data : meetings !== null ? meetings : [];
        setActiveSort("date");
        sortByDate(toSort);
        setMeetingsByGroup(groupByDate(toSort));
    }
    const alphaGroupSort = (data) => {
        let toSort = data !== undefined ? data : meetings !== null ? meetings : [];
        setActiveSort("alpha");
        sortByAlpha(toSort);
        setMeetingsByGroup(groupByAlpha(toSort));

    }
    const sortTypes = [
        {
            label:"Sort by date",
            sortFunction: setSortByDate
        },
        {
            label:"Sort alphabetically",
            sortFunction: setSortByAlpha
        }
    ]

    // Gets all the meetings from the backend
	const getMeetings = async () => {
		const data = await MeetingController.fetchMeetings();
		const rawMeetings =  [];
        const rawMeetingInvites =  [];
		if (data !== undefined && data.length > 0) {
			for (const meeting of data) {
                const rawMeeting = meeting;

                // load participant data
		        let ps = [];
                let accepted = meeting.meetingParticipants[parseInt(Cookies.get('accountID'))];
                if (Object.keys(meeting.meetingParticipants).length > 0) {
                    for (const pID of Object.keys(meeting.meetingParticipants)) {
                        let p = await ContactController.fetchUserByID(pID);
                        ps.push({
                            "data" : p,
                            "accepted": meeting.meetingParticipants[pID]});
                    }
                    rawMeeting.meetingParticipants = ps;
                } else { rawMeeting.meetingParticipants = []; }

                // seperate accepted and non-accepted invites
                if (accepted) {
                    rawMeetings.push(rawMeeting);
                } else {
                    rawMeetingInvites.push(rawMeeting);
                }
			}
			setMeetings(rawMeetings);
            setMeetingInvites(rawMeetingInvites);
		}

        if (activeSort === 'date') {
            dateGroupSort(rawMeetings);
        } else {
            alphaGroupSort(rawMeetings);
        }
	}

	// Load all meetings from back-end
	useEffect(() => {
		getMeetings();
	}, )

    return (
		<>
            <div className="meetings-page">
                <div className="meetings-header">
                    <h1>Meetings</h1>
                    <button
                        data-testid="add-meeting"
                        className="add-btn meeting-btn"
                        onClick={() => { openModal() }}
                    >
                        <MdAdd size={22}/>
                        <h4>Add</h4>
                    </button>
                </div>
                <div className="meetings-sub-header">
                    <div className="filter-dropdown">
                        <Sort sortTypes={sortTypes}/>
                    </div>
                </div>
                <div className="meetings-page-body app-row">
                    <MeetingInvites
                        meetings={meetingInvites}
                        onAccept={acceptMeeting}
                        onDecline={declineMeeting}
                    />
                    <div className="meetings-container">
                        {(meetings !== undefined && meetings.length > 0) ?  (
                            Object.keys(meetingsByGroup)
                                .map(key => {
                                    return <MeetingList
                                            key={key}
                                            label={activeSort}
                                            meetings={meetingsByGroup[key]}
                                            meetingOptions={{onEdit:editMeeting, onDelete: deleteMeeting }}
                                            minuteOptions={{onEdit:editMinute, onDelete: deleteMinute, onAdd: addMinute }}
                                        />
                                    })
                        ) :( <></>)}
                        {modalShow ? <AddMeetingForm submit={addMeeting} show={modalShow} onHide={hideModal}/> : ""}
                    </div>
            </div>
        </div>
    </>)
}

export default Meetings;