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
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#1A2A4F]">
      {/* Left column: Branding / features */}
      <aside className="hidden md:flex w-1/2 items-center justify-start pl-12 bg-gradient-to-br from-[#1A2A4F] to-[#0f1929]">
        <div>
          <h1 className="text-7xl font-extrabold text-[#3A86FF] leading-tight">
            MonyFix
          </h1>
          <p className="mt-4 text-lg text-[#7EDCE2] max-w-md font-medium">
            Gerenciamento salarial inteligente e personalizado — controle suas finanças com clareza.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Cadastro rápido e seguro</span>
            </div>
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Acesso instantâneo ao seu dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-[#7EDCE2]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Proteja seus dados com criptografia</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right column: Cadastro form */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#1A2A4F] rounded-2xl shadow-2xl p-8 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/50">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-[#3A86FF]/15 dark:bg-[#9D4EDD]/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-[#3A86FF] dark:text-[#7EDCE2]">
                Novo usuário
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1A2A4F] dark:text-[#3A86FF] mb-2">
              Criar Conta
            </h1>
            <p className="text-sm text-gray-600 dark:text-[#7EDCE2]/70">
              Crie sua conta gratuita para começar a gerenciar seu salário
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/40 rounded-lg bg-white dark:bg-[#0f1929] text-[#1A2A4F] dark:text-white placeholder-gray-400 dark:placeholder-[#7EDCE2]/50 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] dark:focus:ring-[#7EDCE2] transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1A2A4F] dark:text-[#7EDCE2] mb-2">
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
                className="w-full px-4 py-2 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/40 rounded-lg bg-white dark:bg-[#0f1929] text-[#1A2A4F] dark:text-white placeholder-gray-400 dark:placeholder-[#7EDCE2]/50 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] dark:focus:ring-[#7EDCE2] transition-all"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-[#1A2A4F] dark:text-[#7EDCE2] mb-2">
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
                className="w-full px-4 py-2 border border-[#7EDCE2]/30 dark:border-[#7EDCE2]/40 rounded-lg bg-white dark:bg-[#0f1929] text-[#1A2A4F] dark:text-white placeholder-gray-400 dark:placeholder-[#7EDCE2]/50 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] dark:focus:ring-[#7EDCE2] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#1A5FD4] hover:from-[#1A5FD4] hover:to-[#3A86FF] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#7EDCE2]/20 dark:border-[#7EDCE2]/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#1A2A4F] text-gray-600 dark:text-[#7EDCE2]/70">
                Já tem conta?
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full block text-center px-4 py-3 border-2 border-[#3A86FF] dark:border-[#7EDCE2] text-[#3A86FF] dark:text-[#7EDCE2] font-semibold rounded-lg hover:bg-[#3A86FF]/10 dark:hover:bg-[#7EDCE2]/10 transition-all duration-200"
          >
            Entrar
          </Link>

          <div className="mt-6 pt-6 border-t border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30">
            <p className="text-xs text-center text-gray-500 dark:text-[#7EDCE2]/60">
              Ao cadastrar, você concorda com nossos{' '}
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