// Twitch OAuth Configuration
export const TWITCH_CONFIG = {
  CLIENT_ID: '7dgxpnkpkt4vfyejeowbfquiptreeo', // Your actual Twitch Client ID
  REDIRECT_URI: 'https://yap.center/auth/callback',
  SCOPES: ['user:read:email'],
  
  // For development/testing, you can use localhost
  // REDIRECT_URI: 'http://localhost:5173/auth/callback',
};

// Mobile app URL schemes to try when redirecting back
export const MOBILE_APP_SCHEMES = [
  'yapapp://',
  'yap://',
  'com.yourapp.yap://',
];
