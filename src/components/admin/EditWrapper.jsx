// src/components/admin/editwrapper.jsx
import React, { useState } from 'react';
import './Admin.css';

const EditWrapper = ({ children, onSave, fieldName, initialValue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // if the initial value is an array, join it for the input field. otherwise, use as is.
  const [currentValue, setCurrentValue] = useState(
    Array.isArray(initialValue) ? initialValue.join(', ') : initialValue
  );
  
  const handleSave = (e) => {
    e.preventDefault();
    // if the original value was an array, split the string back into an array before saving.
    const valueToSave = Array.isArray(initialValue)
      ? currentValue.split(',').map(s => s.trim())
      : currentValue;
      
    onSave(fieldName, valueToSave);
    setIsModalOpen(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const val = Array.isArray(initialValue) ? initialValue.join(', ') : initialValue;
    setCurrentValue(val);
    setIsModalOpen(true);
  }

  const isTextArea = typeof initialValue === 'string' && initialValue.length > 100;

  return (
    <div className="edit-wrapper">
      {children}
      <button className="edit-icon" onClick={openModal}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      {isModalOpen && (
        <div className="edit-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <label htmlFor={fieldName}>Editing: {fieldName}</label>
              {isTextArea ? (
                <textarea
                  id={fieldName}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  rows="5"
                />
              ) : (
                <input
                  type="text"
                  id={fieldName}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              )}
              <div className="edit-modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWrapper;