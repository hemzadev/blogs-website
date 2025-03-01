"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Label } from "@/components/common/label"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { SiDiscord, SiReddit } from "react-icons/si"
import { motion } from "framer-motion"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleProviderLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false)
      alert(`Logged in with ${provider}`)
    }, 2000)
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg"
              >
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg"
              >
                Register
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
              { provider: "Reddit", icon: <SiReddit className="h-5 w-5 text-[#FF4500]" />, color: "#FF4500" },
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