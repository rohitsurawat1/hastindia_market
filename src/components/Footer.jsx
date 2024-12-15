import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A3A4F] text-[#FFF3DE]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#DC9920]">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/gift-ideas" className="hover:text-[#037964]">
                  Gift Ideas
                </Link>
              </li>
              <li>
                <Link href="/shop/new-arrivals" className="hover:text-[#037964]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop/best-sellers" className="hover:text-[#037964]">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop/sale" className="hover:text-[#037964]">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#DC9920]">Sell</h3>
            <ul className="space-y-2">
            <li>
                <Link href="/seller/dashboard" className="hover:text-[#037964]">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sell/seller-handbook" className="hover:text-[#037964]">
                  Seller Handbook
                </Link>
              </li>
              <li>
                <Link href="/sell/seller-forum" className="hover:text-[#037964]">
                  Seller Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#DC9920]">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#037964]">
                  About HastIndia
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#037964]">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-[#037964]">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#037964]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-[#037964]">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#DC9920]">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-[#037964]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#037964]">
                  Privacy Settings
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@hastindia.com"
                  className="hover:text-[#037964]"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-[#8B4513] flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#037964] transition-transform transform hover:scale-110"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#037964] transition-transform transform hover:scale-110"
            >
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#037964] transition-transform transform hover:scale-110"
            >
              <FaPinterestP className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#037964] transition-transform transform hover:scale-110"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-4 md:mt-0 text-center text-[#8B4513]">
            © {new Date().getFullYear()} HastIndia Marketplace. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
