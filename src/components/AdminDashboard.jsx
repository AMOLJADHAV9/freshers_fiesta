import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ branch: '', event: '' });
  
  const branches = ['Computer', 'IT', 'Electronics', 'Mechanical', 'Civil', 'AIML', 'AIDS', 'Electrical and Electronics'];
  const events = ['Dancing', 'Singing', 'Comedy', 'Drama', 'Quiz', 'Debate', 'Sports'];

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [registrations, filter]);

  const fetchRegistrations = async () => {
    try {
      const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const registrationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(registrationsData);
      setFilteredRegistrations(registrationsData);
    } catch (err) {
      console.error('Error fetching registrations: ', err);
      setError('Failed to fetch registrations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...registrations];
    
    if (filter.branch) {
      result = result.filter(reg => reg.branch === filter.branch);
    }
    
    if (filter.event) {
      result = result.filter(reg => reg.events.includes(filter.event));
    }
    
    setFilteredRegistrations(result);
  };

  const handleFilterChange = (name, value) => {
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilter({ branch: '', event: '' });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (err) {
      console.error('Error signing out: ', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Branch', 'Phone', 'Participation Type', 'Events', 'Group Name', 'Group Members'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        `"${reg.fullName}"`,
        reg.branch,
        reg.phone,
        reg.participationType,
        `"${reg.events.join(', ')}"`,
        reg.participationType === 'Group' ? `"${reg.groupName}"` : '',
        reg.participationType === 'Group' ? `"${reg.groupMembers.map(m => `${m.name} (${m.rollNo})`).join(', ')}"` : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'registrations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-actions">
          <button
            onClick={exportToCSV}
            className="export-button"
          >
            Export to CSV
          </button>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-field">
            <label className="filter-label">Filter by Branch</label>
            <select
              value={filter.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
              className="filter-select"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-field">
            <label className="filter-label">Filter by Event</label>
            <select
              value={filter.event}
              onChange={(e) => handleFilterChange('event', e.target.value)}
              className="filter-select"
            >
              <option value="">All Events</option>
              {events.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-actions">
            <button
              onClick={clearFilters}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        <div className="filter-info">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </div>
      </div>

      {/* Registrations Table */}
      <div className="table-container">
        <table className="registrations-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Branch</th>
              <th className="table-header-cell">Phone</th>
              <th className="table-header-cell">Type</th>
              <th className="table-header-cell">Events</th>
              <th className="table-header-cell">Group</th>
              <th className="table-header-cell">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data-cell">
                  No registrations found
                </td>
              </tr>
            ) : (
              filteredRegistrations.map(reg => (
                <tr key={reg.id} className="table-row">
                  <td className="table-cell">{reg.fullName}</td>
                  <td className="table-cell">{reg.branch}</td>
                  <td className="table-cell">{reg.phone}</td>
                  <td className="table-cell">{reg.participationType}</td>
                  <td className="table-cell">
                    <div className="events-container">
                      {reg.events.map(event => (
                        <span key={event} className="event-tag">
                          {event}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table-cell">
                    {reg.participationType === 'Group' ? (
                      <div>
                        <div className="group-name">{reg.groupName}</div>
                        <div className="group-members">
                          {reg.groupMembers.map(m => `${m.name} (${m.rollNo})`).join(', ')}
                        </div>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="table-cell">
                    {reg.createdAt?.toDate().toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;