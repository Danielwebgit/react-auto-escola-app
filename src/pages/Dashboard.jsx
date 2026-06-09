import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (!error) setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
      fetchProducts()
    }
    setLoading(false)
  }

  async function handleDelete(id) {
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex flex-col items-center py-10">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Lista de Produtos Cadastrados</h1>
        <button onClick={() => navigate('/criar-produto')} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition ml-4">Novo Produto</button>
        <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ml-4">Logout</button>
      </div>
      <div className="w-full max-w-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 backdrop-blur-xl">
        <ul className="divide-y divide-white/20">
          {products.map(prod => (
            <li key={prod.id} className="flex items-center justify-between py-3">
              <span className="text-white">{prod.name} - R$ {Number(prod.price).toFixed(2)}</span>
              <button
                onClick={() => handleDelete(prod.id)}
                className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >Excluir</button>
            </li>
          ))}
          {products.length === 0 && <li className="text-white/70 text-center py-4">Não há produtos cadastrados.</li>}
        </ul>
      </div>
    </div>
  )
}
