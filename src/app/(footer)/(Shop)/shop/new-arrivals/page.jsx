"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";

const categories = ["All", "Jewelry", "Home Decor", "Textiles", "Art"];

const newArrivals = [
  {
    id: 1,
    name: "Contemporary Madhubani Art",
    price: 7999,
    category: "Art",
    dateAdded: "2024-03-15",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    badge: "Just Arrived",
  },
  {
    id: 2,
    name: "Handwoven Pashmina Shawl",
    price: 12999,
    category: "Textiles",
    dateAdded: "2024-03-14",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
    badge: "Limited Edition",
  },
  {
    id: 3,
    name: "Modern Brass Decor",
    price: 4999,
    category: "Home Decor",
    dateAdded: "2024-03-13",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    badge: "New Design",
  },
  // Add more products as needed
];

export default function NewArrivals() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? newArrivals
      : newArrivals.filter((product) => product.category === selectedCategory);

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
          src="https://images.unsplash.com/photo-1604684768394-52a862c2955a"
          alt="New Arrivals"
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
              <Sparkles className="w-4 h-4 mr-2" />
              Latest Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              New Arrivals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our latest handcrafted treasures
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
                      <p className="text-sm text-muted-foreground mb-2">
                        Added on{" "}
                        {new Date(product.dateAdded).toLocaleDateString()}
                      </p>
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

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Be the first to know about our new arrivals and exclusive
                  offers
                </p>
                <Button size="lg">Subscribe to Updates</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
