import React from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onBackToHome, onLoginSuccess }) => {
  const handleTwitchOAuth = () => {
    // Twitch OAuth configuration
    const clientId = 'YOUR_TWITCH_CLIENT_ID'; // You'll need to replace this with your actual client ID
    const redirectUri = encodeURIComponent('https://yap.center/auth/callback');
    const scope = encodeURIComponent('user:read:email');
    const state = encodeURIComponent(Math.random().toString(36).substring(2, 15));
    
    // Store state in localStorage for validation (optional security measure)
    localStorage.setItem('twitch_oauth_state', state);
    
    // Redirect to Twitch OAuth
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <button className="back-btn" onClick={onBackToHome}>
          ← Back to Home
        </button>
        
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome to Yap</h2>
            <p>Connect with your Twitch account to get started</p>
          </div>
          
          <div className="twitch-login-section">
            <button onClick={handleTwitchOAuth} className="twitch-login-btn">
              <div className="twitch-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </div>
              <span>Continue with Twitch</span>
            </button>
          </div>
          
          <div className="login-info">
            <p>
              By continuing, you agree to our Terms of Service and Privacy Policy.
              We'll only access your public Twitch profile information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
