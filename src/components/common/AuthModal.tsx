"use client"

import { useState, FormEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Label } from "@/components/common/label"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { SiDiscord } from "react-icons/si"
import { BsTwitterX } from "react-icons/bs" // Using BsTwitterX for X logo
import { motion } from "framer-motion"
import { useToast } from "@/components/common/use-toast"
import { useAuth } from "@/contexts/AuthContext" // Use the auth context instead of service directly

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { login, register, initiateOAuthLogin } = useAuth() // Use the auth context

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(loginForm)
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "default",
      })
      if (onAuthSuccess) onAuthSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await register(registerForm)
      toast({
        title: "Registration successful",
        description: "Your account has been created",
        variant: "default",
      })
      if (onAuthSuccess) onAuthSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please check your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderLogin = (provider: string) => {
    setIsLoading(true)
    // We don't need to set isLoading to false because we're redirecting
    initiateOAuthLogin(provider)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-xl border-none bg-gradient-to-br from-background to-background/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {activeTab === "login" ? "Welcome Back!" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2 p-1 bg-background/20 rounded-lg">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground/80">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground/80">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-foreground/80">
                  Name
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-foreground/80">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-foreground/80">
                  Password
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { provider: "Google", icon: <FcGoogle className="h-5 w-5" />, color: "#4285F4" },
              { provider: "GitHub", icon: <AiFillGithub className="h-5 w-5" />, color: "#333" },
              { provider: "Discord", icon: <SiDiscord className="h-5 w-5 text-[#5865F2]" />, color: "#5865F2" },
              { provider: "X", icon: <BsTwitterX className="h-5 w-5" />, color: "#000000" },
            ].map(({ provider, icon, color }) => (
              <motion.div
                key={provider}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={() => handleProviderLogin(provider)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-lg border-border/50 hover:bg-background/20 transition-all"
                  style={{ borderColor: color }}
                >
                  {icon}
                  <span style={{ color }}>{provider}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}