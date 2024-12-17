"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Heart, ShoppingCart } from "lucide-react";

const occasions = [
  "All Occasions",
  "Wedding",
  "Birthday",
  "Anniversary",
  "Housewarming",
  "Corporate",
];

const giftIdeas = [
  {
    id: 1,
    name: "Traditional Jewelry Box",
    price: 4999,
    occasion: "Wedding",
    description: "Hand-painted wooden jewelry box with intricate designs",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
    badge: "Popular Gift",
  },
  {
    id: 2,
    name: "Handwoven Wall Art",
    price: 3499,
    occasion: "Housewarming",
    description: "Beautiful wall hanging made from natural fibers",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Brass Decor Set",
    price: 6999,
    occasion: "Anniversary",
    description: "Set of 3 decorative brass items with traditional motifs",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    badge: "Premium",
  },
  // Add more gift ideas as needed
];

export default function GiftIdeas() {
  const [selectedOccasion, setSelectedOccasion] = useState("All Occasions");

  const filteredGifts =
    selectedOccasion === "All Occasions"
      ? giftIdeas
      : giftIdeas.filter((gift) => gift.occasion === selectedOccasion);

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
          alt="Gift Ideas"
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
              <Gift className="w-4 h-4 mr-2" />
              Perfect Gifts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Thoughtful Gift Ideas
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover unique handcrafted gifts for every occasion
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Gift Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="All Occasions"
            value={selectedOccasion}
            onValueChange={setSelectedOccasion}
            className="mb-8"
          >
            <TabsList className="flex flex-wrap justify-center">
              {occasions.map((occasion) => (
                <TabsTrigger key={occasion} value={occasion}>
                  {occasion}
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
            {filteredGifts.map((gift) => (
              <motion.div
                key={gift.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative h-64">
                        <Image
                          src={gift.image}
                          alt={gift.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <Badge className="absolute top-4 left-4">
                        {gift.badge}
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
                        {gift.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {gift.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ₹{gift.price.toLocaleString()}
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

      {/* Gift Guide Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Need Help Choosing?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Our gift experts are here to help you find the perfect
                handcrafted gift
              </p>
              <Button>Contact Gift Expert</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
