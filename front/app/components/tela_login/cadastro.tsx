'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Cadastro() {
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
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('Erro ao realizar cadastro.')
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
              <span className="font-medium">Cadastro rápido e seguro</span>
            </div>
            <div className="flex items-center gap-3 text-[#5D3FD3]">
              <div className="w-8 h-8 rounded-full bg-[#F1C40F]/20 flex items-center justify-center">
                <span className="text-[#F1C40F] font-bold">✓</span>
              </div>
              <span className="font-medium">Acesso instantâneo ao seu dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-[#5D3FD3]">
              <div className="w-8 h-8 rounded-full bg-[#F1C40F]/20 flex items-center justify-center">
                <span className="text-[#F1C40F] font-bold">✓</span>
              </div>
              <span className="font-medium">Proteja seus dados com criptografia</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right column: Cadastro form */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#101010] rounded-2xl shadow-2xl p-8 border border-[#A692FF]/20 dark:border-[#A692FF]/30">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-[#5D3FD3]/10 dark:bg-[#A692FF]/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-[#5D3FD3] dark:text-[#A692FF]">
                Novo usuário
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#5D3FD3] dark:text-white mb-2">
              Criar Conta
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Crie sua conta gratuita para começar a gerenciar seu salário
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-[#A692FF]/30 dark:border-[#A692FF]/40 rounded-lg bg-white dark:bg-[#1a1a2e] text-[#5D3FD3] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] dark:focus:ring-[#A692FF] transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#5D3FD3] dark:text-[#A692FF] mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#A692FF]/30 dark:border-[#A692FF]/40 rounded-lg bg-white dark:bg-[#1a1a2e] text-[#5D3FD3] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] dark:focus:ring-[#A692FF] transition-all"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-[#5D3FD3] dark:text-[#A692FF] mb-2">
                Confirmar Senha
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#A692FF]/30 dark:border-[#A692FF]/40 rounded-lg bg-white dark:bg-[#1a1a2e] text-[#5D3FD3] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] dark:focus:ring-[#A692FF] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#5D3FD3] to-[#A692FF] hover:from-[#A692FF] hover:to-[#5D3FD3] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#A692FF]/20 dark:border-[#A692FF]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#101010] text-gray-600 dark:text-gray-400">
                Já tem conta?
              </span>
            </div>
          </div>

          {/* Login link */}
          <Link
            href="/login"
            className="w-full block text-center px-4 py-3 border-2 border-[#5D3FD3] dark:border-[#A692FF] text-[#5D3FD3] dark:text-[#A692FF] font-semibold rounded-lg hover:bg-[#5D3FD3]/10 dark:hover:bg-[#A692FF]/10 transition-all duration-200"
          >
            Entrar
          </Link>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[#A692FF]/20 dark:border-[#A692FF]/30">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Ao cadastrar, você concorda com nossos{' '}
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