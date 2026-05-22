import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleAddProduct(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.from('products').insert([
      { name, price: parseFloat(price) }
    ])
    if (error) {
      setMessage('Erro ao cadastrar produto: ' + error.message)
    } else {
      setMessage('Produto cadastrado!')
      setName('')
      setPrice('')
      setTimeout(() => navigate('/dashboard'), 1000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 backdrop-blur-xl mb-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Cadastrar Produto</h1>
        <form onSubmit={handleAddProduct} className="space-y-5">
          <div>
            <label className="text-sm text-white/80">Nome</label>
            <input
              type="text"
              placeholder="Nome do produto"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Preço</label>
            <input
              type="number"
              step="0.01"
              placeholder="Preço"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-100 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        {message && <p className="text-center text-white/80 mt-4">{message}</p>}
      </div>
    </div>
  )
}
