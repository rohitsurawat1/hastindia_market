"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  ShoppingBag,
  Truck,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Mail,
} from "lucide-react";

const categories = [
  {
    icon: ShoppingBag,
    title: "Orders & Shopping",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order by logging into your account and visiting the Orders section. Each order will have a tracking number and current status.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, UPI, net banking, and popular digital wallets.",
      },
      {
        question: "How can I cancel my order?",
        answer:
          "Orders can be cancelled within 24 hours of placement through your account dashboard.",
      },
    ],
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    faqs: [
      {
        question: "What are the shipping charges?",
        answer:
          "Shipping charges vary based on your location and the size of the order. Free shipping is available on orders above ₹999.",
      },
      {
        question: "How long will delivery take?",
        answer:
          "Standard delivery takes 5-7 business days. Express delivery options are available for select locations.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 7 days of delivery. The item must be unused and in its original packaging.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed within 5-7 business days after we receive the returned item.",
      },
    ],
  },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    availability: "24/7 Support",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us an email",
    availability: "Response within 24 hours",
  },
  {
    icon: HelpCircle,
    title: "Help Articles",
    description: "Browse our knowledge base",
    availability: "Self-service",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Help Center"
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
            How Can We Help You?
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl px-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <category.icon className="w-12 h-12 text-primary mb-4" />
                    <h2 className="text-xl font-bold mb-2">{category.title}</h2>
                    <p className="text-muted-foreground">
                      {category.faqs.length} articles in this category
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            {searchQuery && filteredCategories.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
            ) : (
              filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {category.title}
                  </h3>
                  <Accordion type="single" collapsible className="mb-8">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                      >
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    <p className="text-sm text-primary">
                      {method.availability}
                    </p>
                    <Button className="mt-4">Get Help</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
