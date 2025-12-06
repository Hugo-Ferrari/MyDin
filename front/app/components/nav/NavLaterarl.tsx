"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PanelLeft, Home, Target, Zap, Settings, Trophy } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

type NavItem = {
  href: string
  label: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

const navItems: NavItem[] = [
  { href: "/menu", label: "Início", Icon: Home },
  { href: "/metas", label: "Metas", Icon: Target },
  { href: "/assistenteIA", label: "Assistente IA", Icon: Zap },
  { href: "/configuracoes", label: "Configurações", Icon: Settings },
]

export function NavLateral() {
  const [open, setOpen] = useState(true)
  const pathname = usePathname() || "/"

  const toggle = () => setOpen((v) => !v)

  useEffect(() => {
    const width = open ? "18rem" : "5rem"
    try {
      document.documentElement.style.setProperty("--sidebar-width", width)
    } catch {
      // ignore in non-browser env
    }
  }, [open])

  return (
    <aside
      aria-label="Navegação lateral"
      className={`fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-[#5D3FD3] via-[#A692FF] to-[#5D3FD3] dark:from-[#101010] dark:via-[#5D3FD3]/30 dark:to-[#101010] backdrop-blur-sm text-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${
        open ? "w-72" : "w-20"
      }`}
    >
      <div className="px-2 pt-3">
        <div className={`flex items-center ${open ? "justify-end" : "justify-center"} duration-300 ease-in-out`}>
          <Button
            onClick={toggle}
            variant="ghost"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/20 transition-transform hover:scale-105 focus:ring-2 focus:ring-[#F1C40F]/30"
          >
            <PanelLeft
              className={`transform transition-transform duration-300 ease-in-out ${open ? "rotate-0" : "rotate-180"}`}
              size={20}
            />
          </Button>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-4 overflow-auto">
        <ul className="flex flex-col gap-2">
          {navItems.map(({ href, label, Icon }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group flex items-center h-10 px-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-[#F1C40F] text-[#5D3FD3] font-semibold shadow-lg"
                      : "text-white hover:bg-white/20 dark:hover:bg-[#A692FF]/30"
                  } ${open ? "gap-3 justify-start" : "justify-center"}`}
                >
                  <span className="flex items-center justify-center w-8 flex-shrink-0">
                    <Icon size={18} className="transition-colors duration-200 block" />
                  </span>

                  <span
                    className={`inline-block text-base font-medium truncate transition-all duration-300 ease-in-out transform ${
                      open ? "opacity-100 max-w-[160px] ml-2 translate-x-0" : "opacity-0 max-w-0 -translate-x-2 overflow-hidden"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer com progresso/dicas */}
      {open && (
        <div className="flex-shrink-0 px-4 py-4 border-t border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="text-[#F1C40F]" size={18} />
            <div>
              <div className="text-sm font-semibold text-white">Progressos</div>
              <div className="text-xs text-white/70">Metas do mês</div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Receitas registradas</span>
                <span className="font-bold">4 / 5</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-2 bg-[#F1C40F] rounded-full transition-all" style={{ width: "80%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Metas financeiras</span>
                <span className="font-bold">2 / 3</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-2 bg-[#A692FF] rounded-full transition-all" style={{ width: "66%" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}