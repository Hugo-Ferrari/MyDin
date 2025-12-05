'use client'

import { BellIcon, UserRoundIcon, MoonIcon, LogOutIcon, SunIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

function Nav() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [ isDark, setIsDark] = useState(false)

  useEffect(()=>{
    try{
      const stored = localStorage.getItem("theme")
      if(stored === "dark"){
        document.documentElement.classList.add("dark")
        setIsDark(true)
      }
      else if(stored === "light"){
        document.documentElement.classList.remove("dark")
        setIsDark(false)
      }
      else {
        const prefersDark =window.matchMedia &&window.matchMedia('(prefers-color-scheme: dark)').matches
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
    <nav className="fixed w-full z-20 top-0 left-0 shadow-lg bg-gradient-to-r from-[#fa3b3b]  to-[#f3fb53] backdrop-blur-sm">
      <div className="flex items-center justify-between h-20 mx-6 md:mx-10 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group hover:opacity-80 transition-opacity">
          <div className="text-white font-bold text-xl md:text-2xl tracking-tight">
            MyDin
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
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/20 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <div className="relative">
                  <BellIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </div>
              </button>

              {/* Dropdown Notificações */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="text-sm font-semibold text-gray-900">Notificações</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-500 text-sm text-gray-700">
                      Sua meta de economia foi atingida!  {/*tenho que integrar com as notifiçãoe que terá no back*/}
                    </div>
                    <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-500 text-sm text-gray-700">
                      Despesa acima do orçamento detectada. {/* exmeplos de notificação */}
                    </div>
                  </div>
                  <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium py-1">
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
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/20 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {isDark ? <SunIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} /> : <MoonIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />}
              </button>
            </li>

            {/* Usuário + Menu */}
            <li className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 md:gap-3 h-10 px-2 md:px-3 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 border border-white/30">
                  <UserRoundIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <div className="hidden md:flex flex-col leading-tight text-white/95 text-left">
                  <span className="text-sm font-medium">Hugo Ferrari</span>
                  <span className="text-xs opacity-75">Online</span>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <h1 className="text-sm font-semibold text-gray-900">Hugo Ferrari</h1>
                    <h1 className="text-xs text-gray-500">usuario@example.com</h1>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link
                      href="/configuracoes"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                    >
                      ⚙️ Configurações
                    </Link>
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                    >
                      👤 Perfil
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token')
                      window.location.href = '/'
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t transition-colors font-medium"
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