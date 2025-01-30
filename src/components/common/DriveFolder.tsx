import { FolderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DriveFolderProps {
  name: string
  className?: string
  size?: "sm" | "md" | "lg"
  count?: number
}

export function DriveFolder({ name, className = "", size = "md", count }: DriveFolderProps) {
  const sizes = {
    sm: "w-40",
    md: "w-48",
    lg: "w-56",
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-3 bg-white/95 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-300",
        "border border-gray-200/50 shadow-sm hover:shadow-md",
        sizes[size],
        className,
      )}
    >
      <FolderIcon className="w-5 h-5 text-blue-600 shrink-0 transition-transform group-hover:scale-110" />
      <span className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-600">{name}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-500 group-hover:text-blue-500 ml-auto">{count.toLocaleString()}</span>
      )}
    </div>
  )
}

