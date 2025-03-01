"use client"

import { useState } from "react"
import { Button } from "@/components/common/button"
import { LogIn, LogOut, User, Settings } from "lucide-react"
import { AuthModal } from "@/components/common/AuthModal"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext" // Use context instead of service
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { useToast } from "@/components/common/use-toast"

export function AuthButton() {
  const [showModal, setShowModal] = useState(false)
  const { user, isAuthenticated, isLoading, logout } = useAuth() // Use auth context
  const { toast } = useToast()

  const handleAuthSuccess = () => {
    // This will be handled by the context now
    setShowModal(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="opacity-50">
        Loading...
      </Button>
    )
  }

  return (
    <>
      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user?.name || "User"}</span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg"
          >
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </Button>
        </motion.div>
      )}
      <AuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />
    </>
  )
}