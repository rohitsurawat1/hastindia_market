"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  ShoppingBag,
} from "lucide-react";

const benefits = [
  {
    icon: ShoppingBag,
    title: "Global Reach",
    description: "Access customers worldwide through our marketplace",
  },
  {
    icon: TrendingUp,
    title: "Growth Tools",
    description: "Analytics and insights to grow your business",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a thriving community of artisans",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Jaipur, Rajasthan",
    quote: "HastIndia has helped me reach customers I never thought possible.",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
    rating: 5,
  },
  {
    name: "Priya Singh",
    location: "Varanasi, UP",
    quote: "My business has grown 3x since joining the platform.",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    location: "Moradabad, UP",
    quote: "The seller tools and support are exceptional.",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
    rating: 5,
  },
];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up as a seller and complete your profile",
  },
  {
    number: "02",
    title: "List Products",
    description: "Upload your products with high-quality photos",
  },
  {
    number: "03",
    title: "Start Selling",
    description: "Receive orders and grow your business",
  },
];

export default function StartSelling() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        className="relative h-[600px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1604684768394-52a862c2955a"
          alt="Start Selling"
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
            <Badge className="mb-4">Join Our Community</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Start Selling on HastIndia
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Reach millions of customers and grow your handicraft business
            </p>
            <Button size="lg" asChild>
              <Link href="/register?type=seller">
                Get Started
                <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <span className="text-6xl font-bold text-primary/20 absolute -top-4 right-4">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Seller Success Stories
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-center mb-4 text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-center font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Start Selling?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of artisans who are growing their business with
                  HastIndia
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/register?type=seller">
                      Create Seller Account
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/sell/seller-handbook">
                      Read Seller Handbook
                    </Link>
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
