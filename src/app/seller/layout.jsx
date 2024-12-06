'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, ShoppingCart, BarChart, Settings, DollarSign } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/seller/dashboard' },
  { icon: Package, label: 'Products', href: '/seller/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/seller/orders' },
  { icon: BarChart, label: 'Analytics', href: '/seller/analytics' },
  { icon: DollarSign, label: 'Earnings', href: '/seller/earnings' },
  { icon: Settings, label: 'Settings', href: '/seller/settings' },
]

export default function SellerLayout({ children }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'seller') {
      router.push('/');
    }
  }, [user, router])

  if (!user || user.role !== 'seller') {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-orange-600">HastIndia Seller</h2>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 ${
                pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}

