# Twitch OAuth Setup Guide

## Step 1: Register Your App on Twitch Developer Console

1. Go to https://dev.twitch.tv/console/apps
2. Click "Register Your Application"
3. Fill in the details:
   - **Name**: Yap App (or your app name)
   - **OAuth Redirect URLs**: `https://yap.center/auth/callback`
   - **Category**: Choose appropriate category
   - **Client Type**: Public (for mobile apps)

## Step 2: Get Your Client ID

1. After registration, you'll get a **Client ID**
2. Copy this Client ID
3. Replace `YOUR_TWITCH_CLIENT_ID` in `src/components/LoginScreen.jsx` with your actual Client ID

## Step 3: Mobile App Deep Link Setup

### For your mobile app, you need to:

1. **Register a custom URL scheme** (e.g., `yapapp://`)
2. **Handle the deep link** in your app when users return from the website
3. **Extract the authorization code** from the URL

### Example URL your app will receive:
```
yapapp://auth/callback?code=AUTHORIZATION_CODE&state=RANDOM_STATE
```

## Step 4: Exchange Code for Access Token

In your mobile app, you'll need to:

1. **Extract the code** from the deep link
2. **Exchange it for an access token** by making a POST request to:
   ```
   https://id.twitch.tv/oauth2/token
   ```
   With parameters:
   - `client_id`: Your Twitch Client ID
   - `client_secret`: Your Twitch Client Secret (store securely!)
   - `code`: The authorization code from the callback
   - `grant_type`: "authorization_code"
   - `redirect_uri`: "https://yap.center/auth/callback"

## Step 5: Use the Access Token

Once you have the access token, you can make API calls to:
- Get user info: `https://api.twitch.tv/helix/users`
- And other Twitch API endpoints

## Current Website Flow:

1. User clicks "Continue with Twitch" on your website
2. Redirects to Twitch OAuth
3. User authorizes your app
4. Twitch redirects back to `https://yap.center/auth/callback?code=...`
5. Website tries to open your mobile app with `yapapp://auth/callback?code=...`
6. Your mobile app receives the code and completes the authentication

## Security Notes:

- Store your Client Secret securely in your mobile app
- Validate the `state` parameter to prevent CSRF attacks
- Use HTTPS for all OAuth redirects
- Consider using PKCE for additional security
