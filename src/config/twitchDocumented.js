/**
 * Twitch OAuth 2.0 Configuration
 * 
 * This file demonstrates proper configuration management for OAuth 2.0 integration
 * with the Twitch API. It shows how to organize API credentials and settings
 * in a maintainable and secure way.
 * 
 * Academic Learning Points:
 * - API credential management
 * - OAuth 2.0 configuration parameters
 * - Environment-based configuration
 * - Security considerations for client-side applications
 */

/**
 * Twitch OAuth 2.0 Configuration Object
 * 
 * OAuth 2.0 is an authorization framework that enables applications to obtain
 * limited access to user accounts. The flow implemented here is the 
 * "Authorization Code Flow" which is appropriate for web applications.
 */
export const TWITCH_CONFIG = {
  /**
   * CLIENT_ID: Public identifier for the application
   * - Obtained from Twitch Developer Console (https://dev.twitch.tv/console/apps)
   * - Safe to expose in client-side code
   * - Used to identify your application to Twitch's OAuth server
   */
  CLIENT_ID: '7dgxpnkpkt4vfyejeowbfquiptreeo',

  /**
   * REDIRECT_URI: URL where Twitch will send the user after authorization
   * - Must exactly match the URI registered in Twitch Developer Console
   * - HTTPS is required for production (security requirement)
   * - This is where the authorization code will be delivered
   */
  REDIRECT_URI: 'https://yap.center/auth/callback',

  /**
   * SCOPES: Permissions requested from the user
   * - 'user:read:email' allows reading the user's email address
   * - Additional scopes could include channel management, chat access, etc.
   * - Users see these permissions during the authorization flow
   */
  SCOPES: ['user:read:email'],

  /**
   * AUTHORIZATION_URL: Twitch's OAuth 2.0 authorization endpoint
   * - This is where users are redirected to grant permissions
   * - Standard OAuth 2.0 endpoint provided by Twitch
   */
  AUTHORIZATION_URL: 'https://id.twitch.tv/oauth2/authorize',

  /**
   * TOKEN_URL: Twitch's OAuth 2.0 token endpoint (for server-side use)
   * - Used to exchange authorization codes for access tokens
   * - Requires client secret (should only be used server-side)
   * - Not used in this client-side implementation
   */
  TOKEN_URL: 'https://id.twitch.tv/oauth2/token',
  
  /**
   * Development configuration for local testing
   * Uncomment and modify for local development:
   */
  // REDIRECT_URI: 'http://localhost:5173/auth/callback',
};

/**
 * Mobile Application Deep Link Schemes
 * 
 * These are custom URL schemes that can open your mobile application
 * directly from a web browser. The mobile app must register these
 * schemes with the operating system.
 */
export const MOBILE_APP_SCHEMES = [
  'yapapp://',      // Primary scheme for Yap app
  'yap://',         // Alternative shorter scheme
  'com.yourapp.yap://' // Reverse domain notation (recommended for uniqueness)
];

/**
 * OAuth 2.0 Flow Helper Functions
 */

/**
 * Generates a secure random state parameter for CSRF protection
 * The state parameter helps prevent Cross-Site Request Forgery attacks
 * by ensuring the response corresponds to a request initiated by this application
 */
export const generateOAuthState = (prefix = '') => {
  const randomString = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
  return prefix + randomString;
};

/**
 * Constructs the complete OAuth authorization URL
 * This function builds the URL that users will be redirected to for authorization
 */
export const buildAuthorizationUrl = (isMobile = false) => {
  const state = generateOAuthState(isMobile ? 'mobile_' : 'web_');
  const params = new URLSearchParams({
    client_id: TWITCH_CONFIG.CLIENT_ID,
    redirect_uri: TWITCH_CONFIG.REDIRECT_URI,
    response_type: 'code',
    scope: TWITCH_CONFIG.SCOPES.join(' '),
    state: state
  });

  // Store state in localStorage for later validation
  localStorage.setItem('twitch_oauth_state', state);
  if (isMobile) {
    localStorage.setItem('mobile_login', 'true');
  }

  return `${TWITCH_CONFIG.AUTHORIZATION_URL}?${params.toString()}`;
};

/**
 * Security Considerations for Academic Discussion:
 * 
 * 1. CLIENT SECRET: Not included here because this is a client-side application.
 *    The client secret should never be exposed in browser-accessible code.
 *    
 * 2. STATE PARAMETER: Used to prevent CSRF attacks by ensuring the authorization
 *    response corresponds to a request made by this application.
 *    
 * 3. HTTPS REQUIREMENT: OAuth 2.0 requires HTTPS in production to prevent
 *    interception of authorization codes and tokens.
 *    
 * 4. SCOPE LIMITATION: Only request the minimum permissions needed for your
 *    application to function (principle of least privilege).
 *    
 * 5. TOKEN STORAGE: Access tokens should be stored securely and have limited
 *    lifetimes. Consider using secure, httpOnly cookies for sensitive data.
 */
