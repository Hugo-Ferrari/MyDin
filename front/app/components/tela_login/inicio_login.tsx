// ...existing code...
'use client'

import React from 'react'
import Link from 'next/link'
import BotaoLink from './botaoLink'

export default function CadastroLogin() {
  return (
    <div className="min-h-screen flex bg-[#e9ecef]">
      {/* Left column: */}
      <aside className="hidden md:flex w-1/2 items-center">
        <div className="pl-18">
          <h1 className="text-7xl font-extrabold text-balck leading-tight ">MonyFix</h1>
          <p className="mt-3 text-lg text-black/40 max-w-md">
            Gestão financeira inteligente e personalizada — controle suas finanças com clareza.
          </p>
        </div>
      </aside>

      {/* Right column: */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg p-6">
          <div className="mb-6">
           
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bem-vindo</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Acesse sua conta ou crie uma nova.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <BotaoLink href="/login" className="w-full hover:text-white">
              Entrar
            </BotaoLink>

            <BotaoLink href="/cadastro" className="w-full bg-green-600 hover:bg-green-700 hover:text-white">
              Criar conta
            </BotaoLink>

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 ">
              <span>ou</span>
              <Link href="/ajuda" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline ">
                Precisa de ajuda?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
