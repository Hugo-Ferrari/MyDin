
'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault()

       const stored = localStorage.getItem('mydin_user')
       if (!stored) {
         alert('Nenhum usuário cadastrado. Faça o cadastro primeiro.')
         return
       }
       const saved = JSON.parse(stored)
       if (saved.email === email && saved.password === password) {
           alert("Bem vindo de volta")
       } else {
           alert("Email ou senha inválidos")
       }
    }

  return (
    <div>
        <h1>Login</h1>
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label> Senha:</label>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                </div>
                <button type='submit'> Entrar</button>
            </form>
            <Link href="/cadastro">Ainda Não possui Cadastro?</Link>
        </div>
    </div>
  )
}

export default Login
