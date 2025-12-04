// ...existing code...
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
    const width = open ? "18rem" : "5rem" // 18rem = w-72, 5rem = w-20
    try {
      document.documentElement.style.setProperty("--sidebar-width", width)
    } catch {
      // ignore in non-browser env
    }
  }, [open])

  return (
    <aside
      aria-label="Navegação lateral"
      className={`fixed top-20 left-0 z-40 h-[calc(100vh-5rem)] bg-white text-black shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out overflow-hidden ${
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
            className="flex items-center justify-center w-10 h-10 text-black transition-transform hover:scale-105"
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
                  className={`group flex items-center h-10 px-3 rounded-lg transition-colors duration-200 ${
                    active ? "bg-blue-50 text-blue-600 font-semibold" : "hover:bg-[rgba(21,97,183,0.06)] hover:text-blue-600"
                  } ${open ? "gap-3 justify-start" : "justify-center"}`}
                >
                  <span className="flex items-center justify-center w-8 flex-shrink-0">
                    <Icon size={18} className={`${active ? "text-blue-600" : "text-gray-600"} transition-colors duration-200 block`} />
                  </span>

                  <span
                    className={`inline-block text-base truncate transition-all duration-300 ease-in-out transform ${
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

      {/* footer simplificado com progresso demonstrativo */}
      {open && (
        <div className="flex-shrink-0 px-4 py-4 border-t">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            <div>
              <div className="text-sm font-medium">Missões Semanais</div>
              <div className="text-xs text-gray-500">Progresso atual: 75%</div>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Responda 3 dúvidas</span>
                <span className="text-sm font-medium">2 / 3</span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-blue-500 rounded" style={{ width: "66%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Responda 5 dúvidas</span>
                <span className="text-sm font-medium">5 / 5</span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-blue-500 rounded" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
// ...existing code...