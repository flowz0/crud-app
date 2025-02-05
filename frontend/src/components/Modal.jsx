import { useState } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

export default function Modal({ onSubmit, onClose }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};