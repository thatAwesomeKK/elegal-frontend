import Header from '@/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from './(Providers)/AuthProvider'
import ToastProviders from './(Providers)/ToastProvider'

export const metadata: Metadata = {
  title: 'E-Legal',
  description: 'Centralized place for Legal Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProviders>
            <Header />
            {children}
          </ToastProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
