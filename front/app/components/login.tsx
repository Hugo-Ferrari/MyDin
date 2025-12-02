'use client'

// ...existing code...
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Preencha email e senha.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      let data: any = {}
      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (!res.ok) {
        alert(data.detail || data.message || 'Erro ao fazer login')
        setLoading(false)
        return
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
      } else if (data.token) {
        localStorage.setItem('token', data.token)
      }

      alert('Login realizado com sucesso!')
      router.push('/dashboard') // ajuste se não tiver rota dashboard
    } catch (error) {
      console.error('Login error:', error)
      alert('Erro ao conectar ao servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md  ">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <p className='mb-4 text-sm text-gray-600 '>Entre com sua conta para acessar o site</p>


      <form onSubmit={handleLogin} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full border px-2 py-1 rounded"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full border px-2 py-1 rounded"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600  py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

     
    </div>
  )
}