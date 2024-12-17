"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Tag, Timer } from "lucide-react";

const categories = ["All", "Jewelry", "Home Decor", "Textiles", "Art"];

const saleProducts = [
  {
    id: 1,
    name: "Traditional Silk Scarf",
    originalPrice: 4999,
    salePrice: 2999,
    category: "Textiles",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
    badge: "Limited Time",
    endDate: "2024-03-31",
  },
  {
    id: 2,
    name: "Handcrafted Wall Decor",
    originalPrice: 7999,
    salePrice: 5999,
    category: "Home Decor",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    badge: "Clearance",
    endDate: "2024-03-25",
  },
  {
    id: 3,
    name: "Silver Filigree Earrings",
    originalPrice: 3999,
    salePrice: 2499,
    category: "Jewelry",
    discount: "37% OFF",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    badge: "Best Deal",
    endDate: "2024-03-28",
  },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? saleProducts
      : saleProducts.filter((product) => product.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const calculateTimeLeft = (endDate) => {
    const difference = +new Date(endDate) - +new Date();
    return difference > 0
      ? `${Math.floor(difference / (1000 * 60 * 60 * 24))} days left`
      : "Offer ended";
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
          alt="Sale"
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
              <Tag className="w-4 h-4 mr-2" />
              Special Offers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Seasonal Sale
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Up to 40% off on selected handcrafted items
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Sale Timer */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary text-primary-foreground py-4 text-center"
      >
        <Timer className="w-5 h-5 inline mr-2" />
        <span className="font-semibold">Limited Time Sale! Ends Soon</span>
      </motion.div>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="All"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <TabsList className="flex justify-center gap-4">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      <Badge
                        variant="destructive"
                        className="absolute top-4 left-4"
                      >
                        {product.discount}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="absolute top-4 right-4"
                      >
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="text-lg font-bold text-primary">
                          ₹{product.salePrice.toLocaleString()}
                        </span>
                        <span className="line-through text-sm text-muted-foreground">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground mt-2">
                        <Timer className="w-4 h-4 inline mr-1" />
                        {calculateTimeLeft(product.endDate)}
                      </span>
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
