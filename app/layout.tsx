import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CrediKlub · Microcréditos que construyen futuro',
  description: 'Microcréditos y pools comunitarios sobre Stellar para la nueva generación financiera de México.',
  generator: 'v0.app',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f1e8',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
