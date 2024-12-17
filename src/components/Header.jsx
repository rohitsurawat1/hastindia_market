"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ShoppingCart, User, Heart, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user, signOut } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const totalWishlistItems = useMemo(() => wishlist.length, [wishlist]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const NAV_LINKS = [
    { href: "/shop", label: "Shop" },
    { href: "/artisan-spotlight", label: "Artisan Spotlight" },
    ...(user?.role === "seller"
      ? [{ href: "/seller/dashboard", label: "Seller Dashboard" }]
      : []),
  ];

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary whitespace-nowrap"
          >
            HastIndia
          </Link>

          {/* Center: Search Bar (Optimized for iPad) */}
          <div className="hidden md:flex md:flex-1 lg:w-1/3 justify-center">
            <SearchBar />
          </div>

          {/* Right: Navigation and Icons */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-gray-600 hover:text-primary"
                aria-label="Wishlist"
              >
                <Heart className="h-6 w-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-primary"
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalCartItems}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-0">
                      <User className="h-6 w-6 text-gray-600 hover:text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => router.push("/profile")}>
                      Your Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/orders")}>
                      Your Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-4">
                <SearchBar />

                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {user ? (
                  <div className="flex flex-col gap-2">
                    <Link href="/profile" className="hover:text-primary">
                      Your Profile
                    </Link>
                    <Link href="/orders" className="hover:text-primary">
                      Your Orders
                    </Link>
                    <button
                      onClick={signOut}
                      className="text-left text-red-500 hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="hover:text-primary">
                      Sign In
                    </Link>
                    <Link href="/register" className="hover:text-primary">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
