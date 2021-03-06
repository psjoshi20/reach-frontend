import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import Modal from "../Modal";

const fetchPreferredContacts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API}/contacts/type`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const data = res.json();
  return data;
};

function Edit(props) {
  const id = useParams();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchPreferredContacts().then((data) => setContacts(data));
  }, []);

  const currentRemarks = props.existingData.details.donorRemarks;
  const currentPreferredContact = props.existingData.contact.preferredContactId;
  const currentDNC = props.existingData.contact.dnc;

  const initialPreference = {
    dnc: currentDNC,
    preferredContact: currentPreferredContact,
  };
  const [remarks, setRemarks] = useState(currentRemarks);
  const [preferenceState, setPreferenceState] = useState(initialPreference);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChangedPreference = (e) => {
    const dncValue = e.target.value === "true";

    let newPreferences = {
      dnc: dncValue,
      preferredContact: dncValue ? null : e.target.value, // if DNC was true, return null, otherwise return the target value
    };

    setPreferenceState(newPreferences);
  };

  const submitEdits = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/donors/edit/${id.idNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({
        remarks: remarks,
        ...preferenceState, // destructure the state here since we earlier made sure it matches the request shape
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        } else if (res.status === 500) {
          return setErrorMsg(
            <div className="edit-errormsg">
              Internal Server Error. Please try again later
            </div>
          );
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Modal
        show={props.showModal}
        dialogClassName="modal-90w"
        onHide={props.close}
        className="edit-modal-container"
      >
        <div className="edit-modal">
          <Modal.Header>
            <header className="title">Edit Donor Information</header>
            <Modal.Close onClick={props.close} />
          </Modal.Header>

          <Modal.Body className="edit-body">
            <div className="edit-body-wrapper">
              <div className="remarks-container">
                <h1 className="edit-subheader">Remarks</h1>
                <textarea
                  name="Text1"
                  id="remarks"
                  value={remarks}
                  className="remarks-input"
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>
              <div className="preference-container">
                <h2 className="edit-subheader"> Preferred Contact </h2>
                <div className="radio-container">
                  <form onChange={handleChangedPreference}>
                    {contacts.length &&
                      contacts.map((contact) => (
                        <div key={contact.id}>
                          <label>
                            <input
                              name="contact"
                              type="radio"
                              value={contact.id}
                              defaultChecked={
                                currentPreferredContact === contact.id
                              }
                            />

                            <span className="radio-label">
                              {displayContactType(contact.id)}
                            </span>
                          </label>
                        </div>
                      ))}
                    <label>
                      <input
                        name="contact"
                        type="radio"
                        value="true"
                        defaultChecked={currentDNC}
                      />
                      <span className="radio-label">Do Not Contact</span>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <div className="edit-errormsg">{errorMsg}</div>
          <button className="button transparentbutton" onClick={props.close}>
            Cancel
          </button>
          <div>
            <button className="button orangebutton" onClick={submitEdits}>
              Save Donor Details
            </button>
            <br />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const displayContactType = (id) => {
  if (id === 1) {
    return "Phone Number";
  }
  if (id === 2) {
    return "Email Address";
  }
  if (id === 3) {
    return "Mailing Address";
  }
};

export default Edit;
