"use client"

import { useState } from "react"
import { Button } from "@/components/common/button"
import { LogIn } from "lucide-react"
import { AuthModal } from "@/components/common/AuthModal"
import { motion } from "framer-motion"

export function AuthButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
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
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}