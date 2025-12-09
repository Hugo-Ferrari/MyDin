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
      className={`fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-[#1A2A4F] via-[#3A86FF] to-[#1A2A4F] dark:from-[#1A2A4F] dark:via-[#3A86FF]/20 dark:to-[#1A2A4F] backdrop-blur-sm text-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${
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
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-[#7EDCE2]/20 transition-all hover:scale-105 focus:ring-2 focus:ring-[#7EDCE2]/40"
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
                      ? "bg-[#3A86FF] text-white font-semibold shadow-lg border-l-4 border-[#9D4EDD]"
                      : "text-white hover:bg-[#7EDCE2]/15 dark:hover:bg-[#7EDCE2]/20"
                  } ${open ? "gap-3 justify-start" : "justify-center"}`}
                >
                  <span className="flex items-center justify-center w-8 flex-shrink-0">
                    <Icon size={18} className={`transition-colors duration-200 block ${active ? "text-[#7EDCE2]" : "text-white"}`} />
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
        <div className="px-5 py-8 border-t border-[#7EDCE2]/20">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-[#9D4EDD]" size={18} />
            <div>
              <div className="text-sm font-semibold text-white">Progressos</div>
              <div className="text-xs text-[#7EDCE2]/70">Metas do mês</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#7EDCE2] mb-1">
                <span>Receitas registradas</span>
                <span className="font-bold">4 / 5</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#3A86FF] to-[#7EDCE2] rounded-full transition-all" style={{ width: "80%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#7EDCE2] mb-1">
                <span>Metas financeiras</span>
                <span className="font-bold">2 / 3</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] rounded-full transition-all" style={{ width: "66%" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}