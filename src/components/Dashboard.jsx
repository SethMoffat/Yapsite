import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>YapSite</h2>
        </div>
        <div className="nav-user">
          <div className="user-info">
            <div className="twitch-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </div>
            <span>Welcome, {user}!</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <div className="dashboard-container">
          <h1>Welcome to Your Dashboard</h1>
          <p>You've successfully logged in to YapSite!</p>
          
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>🎮 Stream Activity</h3>
              <p>See what your favorite streamers are up to and join the conversation.</p>
              <button className="card-btn">Browse Streams</button>
            </div>
            
            <div className="dashboard-card">
              <h3>� Chat Highlights</h3>
              <p>Your best chat moments and memorable interactions.</p>
              <button className="card-btn">View Highlights</button>
            </div>
            
            <div className="dashboard-card">
              <h3>� Community</h3>
              <p>Connect with other viewers and streamers in your communities.</p>
              <button className="card-btn">Find Communities</button>
            </div>
            
            <div className="dashboard-card">
              <h3>⚙️ Settings</h3>
              <p>Customize your Yap experience and Twitch integration.</p>
              <button className="card-btn">Settings</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
