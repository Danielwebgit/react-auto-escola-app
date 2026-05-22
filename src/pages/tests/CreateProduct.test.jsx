import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CreateProduct from '../CreateProduct'

// Mock do supabase
vi.mock('../../services/supabase', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn(() => ({ error: null }))
    })
  }
}))

describe('CreateProduct', () => {
  it('cria produto com sucesso', async () => {
    render(
      <MemoryRouter>
        <CreateProduct />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/Nome do produto/i), { target: { value: 'Produto Teste' } })
    fireEvent.change(screen.getByPlaceholderText(/Preço/i), { target: { value: '99.99' } })
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Produto cadastrado!/i)).toBeInTheDocument()
    })
  })
})