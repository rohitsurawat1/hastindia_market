"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Users, BarChart, Globe } from "lucide-react";

const stats = [
  {
    title: "Annual Growth",
    value: "40%",
    icon: TrendingUp,
    description: "Year-over-year revenue growth",
  },
  {
    title: "Artisan Network",
    value: "5000+",
    icon: Users,
    description: "Active artisans on platform",
  },
  {
    title: "Market Reach",
    value: "50+",
    icon: Globe,
    description: "Countries served",
  },
  {
    title: "GMV",
    value: "₹100Cr+",
    icon: BarChart,
    description: "Gross Merchandise Value",
  },
];

const reports = [
  {
    title: "Annual Report 2023",
    description:
      "Comprehensive overview of our financial performance and impact",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
  {
    title: "Sustainability Report",
    description: "Our commitment to environmental and social responsibility",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
  },
  {
    title: "Impact Assessment",
    description: "Measuring our contribution to artisan communities",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
  },
];

export default function InvestorPage() {
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
          alt="Indian Handicrafts Investment"
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
            Investor Relations
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto text-center px-4"
          >
            Investing in Indian Craftsmanship and Creating Sustainable Growth
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {stat.value}
                    </h3>
                    <p className="font-medium text-foreground">{stat.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Latest Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={report.image}
                        alt={report.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {report.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Report
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Interested in Investing?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn more about investment opportunities in HastIndia and how
                  we&lsquo;re working to create sustainable growth in the Indian
                  handicraft sector.
                </p>
                <Button size="lg">
                  Contact Investor Relations
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
