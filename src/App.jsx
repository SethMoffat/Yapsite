import { useState, useEffect } from 'react'
import { TWITCH_CONFIG } from './config/twitch'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if this is the OAuth callback with access token (Implicit Grant)
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    // Check for mobile parameter
    if (urlParams.get('mobile') === 'true') {
      setCurrentScreen('mobile');
    }
    
    // Check for access token in URL hash (Implicit Grant response)
    const accessToken = hashParams.get('access_token');
    const state = hashParams.get('state');
    const error = hashParams.get('error');
    
    if (accessToken) {
      // Handle successful authentication
      handleTokenReceived(accessToken, state);
    } else if (error) {
      // Handle authentication error
      console.error('OAuth Error:', error);
      setCurrentScreen('home');
    }
  }, []);

  const handleTokenReceived = async (accessToken, state) => {
    try {
      // Validate state parameter
      const storedState = localStorage.getItem('twitch_oauth_state');
      if (state !== storedState) {
        console.warn('State parameter mismatch');
      }

      // Get user info from Twitch API
      const userResponse = await fetch(`${TWITCH_CONFIG.BASE_URL}/users`, {
        headers: {
          'Client-ID': TWITCH_CONFIG.CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        const username = userData.data[0]?.display_name || userData.data[0]?.login;
        
        // Store access token and user info
        localStorage.setItem('twitch_access_token', accessToken);
        localStorage.setItem('twitch_user', JSON.stringify(userData.data[0]));
        
        setUser(username);
        setCurrentScreen('dashboard');
      } else {
        throw new Error('Failed to fetch user data');
      }

      // Clean up
      localStorage.removeItem('mobile_login');
      localStorage.removeItem('twitch_oauth_state');
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (error) {
      console.error('Error processing token:', error);
      setCurrentScreen('home');
    }
  };

  const handleLoginClick = () => {
    setCurrentScreen('login')
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
  }

  const handleLoginSuccess = (email) => {
    setUser(email)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem('twitch_access_token');
    localStorage.removeItem('twitch_user');
    localStorage.removeItem('mobile_login');
    localStorage.removeItem('twitch_oauth_state');
    
    setUser(null);
    setCurrentScreen('home');
  }

  return (
    <div className="app">
      {(currentScreen === 'home' || currentScreen === 'mobile') && (
        <HomeScreen onLoginClick={handleLoginClick} />
      )}
      {currentScreen === 'login' && (
        <LoginScreen 
          onBackToHome={handleBackToHome}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
