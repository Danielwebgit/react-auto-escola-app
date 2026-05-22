import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function CreateUser() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleCreateUser(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Cria usuário no auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    // Cria perfil com nome vinculado ao id do usuário
    if (data?.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { id: data.user.id, full_name: fullName }
      ])
      if (profileError) {
        setMessage('Usuário criado, mas erro ao salvar nome: ' + profileError.message)
      } else {
        setMessage('Usuário criado com sucesso! Agora faça login.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="w-full max-w-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Criar Conta</h1>
        <form onSubmit={handleCreateUser} className="space-y-5">
          <div>
            <label className="text-sm text-white/80">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-100 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>
        {message && <p className="text-center text-white/80 mt-4">{message}</p>}
      </div>
    </div>
  )
}
