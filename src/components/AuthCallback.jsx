import React, { useEffect, useState } from 'react';
import './AuthCallback.css';

const AuthCallback = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error) {
          setError(errorDescription || error);
          setStatus('error');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        // Here you would typically exchange the code for an access token
        // For now, we'll just prepare the data for the mobile app
        const authData = {
          code: code,
          state: state,
          timestamp: Date.now()
        };

        // Try to redirect back to your mobile app
        // You'll need to register a custom URL scheme for your app
        const mobileAppUrl = `yapapp://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`;
        
        // Try to open the mobile app
        window.location.href = mobileAppUrl;

        // If the mobile app doesn't open, show success message
        setTimeout(() => {
          setStatus('success');
        }, 2000);

      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Authentication failed');
        setStatus('error');
      }
    };

    handleCallback();
  }, []);

  if (status === 'processing') {
    return (
      <div className="auth-callback">
        <div className="auth-container">
          <div className="spinner"></div>
          <h2>Connecting to Twitch...</h2>
          <p>Please wait while we complete your authentication.</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="auth-callback">
        <div className="auth-container error">
          <div className="error-icon">❌</div>
          <h2>Authentication Failed</h2>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/'} className="back-btn">
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-callback">
      <div className="auth-container success">
        <div className="success-icon">✅</div>
        <h2>Authentication Successful!</h2>
        <p>You should be redirected to your mobile app automatically.</p>
        <p>If not, please return to your app manually.</p>
        <button onClick={() => window.location.href = '/'} className="back-btn">
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default AuthCallback;
