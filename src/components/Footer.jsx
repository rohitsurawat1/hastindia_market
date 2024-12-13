import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop/gift-ideas" className="text-gray-600 hover:text-orange-600">Gift Ideas</Link></li>
              <li><Link href="/shop/new-arrivals" className="text-gray-600 hover:text-orange-600">New Arrivals</Link></li>
              <li><Link href="/shop/best-sellers" className="text-gray-600 hover:text-orange-600">Best Sellers</Link></li>
              <li><Link href="/shop/sale" className="text-gray-600 hover:text-orange-600">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sell</h3>
            <ul className="space-y-2">
              <li><Link href="/sell/start-selling" className="text-gray-600 hover:text-orange-600">Start Selling</Link></li>
              <li><Link href="/sell/seller-handbook" className="text-gray-600 hover:text-orange-600">Seller Handbook</Link></li>
              <li><Link href="/sell/seller-forum" className="text-gray-600 hover:text-orange-600">Seller Forum</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-orange-600">About HastIndia</Link></li>
              <li><Link href="/policies" className="text-gray-600 hover:text-orange-600">Policies</Link></li>
              <li><Link href="/investors" className="text-gray-600 hover:text-orange-600">Investors</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-orange-600">Careers</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:text-orange-600">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-orange-600">Help Center</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-orange-600">Privacy Settings</Link></li>
              <li>
                <a href="mailto:contact@hastindia.com" className="text-gray-600 hover:text-orange-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} HastIndia Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

