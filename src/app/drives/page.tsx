import { Metadata } from 'next'
import DrivesPage from "@/components/layout/drives/DrivesPage"

export const metadata: Metadata = {
  title: 'Drives - TheDevBucket',
  description: 'Explore our latest articles about web development, coding, and technology.',
}

export default function Page() {
  return <DrivesPage />
}