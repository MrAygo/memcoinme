import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MainLayout } from './components/Layout/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { NewLandingPage } from './pages/NewLandingPage'
import { SignInPage } from './pages/auth/SignInPage'
import { AuthCallback } from './pages/auth/Callback'

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<NewLandingPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}