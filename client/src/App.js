import * as React from 'react';
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './components/Header'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import { CircularProgress } from '@mui/material'
import { useRoutes } from './routes'

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <CircularProgress />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <SnackbarProvider maxSnack={3}>
          <Header />
          <div className="main">
            {routes}
          </div>
        </SnackbarProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
