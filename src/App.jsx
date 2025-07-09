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
        
        // Check if this is a mobile authentication
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('mobile') === 'true') {
          // Redirect back to mobile app with token and user data
          const mobileRedirectData = {
            access_token: accessToken,
            user: userData.data[0],
            success: true
          };
          
          // Try different mobile app schemes
          const schemes = [
            `yap-mobile://auth?data=${encodeURIComponent(JSON.stringify(mobileRedirectData))}`,
            `exp://127.0.0.1:8081/--/auth?data=${encodeURIComponent(JSON.stringify(mobileRedirectData))}`,
            `exp://192.168.1.100:8081/--/auth?data=${encodeURIComponent(JSON.stringify(mobileRedirectData))}`
          ];
          
          // Show a message to the user
          document.body.innerHTML = `
            <div style="
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              font-family: Arial, sans-serif;
              background: #0e0e10;
              color: white;
              text-align: center;
              padding: 20px;
            ">
              <h2>✅ Authentication Successful!</h2>
              <p>Redirecting you back to the Yap Mobile app...</p>
              <p style="margin-top: 20px;">If you're not redirected automatically:</p>
              <button onclick="window.close()" style="
                background: #9146ff;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                margin: 10px;
              ">Close this window</button>
            </div>
          `;
          
          // Try to redirect to mobile app
          let redirected = false;
          for (const scheme of schemes) {
            try {
              window.location.href = scheme;
              redirected = true;
              break;
            } catch (error) {
              console.log('Failed to redirect with scheme:', scheme);
            }
          }
          
          if (!redirected) {
            // Fallback: try to close the window
            setTimeout(() => {
              try {
                window.close();
              } catch (e) {
                console.log('Could not close window automatically');
              }
            }, 2000);
          }
          
          return; // Don't continue with web flow
        }
        
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
