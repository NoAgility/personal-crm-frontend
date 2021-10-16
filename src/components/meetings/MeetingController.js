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
            const data = await SpringBootAdapterWrapper.get('/meeting/getAccountMeetings')
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
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
                "accountIDs": meeting.accountIDs.length !== 0 ? meeting.accountIDs : [],
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
     * Edits a meeting
     * @param {*} meeting The meeting to be edited
     */
	 editMeeting: async (meeting) => {
        try {
            const data = {
                "meetingID": meeting.meetingID,
                "meetingName": meeting.meetingName,
                "meetingDescription": meeting.meetingDescription,
                "meetingStart": meeting.meetingStart,
                "meetingEnd": meeting.meetingEnd,
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
	 addMinute: async (meeting, minuteText) => {
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
     * @param {*} minute The meeting minutes to be deleted
     */
	 deleteMinute: async (meeting, minute) => {
        try {
            const data = {
				"meetingID" : meeting.meetingID,
				"minuteID" : minute.minuteID
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
     * @param {*} minute The meeting minutes to be edited
     */
	 editMinute: async (meeting, minute) => {
        try {
            const data = {
				"meetingID" : meeting.meetingID,
				"minuteID" : minute.minuteID,
				"minuteText" : minute.minuteText
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
     * @param {*} meeting The meeting to be accepted
     */
	 acceptMeetingInvite: async (meeting) => {
        try {
            const data = {
                "meetingID": meeting.meetingID,
            }
            await SpringBootAdapterWrapper.post('/meeting/acceptMeeting', "",  data)
				.then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to accept meeting");
        }
    },

	/**
     * Declines an invitation to a meeting
     * @param {*} meeting The meeting to be declined
     */
	 declineMeetingInvite: async (meeting) => {
        try {
            const data = {
                "meetingID": meeting.meetingID,
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