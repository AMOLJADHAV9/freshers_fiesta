import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    branch: '',
    phone: '',
    participationType: 'Solo',
    events: [],
    groupName: '',
    groupMembers: [{ name: '', rollNo: '' }]
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const branches = ['Computer', 'IT', 'Electronics', 'Mechanical', 'Civil', 'AIML', 'AIDS', 'Electrical and Electronics'];
  const events = ['Dancing', 'Singing', 'Comedy', 'Drama', 'Quiz', 'Debate', 'Sports'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        events: [...prev.events, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        events: prev.events.filter(event => event !== value)
      }));
    }
  };

  const handleGroupMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.groupMembers];
    updatedMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      groupMembers: updatedMembers
    }));
  };

  const addGroupMember = () => {
    setFormData(prev => ({
      ...prev,
      groupMembers: [...prev.groupMembers, { name: '', rollNo: '' }]
    }));
  };

  const removeGroupMember = (index) => {
    if (formData.groupMembers.length > 1) {
      const updatedMembers = [...formData.groupMembers];
      updatedMembers.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        groupMembers: updatedMembers
      }));
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.branch || !formData.phone) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.events.length === 0) {
      setError('Please select at least one event');
      return false;
    }

    if (formData.participationType === 'Group') {
      if (!formData.groupName) {
        setError('Please enter a group name');
        return false;
      }

      for (let member of formData.groupMembers) {
        if (!member.name || !member.rollNo) {
          setError('Please fill in all group member details');
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Prepare data for Firestore
      const registrationData = {
        ...formData,
        createdAt: new Date()
      };

      // Add to Firestore
      await addDoc(collection(db, 'registrations'), registrationData);
      
      setSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        branch: '',
        phone: '',
        participationType: 'Solo',
        events: [],
        groupName: '',
        groupMembers: [{ name: '', rollNo: '' }]
      });
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-title">Fresher's Fiesta Registration</h2>
      
      {success && (
        <div className="success-message">
          Registration submitted successfully!
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3 className="form-section-title">Personal Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Branch *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Participation Type */}
        <div className="form-section">
          <h3 className="form-section-title">Participation Type</h3>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="participationType"
                value="Solo"
                checked={formData.participationType === 'Solo'}
                onChange={handleChange}
                className="radio-input"
              />
              <span className="radio-text">Solo</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="participationType"
                value="Group"
                checked={formData.participationType === 'Group'}
                onChange={handleChange}
                className="radio-input"
              />
              <span className="radio-text">Group</span>
            </label>
          </div>
        </div>

        {/* Events Selection */}
        <div className="form-section">
          <h3 className="form-section-title">Select Events *</h3>
          <div className="checkbox-grid">
            {events.map(event => (
              <label key={event} className="checkbox-label">
                <input
                  type="checkbox"
                  value={event}
                  checked={formData.events.includes(event)}
                  onChange={handleEventChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">{event}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Group Information */}
        {formData.participationType === 'Group' && (
          <div className="form-section">
            <h3 className="form-section-title">Group Information</h3>
            <div className="form-field">
              <label className="form-label">Group Name *</label>
              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <h4 className="group-members-title">Group Members</h4>
              {formData.groupMembers.map((member, index) => (
                <div key={index} className="group-member-row">
                  <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleGroupMemberChange(index, 'name', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Roll Number</label>
                    <div className="roll-number-input">
                      <input
                        type="text"
                        value={member.rollNo}
                        onChange={(e) => handleGroupMemberChange(index, 'rollNo', e.target.value)}
                        className="form-input"
                      />
                      {formData.groupMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGroupMember(index)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addGroupMember}
                className="add-member-button"
              >
                Add Member
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="submit-container">
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'submit-button-disabled' : ''}`}
          >
            {loading ? 'Submitting...' : 'Register for Events'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;