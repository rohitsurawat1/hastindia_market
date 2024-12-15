"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { user, signOut } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-[#FFF3DE] border-b border-[#DC9920]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-[#800000]">
            HastIndia
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for anything"
                className="w-64 pl-10 pr-10 bg-[#FFF3DE] border border-[#DC9920] rounded-full focus:outline-none focus:ring-2 focus:ring-[#037964]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#037964]">
                <Search />
              </Button>
            </form>

            <nav className="space-x-4">
              <Link
                href="/shop"
                className="text-[#800000] hover:text-[#DC9920] transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/artisan-spotlight"
                className="text-[#800000] hover:text-[#DC9920] transition-colors"
              >
                Artisan Spotlight
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/wishlist"
                className="text-[#800000] hover:text-[#DC9920] transition-colors relative"
              >
                <Heart className="h-6 w-6" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#037964] text-[#FFF3DE] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="text-[#800000] hover:text-[#DC9920] transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#037964] text-[#FFF3DE] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <User className="h-6 w-6 text-[#800000] hover:text-[#DC9920] transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => router.push("/profile")}>
                      Your Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/orders")}>
                      Your Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/wishlist")}>
                      Your Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={signOut}>
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/shop"
                  className="text-[#800000] hover:text-[#DC9920] transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/artisan-spotlight"
                  className="text-[#800000] hover:text-[#DC9920] transition-colors"
                >
                  Artisan Spotlight
                </Link>
                <Link
                  href="/wishlist"
                  className="text-[#800000] hover:text-[#DC9920] transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  href="/cart"
                  className="text-[#800000] hover:text-[#DC9920] transition-colors"
                >
                  Cart
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-[#800000] hover:text-[#DC9920] transition-colors"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="text-[#800000] hover:text-[#DC9920] transition-colors"
                    >
                      Your Orders
                    </Link>
                    <button
                      onClick={signOut}
                      className="text-[#800000] hover:text-[#DC9920] transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[#800000] hover:text-[#DC9920] transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="text-[#800000] hover:text-[#DC9920] transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
