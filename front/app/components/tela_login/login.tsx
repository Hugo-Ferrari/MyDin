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
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#1A2A4F]">
      {/* Left column: MyDin branding */}
      <aside className="hidden md:flex w-1/2 items-center justify-start pl-12 bg-gradient-to-br from-[#1A2A4F] to-[#0f1929]">
        <div>
          <h1 className="text-7xl font-extrabold text-[#3A86FF] leading-tight">
            MonyFix
          </h1>
          <p className="mt-4 text-lg text-[#7EDCE2] max-w-md font-medium">
            Gerenciamento salarial inteligente e personalizado — controle suas finanças com clareza.
          </p>

          {/* Benefits list */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Acompanhe seu salário em tempo real</span>
            </div>
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Analise deduções e benefícios</span>
            </div>
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Planeje suas metas financeiras</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right column: Login form */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#1A2A4F] rounded-2xl shadow-2xl p-8 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/50">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-[#3A86FF]/15 dark:bg-[#9D4EDD]/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-[#3A86FF] dark:text-[#7EDCE2]">
                Bem-vindo de volta
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A2A4F] dark:text-[#3A86FF] mb-2">
              Entrar
            </h1>
            <p className="text-sm text-gray-600 dark:text-[#7EDCE2]/70">
              Entre com sua conta para acessar seu dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A2A4F] dark:text-[#7EDCE2] mb-2">
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
                className="w-full px-4 py-2 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/40 rounded-lg bg-white dark:bg-[#0f1929] text-[#1A2A4F] dark:text-white placeholder-gray-400 dark:placeholder-[#7EDCE2]/50 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] dark:focus:ring-[#7EDCE2] transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#1A2A4F] dark:text-[#7EDCE2]">
                  Senha
                </label>
                <Link
                  href="/recuperar-senha"
                  className="text-xs text-[#3A86FF] dark:text-[#7EDCE2] hover:text-[#1A5FD4] dark:hover:text-[#9D4EDD] transition-colors font-medium"
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
                className="w-full px-4 py-2 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/40 rounded-lg bg-white dark:bg-[#0f1929] text-[#1A2A4F] dark:text-white placeholder-gray-400 dark:placeholder-[#7EDCE2]/50 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] dark:focus:ring-[#7EDCE2] transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#1A5FD4] hover:from-[#1A5FD4] hover:to-[#3A86FF] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#7EDCE2]/20 dark:border-[#7EDCE2]/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#1A2A4F] text-gray-600 dark:text-[#7EDCE2]/70">
                Não tem conta?
              </span>
            </div>
          </div>

          {/* Cadastro link */}
          <Link
            href="/cadastro"
            className="w-full block text-center px-4 py-3 border-2 border-[#3A86FF] dark:border-[#7EDCE2] text-[#3A86FF] dark:text-[#7EDCE2] font-semibold rounded-lg hover:bg-[#3A86FF]/10 dark:hover:bg-[#7EDCE2]/10 transition-all duration-200"
          >
            Criar Conta
          </Link>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30">
            <p className="text-xs text-center text-gray-500 dark:text-[#7EDCE2]/60">
              Ao acessar, você concorda com nossos{' '}
              <Link href="/termos" className="text-[#3A86FF] dark:text-[#7EDCE2] hover:underline font-medium">
                Termos de Serviço
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}