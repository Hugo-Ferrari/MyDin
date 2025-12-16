'use client'

import { BellIcon, UserRoundIcon, MoonIcon, LogOutIcon, SunIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function Nav() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme")
      if (stored === "dark") {
        document.documentElement.classList.add("dark")
        setIsDark(true)
      } else if (stored === "light") {
        document.documentElement.classList.remove("dark")
        setIsDark(false)
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          document.documentElement.classList.add('dark')
          setIsDark(true)
        } else {
          document.documentElement.classList.remove('dark')
          setIsDark(false)
        }
      }
    } catch {
      // ambiente sem browser ou localStorage desabilitado
    }
  }, [])

  const toggleDark = () => {
    const next = !isDark
    setIsDark(next)
    try {
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    } catch {
      // ignore
    }
  }

  return (
    <nav className="fixed w-full z-20 top-0 left-0 shadow-lg bg-gradient-to-r from-[#1A2A4F] via-[#3A86FF] to-[#1A2A4F] dark:from-[#1A2A4F] dark:via-[#1A2A4F]/95 dark:to-[#1A2A4F] backdrop-blur-sm text-white-shadow-lg flex flex-col">
      <div className="flex items-center justify-between h-20 mx-6 md:mx-10 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group hover:opacity-80 transition-opacity">
          <div className="text-white font-bold text-xl md:text-2xl tracking-tight">
            MonyFix
          </div>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          <ul className="flex items-center p-0 m-0 list-none gap-1 md:gap-2">
            {/* Notificações */}
            <li className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notificações"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-[#7EDCE2]/20 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#7EDCE2]/30"
              >
                <div className="relative">
                  <BellIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#9D4EDD] rounded-full animate-pulse" />
                </div>
              </button>

              {/* Dropdown Notificações */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1A2A4F] rounded-lg shadow-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 border border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30">
                  <div className="text-sm font-semibold text-[#1A2A4F] dark:text-[#3A86FF]">Notificações</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-[#F8F9FC] dark:bg-[#3A86FF]/10 rounded border-l-4 border-[#7EDCE2] text-sm text-[#1A2A4F] dark:text-[#7EDCE2]">
                      Sua meta de economia foi atingida! 🎉
                    </div>
                    <div className="p-2 bg-[#F8F9FC] dark:bg-[#9D4EDD]/10 rounded border-l-4 border-[#9D4EDD] text-sm text-[#1A2A4F] dark:text-[#7EDCE2]">
                      Despesa acima do orçamento detectada.
                    </div>
                  </div>
                  <button className="w-full text-xs text-[#3A86FF] hover:text-[#1A5FD4] dark:text-[#7EDCE2] dark:hover:text-[#9D4EDD] font-medium py-1 transition-colors">
                    Ver todas
                  </button>
                </div>
              )}
            </li>

            {/* Modo Noturno */}
            <li>
              <button
                onClick={toggleDark}
                aria-label={isDark ? "Desativar modo escuro" : "Ativar modo escuro"}
                aria-pressed={isDark}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-[#7EDCE2]/20 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#7EDCE2]/30"
              >
                {isDark ? <SunIcon className="h-5 w-5 md:h-6 md:w-6 text-[#9D4EDD]" strokeWidth={1.5} /> : <MoonIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />}
              </button>
            </li>

            {/* Usuário + Menu */}
            <li className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 md:gap-3 h-10 px-2 md:px-3 rounded-lg hover:bg-[#7EDCE2]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7EDCE2]/30"
              >
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#7EDCE2]/20 border border-[#7EDCE2]/40">
                  <UserRoundIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <div className="hidden md:flex flex-col leading-tight text-white/95 text-left">
                  <span className="text-sm font-medium">Hugo Ferrari</span>
                  <span className="text-xs opacity-75">Online</span>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A2A4F] rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 border border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30">
                  <div className="px-4 py-3 border-b bg-[#F8F9FC] dark:bg-[#3A86FF]/10 border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30">
                    <h1 className="text-sm font-semibold text-[#1A2A4F] dark:text-[#3A86FF]">Hugo Ferrari</h1>
                    <h1 className="text-xs text-gray-600 dark:text-[#7EDCE2]/80">usuario@example.com</h1>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link
                      href="/configuracoes"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-[#1A2A4F] dark:text-[#7EDCE2] hover:bg-[#F8F9FC] dark:hover:bg-[#3A86FF]/10 hover:text-[#3A86FF] dark:hover:text-[#9D4EDD] rounded transition-colors"
                    >
                      ⚙️ Configurações
                    </Link>
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-[#1A2A4F] dark:text-[#7EDCE2] hover:bg-[#F8F9FC] dark:hover:bg-[#3A86FF]/10 hover:text-[#3A86FF] dark:hover:text-[#9D4EDD] rounded transition-colors"
                    >
                      👤 Perfil
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token')
                      window.location.href = '/'
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-[#7EDCE2]/20 dark:border-[#7EDCE2]/30 transition-colors font-medium"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav