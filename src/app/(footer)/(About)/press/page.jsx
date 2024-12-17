"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Download, ExternalLink } from "lucide-react";

const pressReleases = [
  {
    date: "March 15, 2024",
    title: "HastIndia Expands to International Markets",
    description:
      "Platform now serves customers in over 50 countries, bringing Indian handicrafts to global audiences.",
    category: "Expansion",
  },
  {
    date: "February 28, 2024",
    title: "New Artisan Training Program Launched",
    description:
      "Initiative to provide digital skills training to 1000+ artisans across India.",
    category: "Education",
  },
  {
    date: "January 15, 2024",
    title: "Record Holiday Season Sales",
    description:
      "Platform achieves 200% year-over-year growth during festive season.",
    category: "Business",
  },
];

const mediaKit = [
  {
    title: "Brand Assets",
    description: "Logos, color palette, and brand guidelines",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
  },
  {
    title: "Photo Gallery",
    description: "High-resolution images of artisans and products",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
  },
  {
    title: "Impact Stories",
    description: "Featured stories of artisan success",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea"
          alt="Press Room"
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
            Press Room
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto text-center px-4"
          >
            Latest news and updates from HastIndia
          </motion.p>
        </div>
      </motion.section>

      {/* Press Releases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Latest Press Releases
          </h2>
          <div className="grid gap-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <p className="text-sm text-muted-foreground">
                            {release.date}
                          </p>
                          <Badge variant="secondary">{release.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {release.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {release.description}
                        </p>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Media Kit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Media Inquiries
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  For press inquiries, interview requests, or additional
                  information, please contact our media relations team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Contact Press Team
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Press Kit
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
