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
import DoodleJump from './components/DoodleJump'
import Sokoban from './components/Sokoban'
import Tetris from './components/Tetris'

const App = () => {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path='/doodle-jump' element={
            <DoodleJump />
        } />
        <Route path='/sokoban' element={
            <Sokoban />
        } />
        <Route path='/tetris' element={
            <Tetris />
        } />


        <Route path='/' element={
            <HomePage />
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
