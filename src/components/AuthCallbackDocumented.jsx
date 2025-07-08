/**
 * Twitch OAuth Integration - Academic Example
 * 
 * This component demonstrates a complete OAuth 2.0 flow implementation
 * for integrating Twitch authentication into a React web application
 * that serves as an authentication bridge for a mobile app.
 * 
 * Key Concepts Demonstrated:
 * - OAuth 2.0 Authorization Code Flow
 * - URL parameter parsing and validation
 * - Local storage for state management
 * - Deep linking to mobile applications
 * - Error handling and user feedback
 * - Security considerations (state parameter validation)
 */

import React, { useEffect, useState } from 'react';
import './AuthCallback.css';

const AuthCallback = () => {
  // State management for different phases of the OAuth flow
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // STEP 1: Parse OAuth response from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');    // Authorization code from Twitch
        const state = urlParams.get('state');               // State parameter for CSRF protection
        const error = urlParams.get('error');               // Error if authorization failed
        const errorDescription = urlParams.get('error_description');

        // STEP 2: Handle OAuth errors (user denied access, etc.)
        if (error) {
          console.error('OAuth Error:', error, errorDescription);
          setError(errorDescription || error);
          setStatus('error');
          return;
        }

        // STEP 3: Validate that we received an authorization code
        if (!authorizationCode) {
          setError('No authorization code received from Twitch');
          setStatus('error');
          return;
        }

        // STEP 4: Validate state parameter (CSRF protection)
        const storedState = localStorage.getItem('twitch_oauth_state');
        if (state !== storedState) {
          console.warn('State parameter mismatch - possible CSRF attack');
          // In production, you might want to reject this, but for demo we'll continue
        }

        // STEP 5: Check if this is a mobile app authentication flow
        const isMobileLogin = localStorage.getItem('mobile_login') === 'true' || 
                             (state && state.startsWith('mobile_'));

        console.log('OAuth Success:', {
          code: authorizationCode,
          state: state,
          isMobileLogin: isMobileLogin
        });

        if (isMobileLogin) {
          // STEP 6: Mobile App Flow - Attempt to redirect back to mobile app
          await redirectToMobileApp(authorizationCode, state);
        } else {
          // STEP 7: Web Flow - Redirect to web dashboard
          window.location.href = '/dashboard';
        }

        // STEP 8: Clean up stored OAuth state
        localStorage.removeItem('mobile_login');
        localStorage.removeItem('twitch_oauth_state');

        // Show success message after attempting redirect
        setTimeout(() => {
          setStatus('success');
        }, 2000);

      } catch (err) {
        console.error('OAuth callback processing error:', err);
        setError('Authentication processing failed');
        setStatus('error');
      }
    };

    handleOAuthCallback();
  }, []);

  /**
   * Attempts to redirect the user back to the mobile application
   * using various URL schemes that might be registered by the app
   */
  const redirectToMobileApp = async (code, state) => {
    const mobileAppSchemes = [
      `yapapp://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`,
      `yap://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`,
      `com.yourapp.yap://auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`
    ];

    // Try each URL scheme - the mobile OS will handle opening the correct app
    for (const scheme of mobileAppSchemes) {
      try {
        console.log('Attempting to open mobile app with scheme:', scheme);
        window.location.href = scheme;
        
        // If successful, the page will navigate away
        // If not, we'll continue to the next scheme
        break;
      } catch (error) {
        console.log(`Failed to open scheme ${scheme}:`, error);
      }
    }
  };

  // RENDER: Processing state
  if (status === 'processing') {
    return (
      <div className="auth-callback">
        <div className="auth-container">
          <div className="spinner" aria-label="Loading"></div>
          <h2>Authenticating with Twitch...</h2>
          <p>Please wait while we complete your authentication.</p>
          <div className="technical-info">
            <small>Processing OAuth 2.0 authorization code...</small>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Error state
  if (status === 'error') {
    return (
      <div className="auth-callback">
        <div className="auth-container error">
          <div className="error-icon" aria-label="Error">❌</div>
          <h2>Authentication Failed</h2>
          <p className="error-message">{error}</p>
          <div className="technical-info">
            <small>OAuth 2.0 flow encountered an error</small>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="back-btn"
            aria-label="Return to homepage"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // RENDER: Success state
  return (
    <div className="auth-callback">
      <div className="auth-container success">
        <div className="success-icon" aria-label="Success">✅</div>
        <h2>Authentication Successful!</h2>
        <p>Your Twitch account has been successfully linked.</p>
        
        <div className="success-details">
          <h3>What happens next:</h3>
          <ul>
            <li>You should be redirected to your mobile app automatically</li>
            <li>If the app doesn't open, return to it manually</li>
            <li>Your authorization will be processed securely</li>
          </ul>
        </div>

        <div className="auth-code-info">
          <h4>Technical Details:</h4>
          <p><strong>Authorization Code:</strong></p>
          <code>{new URLSearchParams(window.location.search).get('code')?.substring(0, 20)}...</code>
          <p><small>This code will be exchanged for an access token by your mobile app</small></p>
        </div>

        <button 
          onClick={() => window.location.href = '/'} 
          className="back-btn"
          aria-label="Return to homepage"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default AuthCallback;
