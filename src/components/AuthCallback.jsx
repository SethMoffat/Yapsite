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

        // Check if this is a mobile login
        const isMobileLogin = localStorage.getItem('mobile_login') === 'true' || 
                             (state && state.startsWith('mobile_'));
        
        // Prepare the data for the mobile app
        const authData = {
          code: code,
          state: state,
          timestamp: Date.now()
        };

        if (isMobileLogin) {
          // Try different mobile app URL schemes
          const appSchemes = [
            `yapapp://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`,
            `yap://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`,
            `com.yourapp.yap://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`
          ];

          // Try each scheme
          for (const scheme of appSchemes) {
            try {
              window.location.href = scheme;
              break;
            } catch (e) {
              console.log(`Failed to open ${scheme}:`, e);
            }
          }

          // Clean up
          localStorage.removeItem('mobile_login');
          localStorage.removeItem('twitch_oauth_state');
        } else {
          // Regular web login - redirect to app
          window.location.href = '/';
        }

        // Show success message after attempting redirect
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
        <p><strong>If the app doesn't open:</strong></p>
        <ul style={{textAlign: 'left', marginBottom: '1rem'}}>
          <li>Return to your mobile app manually</li>
          <li>Pull down to refresh the login screen</li>
          <li>Try the login process again</li>
        </ul>
        <div className="auth-code-info">
          <p><strong>Authorization Code:</strong></p>
          <code>{new URLSearchParams(window.location.search).get('code')?.substring(0, 20)}...</code>
        </div>
        <button onClick={() => window.location.href = '/'} className="back-btn">
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default AuthCallback;
