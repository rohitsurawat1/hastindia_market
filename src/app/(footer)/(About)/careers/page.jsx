"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Briefcase, Users, Heart, Send } from "lucide-react";
import Image from "next/image";

const jobOpenings = [
  {
    id: 1,
    title: "Artisan Relations Manager",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Lead our efforts in building and maintaining relationships with artisan communities across India.",
    requirements: [
      "5+ years experience in community management",
      "Deep understanding of Indian handicrafts",
      "Excellent communication skills in English and Hindi",
      "Willingness to travel extensively",
    ],
  },
  {
    id: 2,
    title: "Senior Full Stack Developer",
    department: "Technology",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Help build and maintain our e-commerce platform that connects artisans with global customers.",
    requirements: [
      "4+ years experience with React and Node.js",
      "Experience with e-commerce platforms",
      "Strong understanding of web performance",
      "Knowledge of AWS or similar cloud platforms",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive our digital marketing efforts to showcase Indian handicrafts to a global audience.",
    requirements: [
      "3+ years experience in digital marketing",
      "Experience with social media marketing",
      "Strong analytical skills",
      "Creative storytelling abilities",
    ],
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance for you and your family",
  },
  {
    icon: Users,
    title: "Learning & Development",
    description: "Regular workshops and learning opportunities",
  },
  {
    icon: Briefcase,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options",
  },
];

const values = [
  {
    title: "Craft First",
    description:
      "We prioritize the preservation and promotion of traditional crafts in everything we do.",
  },
  {
    title: "Innovation",
    description:
      "We embrace technology to create better opportunities for artisans.",
  },
  {
    title: "Sustainability",
    description:
      "We're committed to environmentally and socially sustainable practices.",
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null); // Fixing syntax here
  const [activeTab, setActiveTab] = useState("openings");

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
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1604684768394-52a862c2955a"
          alt="Indian Artisans at Work"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center px-4"
          >
            Join Our Mission
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8 text-center px-4"
          >
            Help us preserve and promote India‘s rich handicraft heritage while
            building a sustainable future for artisans
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="openings">Current Openings</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="culture">Our Culture</TabsTrigger>
            </TabsList>

            <TabsContent value="openings">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6"
              >
                {jobOpenings.map((job) => (
                  <motion.div key={job.id} variants={itemVariants}>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {job.title}
                          </CardTitle>
                          <CardDescription>
                            {job.department} • {job.location}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </CardHeader>
                      <CardContent>
                        {selectedJob === job.id ? (
                          <div className="space-y-4">
                            <p className="text-foreground">{job.description}</p>
                            <div>
                              <h4 className="font-semibold mb-2 text-foreground">
                                Requirements:
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {job.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-end gap-4">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedJob(null)}
                              >
                                Cancel
                              </Button>
                              <Button>
                                <Send className="w-4 h-4 mr-2" /> Apply Now
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-muted-foreground">
                              {job.description}
                            </p>
                            <Button onClick={() => setSelectedJob(job.id)}>
                              View Details
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
