import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onLoginClick }) => {
  return (
    <div className="home-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>YapSite Test</h2>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={onLoginClick}>Login</button>
        </div>
      </nav>
      
      <main className="main-content">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Yap</h1>
            <p className="hero-subtitle">
              Your ultimate destination for sharing thoughts, connecting with others, and building meaningful conversations.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onLoginClick}>
                Get Started
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </section>
        
        <section className="features">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Share Your Thoughts</h3>
              <p>Express yourself and share your ideas with the community.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Connect with Others</h3>
              <p>Build meaningful connections with like-minded individuals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Grow Together</h3>
              <p>Learn, grow, and evolve through engaging conversations.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Yap. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
