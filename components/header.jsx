"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Menu, X, User, Settings, Package, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CartSheet from "@/components/cart-sheet"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/men?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              SneakPeak
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/men" className="text-foreground hover:text-primary transition-colors">
              Men
            </a>
            <a href="/women" className="text-foreground hover:text-primary transition-colors">
              Women
            </a>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search sneakers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/cart")}>
                  <Package className="h-4 w-4 mr-2" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <CartSheet />

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search sneakers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-muted border-0"
                  />
                </div>
              </form>
              <a href="/men" className="block px-3 py-2 text-foreground hover:text-primary">
                Men
              </a>
              <a href="/women" className="block px-3 py-2 text-foreground hover:text-primary">
                Women
              </a>
              <a href="/cart" className="block px-3 py-2 text-foreground hover:text-primary">
                My Orders
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
