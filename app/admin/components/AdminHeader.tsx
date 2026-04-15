"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, LayoutDashboard, User, Users } from "lucide-react"
import type { ReactNode } from "react"

const NAV = [
  { href: "/admin/waitlist", label: "Waitlist", icon: User },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
]

interface AdminHeaderProps {
  actions?: ReactNode
}

export function AdminHeader({ actions }: AdminHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#050d1a]/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand + Nav */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2178C7]/20 flex items-center justify-center">
              <LayoutDashboard size={13} className="text-[#53C5E6]" />
            </div>
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Admin</span>
          </div>

          <div className="h-4 w-px bg-white/[0.08]" />

          <nav className="flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    active
                      ? "bg-[#2178C7]/15 text-[#53C5E6] border-[#2178C7]/25"
                      : "text-white/40 hover:text-white hover:bg-white/[0.06] border-transparent"
                  }`}
                >
                  <Icon size={12} />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right-side actions */}
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
