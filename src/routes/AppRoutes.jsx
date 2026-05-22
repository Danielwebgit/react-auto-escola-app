import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-white text-center mt-10">Carregando...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

import Login from '../pages/Login'
import CreateUser from '../pages/CreateUser'
import Dashboard from '../pages/Dashboard'
import CreateProduct from '../pages/CreateProduct'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/criar-usuario"
          element={<CreateUser />}
        />

        <Route
          path="/criar-produto"
          element={
            <RequireAuth>
              <CreateProduct />
            </RequireAuth>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}