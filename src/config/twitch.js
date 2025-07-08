// Twitch OAuth Configuration
export const TWITCH_CONFIG = {
  CLIENT_ID: '7dgxpnkpkt4vfyejeowbfquiptreeo', // Your actual Twitch Client ID
  REDIRECT_URI: 'https://yapsite.vercel.app/?mobile=true', // Match your mobile app's redirect
  SCOPES: ['user:read:email'],
  BASE_URL: 'https://api.twitch.tv/helix', // Twitch API base URL
  
  // For development/testing, you can use localhost
  // REDIRECT_URI: 'http://localhost:5173/?mobile=true',
};

// Mobile app URL schemes to try when redirecting back
export const MOBILE_APP_SCHEMES = [
  'yapapp://',
  'yap://',
  'com.yourapp.yap://',
];
