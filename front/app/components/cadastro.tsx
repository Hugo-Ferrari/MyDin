'use client'

// ...existing code...
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Cadastro({}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Preencha email e senha.')
      return
    }
    if (password !== confirm) {
      alert('As senhas não coincidem.')
      return
    }
    setLoading(true)
    try {
      const stored = localStorage.getItem('mydin_user')
      if (stored) {
        const saved = JSON.parse(stored)
        if (saved.email === email) {
          alert('Email já cadastrado.')
          setLoading(false)
          return
        }
      }
      const user = { email: email, password: password }
      localStorage.setItem('mydin_user', JSON.stringify(user))
      alert('Cadastro realizado com sucesso.')
      router.push('/') // redireciona ao login
    } catch (error) {
      console.error(error)
      alert('Erro ao realizar cadastro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Criar Conta</h1>
      <p>Crie sua conta gratuita para começar</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label htmlFor="confirm">Confirmar senha</label>
          <input id="confirm" name="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="w-full border px-2 py-1 rounded" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      
    </div>
  )
}