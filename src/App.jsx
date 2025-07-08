import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [user, setUser] = useState(null)

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
