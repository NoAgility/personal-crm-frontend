import SpringBootAdapterWrapper from "../../util/SpringBootAdapterWrapper";
import TaskController from "../tasks/TaskController";
import MeetingController from '../meetings/MeetingController';
const EventController = {
    
    /**
     * Method to fetch events
     */
    fetchPublicHolidays: async () => {
        try{
			const res = await SpringBootAdapterWrapper.get("/calendar/public_holiday/get").then(
				response => { return (response.data.map(event => ({title: event.name, date: event.date}))); }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
    },
    fetchTasks: async () => {
        try{
			const res = await TaskController.fetchTasks().then(
				data => { return (data.filter((event) => event.taskDeadline !== null).map(event => ({title: event.taskName, date: event.taskDeadline, backgroundColor: "#be8bfc", borderColor: "#be8bfc", display: "block"}))); }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
    },
    fetchMeetings: async () => {
        try{
			const res = await MeetingController.fetchMeetings().then(
				data => { return (data.map(event => ({title: event.meetingName, start: event.meetingStart, end: event.meetingEnd, backgroundColor: "#d4a46c", borderColor: "#d4a46c", display: "block"}))); }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
    },
    addTask: async (task) => {
		try {
			const res = await TaskController.addTask(task).then(res => { return res; });
			return res;
		} catch (err) {
			console.log(err);
		}
	},
	addMeeting: async (meeting) => {
		try {
			const res = await MeetingController.addMeeting(meeting).then(res => { return res; });
			return res;
		} catch (err) {
			console.log(err);
		}
	}
}

export default EventController;