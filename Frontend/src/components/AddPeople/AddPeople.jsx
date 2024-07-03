import { useState } from "react";
import Modal from "react-modal";
import style from "./AddPeople.module.css";
import validator from "validator";
import { toast } from "react-hot-toast";

function AddPeople({ isOpen, closeModal }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const [email, setEmail] = useState("");
  const [submitPage, setSubmitPage] = useState(false);
  const [members, setMembers] = useState([]); // Local state for members
  const [val, setVal] = useState([]);

  const onChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const addEmailHandler = () => {
    if (!email) {
      toast.error("Email Required");
      return;
    } else if (!validator.isEmail(email)) {
      toast.error("Invalid Email...");
      return;
    } else if (members.includes(email)) {
      toast.error("Email already in use");
      return;
    }

    setMembers([...members, email]);
    setSubmitPage(true);
  };

  const closePopupHandler = () => {
    setSubmitPage(false);
    closeModal();
  };

  const handleAdd = () => {
    const add = [...val, []];
    setVal(add);
  };

  const handleChange = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setVal(inputData);
  };

  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Popup Modal"
    >
      <div className={style.popup}>
        {!submitPage && (
          <div className={style.popuptitle}>
            <div className={style.popupheading}>Add people to the board</div>
            <div className={style.field}>
              <input
                className={style.input}
                type="text"
                placeholder="Enter the email"
                value={email}
                onChange={onChangeHandler}
              />
            </div>
            <div className={style.footer}>
              <div className={style.popupbutton}>
                <button
                  className={style.buttonRegister}
                  onClick={closePopupHandler}
                >
                  Cancel
                </button>
                <button className={style.button} onClick={addEmailHandler}>
                  Add Email
                </button>
              </div>
            </div>
          </div>
        )}
        {submitPage && (
          <div className={style.submitContainer}>
            <h3>{`${email} added to board`}</h3>
            <button className={style.infoButton} onClick={closePopupHandler}>
              Okay, got it!
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AddPeople;
