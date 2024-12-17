"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Users, Heart, Globe, Award } from "lucide-react";

const stats = [
  { label: "Artisans", value: "500+", icon: Users },
  { label: "Products", value: "5000+", icon: Heart },
  { label: "States", value: "28", icon: Globe },
  { label: "Awards", value: "15+", icon: Award },
];

const milestones = [
  {
    year: 2023,
    title: "Foundation",
    description:
      "HastIndia was established with a vision to empower Indian artisans.",
    image: "https://images.unsplash.com/photo-1604684768394-52a862c2955a",
  },
  {
    year: 2024,
    title: "Expansion",
    description:
      "Reached 500+ artisans across India and launched international shipping.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
  },
  {
    year: 2025,
    title: "Innovation",
    description: "Introduced AR/VR technology for virtual craft exhibitions.",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
  },
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    bio: "Former artisan with 20 years of experience in traditional crafts.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Priya Singh",
    role: "Head of Artisan Relations",
    bio: "Anthropologist specializing in Indian craft communities.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Alex Thompson",
    role: "Technology Director",
    bio: "Tech veteran focused on bridging tradition with innovation.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
];

const initiatives = [
  {
    title: "Craft Preservation",
    description: "Documenting and preserving traditional craft techniques.",
    image: "https://images.unsplash.com/photo-1590138891643-e31e3f89c5a3",
  },
  {
    title: "Artisan Education",
    description:
      "Training programs for skill enhancement and business development.",
    image: "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9",
  },
  {
    title: "Sustainable Practices",
    description: "Promoting eco-friendly materials and production methods.",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0",
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("vision");

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
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9"
          alt="Indian Handicrafts"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-center text-white px-4"
          >
            Preserving Heritage
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center max-w-2xl px-4 text-white/90"
          >
            Connecting artisans with the world, one craft at a time
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-primary/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="text-3xl font-bold mb-2 text-foreground">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
            </TabsList>
            <TabsContent value="vision">
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    To create a world where traditional Indian craftsmanship
                    thrives in the modern marketplace, ensuring the preservation
                    of cultural heritage while providing sustainable livelihoods
                    for artisans.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mission">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    To empower Indian artisans by providing them with a global
                    platform, fair compensation, and the tools they need to
                    succeed in the digital age.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="values">
              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-lg text-muted-foreground">
                    <li>• Authenticity in craft and relationships</li>
                    <li>• Sustainability in practices and growth</li>
                    <li>• Innovation while respecting tradition</li>
                    <li>• Fairness in trade and opportunity</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Milestones Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-primary/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Journey
          </h2>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-primary text-xl font-bold mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2 text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary text-center mb-4">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-center">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Initiatives Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-primary/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <motion.div
                key={initiative.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={initiative.image}
                        alt={initiative.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      {initiative.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {initiative.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help us preserve India&lsquo;s rich cultural heritage while creating
            sustainable opportunities for artisans.
          </p>
          <Button size="lg" className="group">
            Get Involved
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
