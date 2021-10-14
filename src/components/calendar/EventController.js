import SpringBootAdapterWrapper from "../../util/SpringBootAdapterWrapper";
import TaskController from "../tasks/TaskController";
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
				data => { return (data.filter((event) => event.taskDeadline !== null).map(event => ({title: event.taskName, date: event.taskDeadline}))); }
			);
			return res;
		} catch (err) {
			console.log(err)
		}
    },
    /**
     * Method to create event
     * @param {*} event The event to be created
     */
    postEvent: (event) => {
        //post
    }
}

export default EventController;