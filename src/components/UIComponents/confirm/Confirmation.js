import { Modal } from "react-bootstrap";
import {MdClose} from 'react-icons/md';
import "./Confirmation.css";
const Confirmation = ({show, onHide, msg, accept, cancel}) => {
    return (<>
    <Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="close-add-form">
				<MdClose className="close-button" onClick={onHide} size={30}/>
			</div>
            <Modal.Body>
            <h4>{msg}</h4>
            <div className="confirmation">
                
                <button className="confirmation-accept" onClick={() => {accept(); onHide()}}>Accept</button>
                <button className="confirmation-cancel" onClick={() => {cancel(); onHide()}}>Cancel</button>
            </div>
			</Modal.Body>
		</Modal>
    </>);
}

export default Confirmation