
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddMeetingForm from './AddMeetingForm';
import MeetingController from './MeetingController';
import ContactController from '../contacts/ContactController.js'
import MeetingList from './MeetingList';
import "./Meetings.css";
import Sort from '../UIComponents/sort/Sort.js';

const Meetings = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};
    const [meetings, setMeetings] = useState([]);
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
     * Function for wrapping an update meeting call to the backend
     * @param {*} meeting The new meeting details
     */
    const updateMeeting = async (meeting) => {
        await MeetingController.updateMeeting(meeting);
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
    * Groups meetings by dates
    * @param {*} meetings Meetings to be grouped
    * @returns Array of groups of meetings by date
    */
    const groupByDate = (meetings) => {
        const reduced = {};
        meetings.forEach((meeting) => {(
            reduced[meeting.meetingStart] = reduced[meeting.meetingStart] || [] ).push(meeting);
        })
        return reduced;
    };

    // /**
    //  * Custom sorter for meetings, sorts by dates closest to Today
    //  * null Dates or 1970 January 1 will always be last
    //  * @param {*} meetings Meetings to be sorted
    //  */
    const sortByDate = (meetings) => {
        meetings.sort((a, b) => {
            var dateA = new Date(a.meetingStart);
            var dateB = new Date(b.meetingStart);
            if (dateA.toLocaleDateString() === new Date(0).toLocaleDateString()) return 1;
            if (dateB.toLocaleDateString() === new Date(0).toLocaleDateString()) return -1;
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        }
    )};
    const sortByAlpha = (meetings) => {
        meetings.sort((a, b) => {
            if (a.meetingAlpha > b.meetingAlpha) return -1;
            if (a.meetingAlpha < b.meetingAlpha) return 1;
            return 0;
        }
    )};
    const groupByAlpha = (meetings) => {
        const reduced = {};
        meetings.forEach((meeting) => {(
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

    // Gets all the contacts from the backend
	const getMeetings = async () => {
		const data = await MeetingController.fetchMeetings();
		const ms =  [];
		if (data !== undefined && data.length > 0) {
			for (const meeting of data) {
                const m = meeting;
		        let ps = [];
			    for (const participant of meeting.meetingParticipants) {
                    let p = await ContactController.fetchUserByID(participant);
                    ps.push(p);
                }
                m.meetingParticipants = ps;
                ms.push(m);
			}
			setMeetings(ms);
		}

        if (activeSort === 'date') {
            dateGroupSort(data);
        } else {
            alphaGroupSort(data);
        }

	}

	// Load all contacts from back-end
	useEffect(() => {
		getMeetings();

	}, [])


    /**
     * On render, fetch existing meetings to display to the user.
     */
    // useEffect(() => {
    //     //React throws a warning if I don't encapsulate the dependencies inside useEffect
    //     //Hence two similar functions
    //     const dateGroupSortAlt = (data) => {
    //         sortByDate(data);
    //         setMeetingsByGroup(groupByDate(data));
    //     }

    //     const fetchMeetings = async () => {
    //         // const data = await MeetingController.fetchMeetings();

        //     if (data !== undefined || data.length !== 0) {
        //         setMeetings(data);
        //         dateGroupSortAlt(data);
        //     }
        // };
    //     fetchMeetings();


    // }, []);

    // useEffect(async () => {
    //     const getParticipants = async (data) => {
    //         let ms = [];
    //         for (var meeting in meetings) {
    //             const m = meetings[meeting];
    //             const ps = [];
    //             const participants = meetings[meeting].meetingParticipants;
    //             for (var participant in participants) {
    //                 let  p = await ContactController.fetchUserByID(participants[participant]);
    //                 ps.push(p);
    //             }
    //             m.meetingParticipants = ps;
    //             ms.push(m);
    //         }
    //         return ms;
    //     }

    //     if (meetings !== undefined || meetings.length !== 0) {
    //         const ms = await getParticipants(meetings);
    //         if (ms !== undefined || ms.length !== 0) {
    //             setMeetings(ms);
    //             console.log(ms);
    //         }
    //     }



    // }, [meetings] );


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
                <div className="meetings-container">
                    {(meetings !== undefined && meetings.length > 0) ?  (
                        Object.keys(meetingsByGroup)
                            .map(key => {
                                return <MeetingList
                                    key={key}
                                    label={activeSort}
                                    meetings={meetingsByGroup[key]}
                                    editOptions={{update: updateMeeting, delete: deleteMeeting}}
                                    />
                                })
                    ) :( <></>)}
                    {modalShow ? <AddMeetingForm /*submit={addMeeting}*/ show={modalShow} onHide={hideModal}/> : ""}
                <p/>
            </div>
        </div>
    </>)
}

export default Meetings;