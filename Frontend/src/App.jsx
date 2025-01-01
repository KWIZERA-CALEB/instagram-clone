import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import ProtectedRoute from './components/atoms/ProtectedRoute'
import AuthProtectedRoute from './components/atoms/AuthProtectedRoute'
import ExplorePage from './pages/ExplorePage'
import InboxPage from './pages/InboxPage'


const App = () => {
  const { checkAuth, onlineUsers } = useAuthStore()

  console.log(onlineUsers)

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path='/' element={
            <HomePage />
        } />
        <Route path='/inbox' element={
            <InboxPage />
        } />
        <Route path='/explore' element={
            <ExplorePage />
        } />
        <Route path='/login' element={
          <AuthProtectedRoute>
            <LoginPage />
          </AuthProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <AuthProtectedRoute>
            <SignupPage />
          </AuthProtectedRoute>
        } />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
