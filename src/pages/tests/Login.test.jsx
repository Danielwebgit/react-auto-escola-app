import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../Login'
import { vi } from 'vitest'

beforeAll(() => {
  vi.spyOn(window, 'alert').mockImplementation(() => {})
})
// Mock do supabase
vi.mock('../../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(({ email, password }) => {
        if (!email || !password) return { error: { message: 'Campos obrigatórios' } }
        if (email !== 'a@a.com' || password !== '123456') return { error: { message: 'Credenciais inválidas' } }
        return { error: null }
      })
    }
  }
}))

describe('Login', () => {
  it('faz login com sucesso', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText(/Digite seu email/i), { target: { value: 'a@a.com' } })
    fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: /Acessar/i }))
    // Aqui você pode esperar por navegação ou mensagem de sucesso
  })

  it('mostra erro se campos vazios', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: /Acessar/i }))
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Campos obrigatórios')
    })
  })

  it('mostra erro se credenciais inválidas', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText(/Digite seu email/i), { target: { value: 'errado@email.com' } })
    fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), { target: { value: 'errada' } })
    fireEvent.click(screen.getByRole('button', { name: /Acessar/i }))
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Credenciais inválidas')
    })
  })
})