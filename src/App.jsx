import { useState, useEffect } from 'react'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import AuthCallback from './components/AuthCallback'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if this is the OAuth callback URL
    const path = window.location.pathname;
    if (path === '/auth/callback' || window.location.search.includes('code=')) {
      setCurrentScreen('callback');
    }
  }, []);

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
    setUser(null)
    setCurrentScreen('home')
  }

  return (
    <div className="app">
      {currentScreen === 'home' && (
        <HomeScreen onLoginClick={handleLoginClick} />
      )}
      {currentScreen === 'login' && (
        <LoginScreen 
          onBackToHome={handleBackToHome}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentScreen === 'callback' && (
        <AuthCallback />
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
