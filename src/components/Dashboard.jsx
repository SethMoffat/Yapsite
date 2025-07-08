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
          <span>Welcome, {user}!</span>
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
              <h3>📝 Recent Posts</h3>
              <p>Check out the latest posts from your network.</p>
              <button className="card-btn">View Posts</button>
            </div>
            
            <div className="dashboard-card">
              <h3>👥 Friends</h3>
              <p>Connect with friends and discover new people.</p>
              <button className="card-btn">Find Friends</button>
            </div>
            
            <div className="dashboard-card">
              <h3>💬 Messages</h3>
              <p>Stay connected with your conversations.</p>
              <button className="card-btn">View Messages</button>
            </div>
            
            <div className="dashboard-card">
              <h3>⚙️ Settings</h3>
              <p>Customize your profile and preferences.</p>
              <button className="card-btn">Settings</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
