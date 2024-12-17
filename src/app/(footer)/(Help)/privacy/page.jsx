"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

const privacyTopics = [
  {
    id: "collection",
    title: "Data Collection",
    icon: Eye,
    content: [
      "Information we collect from you",
      "How we use your information",
      "Cookies and tracking technologies",
    ],
  },
  {
    id: "protection",
    title: "Data Protection",
    icon: Lock,
    content: ["Security measures", "Data encryption", "Access controls"],
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: UserCheck,
    content: [
      "Access your data",
      "Update your information",
      "Data portability",
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: Shield,
    content: ["GDPR compliance", "Data retention", "Third-party sharing"],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Privacy Policy"
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto text-center px-4"
          >
            Your privacy is our priority. Learn how we protect your personal
            information.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="collection" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {privacyTopics.map((topic) => (
                <TabsTrigger key={topic.id} value={topic.id}>
                  {topic.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {privacyTopics.map((topic) => (
              <TabsContent key={topic.id} value={topic.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <topic.icon className="w-8 h-8 text-primary" />
                        <CardTitle>{topic.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {topic.content.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>{item}</span>
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

      {/* Contact Section */}
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
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Have Questions?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    If you have any questions about our privacy policy or how we
                    handle your data, our privacy team is here to help.
                  </p>
                  <Button size="lg">Contact Privacy Team</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
