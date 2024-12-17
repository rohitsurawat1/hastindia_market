"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, TrendingUp, Package, Download } from "lucide-react";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    topics: [
      "Creating your seller account",
      "Setting up your shop profile",
      "Product photography guidelines",
      "Writing effective descriptions",
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices",
    icon: Star,
    topics: [
      "Pricing strategies",
      "Customer service excellence",
      "Order fulfillment tips",
      "Managing inventory",
    ],
  },
  {
    id: "growth",
    title: "Growing Your Business",
    icon: TrendingUp,
    topics: [
      "Marketing your products",
      "Understanding analytics",
      "Seasonal promotions",
      "Building customer loyalty",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Logistics",
    icon: Package,
    topics: [
      "Packaging guidelines",
      "Shipping carriers",
      "International shipping",
      "Tracking and insurance",
    ],
  },
];

export default function SellerHandbook() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
          alt="Seller Handbook"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-white px-4"
          >
            Seller Handbook
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto text-center px-4"
          >
            Your comprehensive guide to success on HastIndia
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="getting-started" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <section.icon className="w-8 h-8 text-primary" />
                        <CardTitle>{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {section.topics.map((topic, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>{topic}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              PDF
                            </Button>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Additional Resources
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Download our comprehensive guides, templates, and tools to
                    help you succeed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Complete Handbook PDF
                    </Button>
                    <Button size="lg" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Resource Templates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
