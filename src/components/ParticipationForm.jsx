import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './ParticipationForm.css';

const ParticipationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    branch: '',
    department: '',
    events: [],
    phone: '',
    groupName: '',
    members: [''],
    message: '',
    timestamp: new Date()
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const branches = [
    'Computer and allied branches',
    'Electrical',
    'Mechanical',
    'Civil',
    'Electronics & Telecommunication'
  ];

  const events = [
    'Dancing 🪩',
    'Singing 🎶',
    'Comedy 🎙️',
    'Skit ✨',
    'Mr. & Miss Fresher contest 👑'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData(prev => ({
      ...prev,
      members: newMembers
    }));
  };

  const addMemberField = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, '']
    }));
  };

  const removeMemberField = (index) => {
    if (formData.members.length > 1) {
      const newMembers = [...formData.members];
      newMembers.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        members: newMembers
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    // Basic validation
    if (!formData.email || !formData.name || !formData.branch || !formData.department || !formData.phone) {
      setSubmitError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.events.length === 0) {
      setSubmitError('Please select at least one event to participate in.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'registrations'), formData);
      
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        email: '',
        name: '',
        branch: '',
        department: '',
        events: [],
        phone: '',
        groupName: '',
        members: [''],
        message: '',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error submitting form: ', error);
      setSubmitError('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="participation-form-container">
      <form className="participation-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Fresher's Fiesta 2K25 Registration</h2>
        
        {submitSuccess && (
          <div className="success-message">
            🎉 Thank you for registering! We will contact you soon. 🎉
          </div>
        )}
        
        {submitError && (
          <div className="error-message">
            ❌ {submitError}
          </div>
        )}
        
        <div className="form-section welcome-section">
          <h3>✨ Welcome to MPGI's Fresher's Fiesta 2K25! ✨</h3>
          <p>Get ready for the most awaited and exciting day of the year — a grand celebration filled with dance, music, games, laughter, and fun! 🎉</p>
          
          <p><strong>The fiesta will feature:</strong></p>
          <ul>
            <li>🎭 Cultural Events</li>
            <li>👑 Mr. & Miss Fresher Contest</li>
            <li>🎤 Special Performances</li>
            <li>🏆 Awards & Recognitions</li>
            <li>💃 Open Dance Floor</li>
            <li>🍴 Delicious Refreshments</li>
          </ul>
          
          <p>It's your chance to showcase your talent, make unforgettable memories, and celebrate new beginnings with your batchmates. Don't miss out — fun, energy, and entertainment await you! 🎆</p>
        </div>
        
        <div className="form-section">
          <h3>🎓 Participant Information</h3>
          
          <div className="form-group">
            <label htmlFor="email">📧 Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">👤 Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="branch">📚 Branch *</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select your branch</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="department">🏫 Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Enter your department"
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>🎪 Participating For</h3>
          <p>🌟 All the participants can participate with or without group in all competitions no restrictions about solo or group.<br />
          🔄 Also you can participate in multiple competition.</p>
          
          <div className="checkbox-group">
            {events.map((event, index) => (
              <div key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`event-${index}`}
                  name="events"
                  value={event}
                  checked={formData.events.includes(event)}
                  onChange={handleChange}
                />
                <label htmlFor={`event-${index}`}>{event}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-section">
          <h3>📱 Contact Information</h3>
          
          <div className="form-group">
            <label htmlFor="phone">📞 Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>🧑‍🦱 Your Group Name and Member Details</h3>
          
          <div className="form-group">
            <label htmlFor="groupName">👥 Group Name (if applicable)</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              placeholder="Enter your group name"
            />
          </div>
          
          <div className="members-section">
            <label>👥 Group Members:</label>
            {formData.members.map((member, index) => (
              <div key={index} className="member-input-row">
                <input
                  type="text"
                  placeholder={`Member ${index + 1} Name`}
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                />
                {formData.members.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeMemberField(index)}
                    className="remove-member-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={addMemberField}
              className="add-member-btn"
            >
              ➕ Add Another Member
            </button>
          </div>
        </div>
        
        <div className="form-section">
          <h3>💬 Additional Information</h3>
          
          <div className="form-group">
            <label htmlFor="message">📝 Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Any special requests or information you'd like to share..."
            ></textarea>
          </div>
        </div>
        
        <div className="form-section contact-section">
          <h3>Be Free to contact us we are waiting to help you 😉</h3>
          <p>We the seniors are organizing this event to welcome you and make your phone and brain's with full of memories</p>
          <p>So be Free with us to contact us for any kind of assistance!</p>
          <p><strong>VISHAL PATIL AND TEAM 📞 7083342970</strong></p>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '📤 Submitting...' : '✅ Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipationForm;