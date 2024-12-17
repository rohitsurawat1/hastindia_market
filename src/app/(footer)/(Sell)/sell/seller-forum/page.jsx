"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, TrendingUp, Search } from "lucide-react";

const topics = [
  {
    title: "Marketing Tips",
    posts: 156,
    lastActive: "2 hours ago",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "Product Photography",
    posts: 89,
    lastActive: "1 hour ago",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  },
  {
    title: "Pricing Strategies",
    posts: 234,
    lastActive: "30 minutes ago",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
  {
    title: "Shipping Solutions",
    posts: 167,
    lastActive: "5 hours ago",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
  },
];

const stats = [
  { title: "Active Members", value: "5,000+", icon: Users },
  { title: "Daily Posts", value: "200+", icon: MessageSquare },
  { title: "Growing Monthly", value: "15%", icon: TrendingUp },
];

export default function SellerForum() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
          alt="Seller Forum"
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
            Seller Forum
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto text-center px-4"
          >
            Connect, learn, and grow with fellow artisans
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search forum topics..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={topic.image}
                          alt={topic.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {topic.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{topic.posts} posts</Badge>
                          <span className="text-sm text-muted-foreground">
                            Last active {topic.lastActive}
                          </span>
                        </div>
                        <Button variant="outline" className="w-full">
                          View Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                    Start a Discussion
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Share your experiences, ask questions, and connect with
                    other sellers.
                  </p>
                  <Button size="lg">Create New Topic</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
