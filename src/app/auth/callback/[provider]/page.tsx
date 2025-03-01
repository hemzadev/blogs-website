// src/app/auth/callback/[provider]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import authService from "@/services/authService"
import { useToast } from "@/components/common/use-toast"

export default function AuthCallback() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const provider = params.provider as string
        const code = searchParams.get("code")
        
        if (!code) {
          throw new Error("No authorization code received")
        }
        
        await authService.handleOAuthCallback(provider, code)
        
        toast({
          title: "Authentication successful",
          description: `You have successfully logged in with ${provider}`,
          variant: "default",
        })
        
        // Redirect to home page or last visited page
        router.push("/")
      } catch (err: any) {
        console.error("OAuth callback error:", err)
        setError(err.message || "Authentication failed")
        
        toast({
          title: "Authentication failed",
          description: err.message || "There was an error during authentication",
          variant: "destructive",
        })
        
        // Redirect to home after showing error
        setTimeout(() => router.push("/"), 3000)
      }
    }

    handleCallback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-500">Authentication Failed</h1>
            <p className="mt-2">{error}</p>
            <p className="mt-4">Redirecting you back to the home page...</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Completing Authentication</h1>
            <p className="mt-2">Please wait while we complete your login...</p>
            <div className="mt-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}