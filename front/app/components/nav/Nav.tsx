'use client'

import { BellIcon, UserRoundIcon, MoonIcon, LogOutIcon } from "lucide-react"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

function Nav() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-20 top-0 left-0 shadow-lg bg-gradient-to-r from-[#579ac3] to-[#7aff66] backdrop-blur-sm">
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
                aria-label="Alternar modo noturno"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/20 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <MoonIcon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
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
                    <div className="text-sm font-semibold text-gray-900">Hugo Ferrari</div>
                    <div className="text-xs text-gray-500">usuario@example.com</div>
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