import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'
import RootProvider from '@/components/root-provider'
import Footer from '@/components/footer'

const bolota = localFont({ src: '../../public/bolota-bold.ttf', variable: '--font-bolota' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Minard Movie Web',
  description: 'A movie browsing website made by Minard Parilla where you can watch movies and tv shows',
}

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('dark h-full font-sans antialiased', inter.variable, bolota.variable)} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="flex min-h-full flex-col">
        <RootProvider>
          <Navbar />
          <main className="mx-auto w-full px-2 py-2 sm:px-4 lg:max-w-400 lg:px-6">{children}</main>
          <Footer />

          {modal}
        </RootProvider>
      </body>
    </html>
  )
}
