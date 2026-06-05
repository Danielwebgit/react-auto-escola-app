import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Blobs decorativos */}
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-white text-center tw-debug-white">
          Auto Escola
        </h1>
        <p className="text-center text-white/70 mt-2 mb-8">
          Acesse sua conta para continuar
        </p>
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Senha */}
          <div>
            <label className="text-sm text-white/80">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-100 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Acessar'}
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          Sistema seguro com Supabase
        </p>
      </div>
    </div>
  )
}