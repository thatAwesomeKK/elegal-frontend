import Header from '@/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from './(Providers)/AuthProvider'
import ToastProviders from './(Providers)/ToastProvider'
import { Mooli } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const mooli = Mooli({ subsets: ['latin', 'latin-ext'], weight: ['400'], preload: true })

export const metadata: Metadata = {
  title: 'E-Legal',
  description: 'Centralized place for Legal Services',
}

export default function RootLayout({
  children,
  contactModal
}: {
  children: React.ReactNode
  contactModal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mooli.className}>
        <AuthProvider>
          <ToastProviders>
            <Header />
            {children}
            {contactModal}
          </ToastProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
