import React ,{Component} from "react";
import "./index.css";
import Modal from '../Modal'

function Dummyedit(props) {
    const onCancel = () => {
      props.CPU()
    }
    
    const onYes = () => {
      props.clickYes()
    } 
    return (
        <Modal show={true} className="popup-box">
          <Modal.Body className="message-container">
            <p className="popup-msg1">
               <span className="popup-purpletxt">dummyedit profile </span> 
            </p>
            <p className="popup-msg2"> Would you like to proceed?</p>
          </Modal.Body>
          <Modal.Footer className="popup-btn">
            <div>
              <button className="button continue-btn" onClick={onYes}>
                Yes, continue
              </button>
            </div>
            <div>
              <button className="button cancel-btn" onClick={onCancel}>
                <span>Cancel</span>
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    }

//  function Dummyedit() {

//   return(
    
//     );
//   }
  export default Dummyedit
