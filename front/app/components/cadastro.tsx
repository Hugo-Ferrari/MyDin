
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Cadastro() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return alert('Preencha email e senha')
    if (password !== confirm) return alert('As senhas não coincidem')

    const stored = localStorage.getItem('mydin_user')
    if (stored) {
      const saved = JSON.parse(stored)
      if (saved.email === email) return alert('Email já cadastrado')
    }

    const user = { email, password }
    localStorage.setItem('mydin_user', JSON.stringify(user))
    alert('Cadastro realizado com sucesso. Faça login.')
    router.push('/') 
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirmar senha</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p><Link href="/">Voltar ao login</Link></p>
    </div>
  )
}
