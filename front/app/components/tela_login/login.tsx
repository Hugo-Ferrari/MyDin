'use client'

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
      router.push('/menu')
    } catch (error) {
      console.error('Login error:', error)
      alert('Erro ao conectar ao servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#ECECF1] via-white to-[#A692FF]/10">
      {/* Left column: MyDin branding */}
      <aside className="hidden md:flex w-1/2 items-center justify-start pl-12">
        <div>
          <h1 className="text-7xl font-extrabold text-[#5D3FD3] leading-tight">
            MonyFix
          </h1>
          <p className="mt-4 text-lg text-[#5D3FD3]/70 max-w-md font-medium">
            Gerenciamento salarial inteligente e personalizado — controle suas finanças com clareza.
          </p>

          {/* Benefits list */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[#5D3FD3]">
              <div className="w-8 h-8 rounded-full bg-[#F1C40F]/20 flex items-center justify-center">
                <span className="text-[#F1C40F] font-bold">✓</span>
              </div>
              <span className="font-medium">Acompanhe seu salário em tempo real</span>
            </div>
            <div className="flex items-center gap-3 text-[#5D3FD3]">
              <div className="w-8 h-8 rounded-full bg-[#F1C40F]/20 flex items-center justify-center">
                <span className="text-[#F1C40F] font-bold">✓</span>
              </div>
              <span className="font-medium">Analise deduções e benefícios</span>
            </div>
            <div className="flex items-center gap-3 text-[#5D3FD3]">
              <div className="w-8 h-8 rounded-full bg-[#F1C40F]/20 flex items-center justify-center">
                <span className="text-[#F1C40F] font-bold">✓</span>
              </div>
              <span className="font-medium">Planeje suas metas financeiras</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right column: Login form */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#101010] rounded-2xl shadow-2xl p-8 border border-[#A692FF]/20 dark:border-[#A692FF]/30">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-[#5D3FD3]/10 dark:bg-[#A692FF]/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-[#5D3FD3] dark:text-[#A692FF]">
                Bem-vindo de volta
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#5D3FD3] dark:text-white mb-2">
              Entrar
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Entre com sua conta para acessar seu dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#5D3FD3] dark:text-[#A692FF] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-[#A692FF]/30 dark:border-[#A692FF]/40 rounded-lg bg-white dark:bg-[#1a1a2e] text-[#5D3FD3] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] dark:focus:ring-[#A692FF] transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#5D3FD3] dark:text-[#A692FF]">
                  Senha
                </label>
                <Link
                  href="/recuperar-senha"
                  className="text-xs text-[#5D3FD3] dark:text-[#A692FF] hover:text-[#A692FF] dark:hover:text-[#F1C40F] transition-colors"
                >
                  Esqueceu?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#A692FF]/30 dark:border-[#A692FF]/40 rounded-lg bg-white dark:bg-[#1a1a2e] text-[#5D3FD3] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] dark:focus:ring-[#A692FF] transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#5D3FD3] to-[#A692FF] hover:from-[#A692FF] hover:to-[#5D3FD3] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#A692FF]/20 dark:border-[#A692FF]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#101010] text-gray-600 dark:text-gray-400">
                Não tem conta?
              </span>
            </div>
          </div>

          {/* Cadastro link */}
          <Link
            href="/cadastro"
            className="w-full block text-center px-4 py-3 border-2 border-[#5D3FD3] dark:border-[#A692FF] text-[#5D3FD3] dark:text-[#A692FF] font-semibold rounded-lg hover:bg-[#5D3FD3]/10 dark:hover:bg-[#A692FF]/10 transition-all duration-200"
          >
            Criar Conta
          </Link>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[#A692FF]/20 dark:border-[#A692FF]/30">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Ao acessar, você concorda com nossos{' '}
              <Link href="/termos" className="text-[#5D3FD3] dark:text-[#A692FF] hover:underline font-medium">
                Termos de Serviço
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}