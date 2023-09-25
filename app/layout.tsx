import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quellix AI app',
  description: 'AI platform specifically designed to generate Image, video ,code , and text resume based on user prompt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
     <html lang="en">
       <body className={inter.className}>
          <ModalProvider/>
        {children}
        </body>
     </html>
    </ClerkProvider>
  )
}
