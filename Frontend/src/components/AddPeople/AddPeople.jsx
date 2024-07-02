import { useState } from "react";
import Modal from "react-modal";
import style from "./AddPeople.module.css";

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

  const [date, setDate] = useState(new Date());
  const onChangeData = () => {
    setDate(date);
  };

  const [val, setval] = useState([]);
  const handleAdd = () => {
    const add = [...val, []];
    setval(add);
  };
  const handleChange = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setval(inputData);
  };
  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setval(deleteVal);
  };
  console.log(val, "data-");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Popup Modal"
    >
      <div className={style.popup}>
        <div className={style.popuptitle}>
          <div className={style.popupheading}>Add people to the board</div>
          <div className={style.field}>
            <input
              className={style.input}
              type="text"
              placeholder="Enter Task Title"
            />
          </div>
        </div>

        <div className={style.footer}>
          <div className={style.popupbutton}>
            <button className={style.buttonRegister} onClick={closeModal}>
              Cancel
            </button>
            <button className={style.button}>Register</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddPeople;
