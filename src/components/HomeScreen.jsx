import React, { useEffect, useState } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onLoginClick }) => {
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    // Check if the user came from a mobile app
    const urlParams = new URLSearchParams(window.location.search);
    const fromMobile = urlParams.get('mobile') === 'true' || 
                      urlParams.get('app') === 'true' ||
                      window.location.href.includes('mobile=true');
    
    setIsMobileApp(fromMobile);
  }, []);

  const handleMobileLogin = () => {
    // Direct Twitch OAuth for mobile app users
    const clientId = 'YOUR_TWITCH_CLIENT_ID'; // Replace with your actual Client ID
    const redirectUri = encodeURIComponent('https://yap.center/auth/callback');
    const scope = encodeURIComponent('user:read:email');
    const state = encodeURIComponent('mobile_' + Math.random().toString(36).substring(2, 15));
    
    // Store that this is a mobile login
    localStorage.setItem('mobile_login', 'true');
    localStorage.setItem('twitch_oauth_state', state);
    
    // Redirect to Twitch OAuth
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  };

  if (isMobileApp) {
    return (
      <div className="home-screen mobile-view">
        <div className="mobile-login-container">
          <div className="mobile-login-card">
            <h1>Welcome to Yap!</h1>
            <p>Complete your login to continue using the app.</p>
            
            <button onClick={handleMobileLogin} className="mobile-twitch-btn">
              <div className="twitch-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </div>
              <span>Continue with Twitch</span>
            </button>
            
            <p className="mobile-info">
              After logging in, you'll be redirected back to the app automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="home-screen">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>YapSite</h2>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={onLoginClick}>Login</button>
        </div>
      </nav>
      
      <main className="main-content">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Yap Test</h1>
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
