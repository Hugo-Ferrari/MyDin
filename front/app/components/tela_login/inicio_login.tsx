'use client'

import React from 'react'
import Link from 'next/link'
import BotaoLink from './botaoLink'

export default function CadastroLogin() {
  return (
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#1A2A4F]">
      {/* Left column: MyDin branding */}
      <aside className="hidden md:flex w-1/2 items-center justify-start pl-12 ">
        <div>
          <h1 className="text-7xl font-extrabold text-[#3A86FF] leading-tight">
            MonyFix
          </h1>
          <p className="mt-4 text-lg text-[#1A2A4F] max-w-md font-medium">
            Gerenciamento salarial inteligente e personalizado — controle suas finanças com clareza.
          </p>

          {/* Benefits list */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[#1A2A4F]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Cadastro rápido e seguro</span>
            </div>
            <div className="flex items-center gap-3 text-[#1A2A4F]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Acesso instantâneo ao seu dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-[#1A2A4F]">
              <div className="w-8 h-8 rounded-full bg-[#9D4EDD]/30 flex items-center justify-center">
                <span className="text-[#9D4EDD] font-bold">✓</span>
              </div>
              <span className="font-medium">Proteja seus dados com criptografia</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right column: Card com ações de entrada/cadastro */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#1A2A4F] rounded-2xl shadow-2xl p-8 border border-black/30 dark:border-black/50">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-[#3A86FF]/15 dark:bg-[#9D4EDD]/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-[#3A86FF] dark:text-black">
                Bem-vindo ao MonyFix
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[#1A2A4F] dark:text-[#3A86FF] mb-2">
              Gerencie seu salário
            </h2>
            <p className="text-sm text-gray-600 dark:text-black/70">
              Entre na sua conta ou crie uma nova para começar.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <BotaoLink
              href="/login"
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#1A5FD4] hover:from-[#1A5FD4] hover:to-[#3A86FF] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Entrar
            </BotaoLink>

            <BotaoLink
              href="/cadastro"
              className="w-full bg-[#9D4EDD] hover:bg-[#7D2EBD] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Criar Conta
            </BotaoLink>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/20 dark:border-black/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#1A2A4F] text-gray-600 dark:text-black/70">
                Ou use sua conta
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/ajuda" className="text-sm text-[#3A86FF] dark:text-black hover:text-[#1A5FD4] dark:hover:text-[#9D4EDD] font-medium underline transition-colors">
              Precisa de ajuda?
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-black/20 dark:border-black/30">
            <p className="text-xs text-center text-gray-500 dark:text-black/60">
              Ao continuar, você concorda com nossos{' '}
              <Link href="/termos" className="text-[#3A86FF] dark:text-black hover:underline font-medium">
                Termos de Serviço
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}