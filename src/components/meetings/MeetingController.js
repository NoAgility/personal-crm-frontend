import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper';

/**
 * Controller singleton providing an interface to the backend API
 */
const MeetingController = {
    /**
     * Retrieve meetings for a user
     * @returns a list of objects representing meetings
     */
    fetchMeetings: async () => {
        try {
            // const data = await SpringBootAdapterWrapper.get('/meeting/getAccountMeetings')
			// 	.then(res => { return res.data; } )
            //     .catch(err => { throw err; });
            // return data;
            const data = [{
                "meetingID": 1,
                "meetingCreator": 1,
                "meetingName": "Example meeting",
                "meetingDescription": "Example description",
                "meetingStart": "2021-12-20 04:30:00",
                "meetingEnd": "2021-12-20 04:30:00",
                "meetingParticipants": [1, 2],
                "meetingMinutes": [
                    {
                        "meetingID": 1,
                        "accountID": 1,
                        "minuteID": 1,
                        "minuteTime": "2021-12-20 04:30:00",
                        "minuteText": "Example minute"
                    }
                ],
                "meetingAccepted": true
            },
            {
                "meetingID": 2,
                "meetingCreator": 1,
                "meetingName": "Other meeting",
                "meetingDescription": "Example description",
                "meetingStart": "2021-12-20 04:30:00",
                "meetingEnd": "2021-12-20 04:30:00",
                "meetingParticipants": [1, 3],
                "meetingMinutes": [
                    {
                        "meetingID": 1,
                        "accountID": 1,
                        "minuteID": 1,
                        "minuteTime": "2021-12-20 04:30:00",
                        "minuteText": "Example minute"
                    }
                ],
                "meetingAccepted": true
            },
            {
                "meetingID": 3,
                "meetingCreator": 1,
                "meetingName": "Other meeting",
                "meetingDescription": "Example description",
                "meetingStart": "2021-12-20 04:30:00",
                "meetingEnd": "2021-12-20 04:30:00",
                "meetingParticipants": [1, 2],
                "meetingMinutes": [
                    {
                        "meetingID": 1,
                        "accountID": 1,
                        "minuteID": 1,
                        "minuteTime": "2021-12-20 04:30:00",
                        "minuteText": "Example minute"
                    }
                ],
                "meetingAccepted": false
            }
            ]
            return data;
        } catch (err) {
            alert("Failed to fetch meetings");
        }
    },

	/**
     * Retrieve a meeting by ID
     * @returns a list of objects representing meetings
     */
	 fetchMeetingByID: async (id) => {
        try {
            const data = await SpringBootAdapterWrapper.get(`/meeting/getMeetingByID?meetingID=${id}`)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
            return data;
        } catch (err) {
            alert("Failed to fetch meetings");
        }
    },

    /**
     * Adds a meeting for a user
     * @param {*} meeting The meeting to be added
     */
    addMeeting: async (meeting) => {
        try {
            const data = {
                "accountIDs": meeting.contactIDs.length !== 0 ? meeting.contactIDs : [],
                "meetingName": meeting.meetingName,
                "meetingDescription": meeting.meetingDescription,
                "meetingStart": meeting.meetingStart,
                "meetingEnd": meeting.meetingEnd,
                // "meetingMinutes": meeting.meetingMinutes,
                // ...(meeting.meetingDeadline !== null) && {"deadline": meeting.meetingDeadline},
                // ...(meeting.meetingPriority !== null && meeting.meetingPriority.length > 0) && {"priority": parseInt(meeting.meetingPriority)},
            }
            const res = await SpringBootAdapterWrapper.post('/meeting/createMeeting', "", data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create meeting");
        }
    },

    /**
     * Deletes a meeting
     * @param {*} meeting The meeting to be deleted
     */
    deleteMeeting: async (meeting) => {
        try {
            const data = { "meetingID" : meeting.meetingID };
            await SpringBootAdapterWrapper.post('/meeting/deleteMeeting', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to delete meeting");
        }
    },

	/**
     * Updates a meeting
     * @param {*} meeting The meeting to be updated
     */
	 updateMeeting: async (meeting) => {
        try {
            const data = {
                "accountIDs": meeting.contactIDs.length !== 0 ? meeting.contactIDs : [],
                "meetingName": meeting.meetingName,
                "meetingDescription": meeting.meetingDescription,
                "meetingStart": meeting.meetingStart,
                "meetingEnd": meeting.meetingEnd,
                // "meetingMinutes": meeting.meetingMinutes,
                // ...(meeting.meetingDeadline !== null) && {"deadline": meeting.meetingDeadline},
                // ...(meeting.meetingPriority !== null && meeting.meetingPriority.length > 0) && {"priority": parseInt(meeting.meetingPriority)},
            }
            await SpringBootAdapterWrapper.post('/meeting/editMeeting', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to edit meeting");
        }
    },


	/**
     * Add meeting minutes to a meeting
     * @param {*} meeting The meeting to receive minutes
     * @param {*} minutes The meeting minutes to be added
     */
	 addMinutes: async (meeting, minuteText) => {
        try {
            const data = {
				"meetingID" : meeting.meetingID,
				"minuteText" : minuteText
			};
            await SpringBootAdapterWrapper.post('/meeting/createMinute', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create meeting minutes");
        }
    },

	/**
     * Delete meeting minutes for a meeting
     * @param {*} meeting The meeting to delete minutes from
     * @param {*} minuteID The meeting minutes ID to be deleted
     */
	 deleteMinutes: async (meeting, minuteID) => {
        try {
            const data = {
				"meetingID" : meeting.meetingID,
				"minuteID" : minuteID
			};
            await SpringBootAdapterWrapper.post('/meeting/deleteMinute', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to delete meeting minutes");
        }
    },

	/**
     * Edit meeting minutes for a meeting
     * @param {*} meeting The meeting to edit minutes from
     * @param {*} minuteID The meeting minutes ID to be edited
     * @param {*} minuteText The updated meeting mintues
     */
	 editMinutes: async (meeting, minuteID, minuteText) => {
        try {
            const data = {
				"meetingID" : meeting.meetingID,
				"minuteID" : minuteID,
				"minuteText" : minuteText
			};
            await SpringBootAdapterWrapper.post('/meeting/editMinute', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to edit meeting minutes");
        }
    },

    /**
     * Accepts an invitation to a meeting
     * @param {*} meetingID The meeting to be updated
     */
	 acceptMeetingInvite: async (meetingID) => {
        try {
            const data = {
                "meetingID": meetingID,
            }
            await SpringBootAdapterWrapper.post('/meeting/acceptMeeting', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to accept meeting");
        }
    },

	/**
     * Accepts an invitation to a meeting
     * @param {*} meetingID The meeting to be updated
     */
	 declineMeetingInvite: async (meetingID) => {
        try {
            const data = {
                "meetingID": meetingID,
            }
            await SpringBootAdapterWrapper.post('/meeting/declineMeeting', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to decline meeting");
        }
    }

}

export default MeetingController;