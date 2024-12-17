"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";

const categories = ["All", "Jewelry", "Home Decor", "Textiles", "Art"];

const products = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    price: 15999,
    rating: 4.8,
    reviews: 245,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
    badge: "Top Rated",
  },
  {
    id: 2,
    name: "Brass Dhokra Figurine",
    price: 2999,
    rating: 4.7,
    reviews: 189,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Madhubani Painting",
    price: 4999,
    rating: 4.9,
    reviews: 312,
    category: "Art",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    badge: "Featured",
  },
  // Add more products as needed
];

export default function BestSellers() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3"
          alt="Best Sellers"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Badge className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Most Popular
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Best Selling Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our most loved handcrafted treasures
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="All"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="mb-8"
          >
            <TabsList className="flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative h-64">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <Badge className="absolute top-4 left-4">
                        {product.badge}
                      </Badge>
                      <div className="absolute top-4 right-4 space-x-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <Button>Add to Cart</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
