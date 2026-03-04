"use client"

import { useState } from "react"
import { Search, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CartSheet from "@/components/cart-sheet"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">SneakPeak</h1>
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
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search sneakers..."
                className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
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
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input type="search" placeholder="Search sneakers..." className="pl-10 bg-muted border-0" />
                </div>
              </div>
              <a href="/men" className="block px-3 py-2 text-foreground hover:text-primary">
                Men
              </a>
              <a href="/women" className="block px-3 py-2 text-foreground hover:text-primary">
                Women
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Account
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
