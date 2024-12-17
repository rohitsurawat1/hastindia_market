"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

export default function SellerSettings() {
  const { user } = useAuth();
  const [sellerInfo, setSellerInfo] = useState({
    businessName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (user) {
      fetchSellerInfo();
    }
  }, [user]);

  const fetchSellerInfo = async () => {
    try {
      const sellerDoc = await getDoc(doc(db, "sellers", user.uid));
      if (sellerDoc.exists()) {
        setSellerInfo(sellerDoc.data());
      }
    } catch (error) {
      console.error("Error fetching seller info:", error);
      toast.error("Failed to fetch seller information");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "sellers", user.uid), sellerInfo);
      toast.success("Seller information updated successfully");
    } catch (error) {
      console.error("Error updating seller info:", error);
      toast.error("Failed to update seller information");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seller Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            value={sellerInfo.businessName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            name="description"
            value={sellerInfo.description}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={sellerInfo.contactEmail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            value={sellerInfo.contactPhone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Business Address</Label>
          <Textarea
            id="address"
            name="address"
            value={sellerInfo.address}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Bank Account Details</h2>

        <div>
          <Label htmlFor="bankAccountName">Account Holder Name</Label>
          <Input
            id="bankAccountName"
            name="bankAccountName"
            value={sellerInfo.bankAccountName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="bankAccountNumber">Account Number</Label>
          <Input
            id="bankAccountNumber"
            name="bankAccountNumber"
            value={sellerInfo.bankAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            name="bankName"
            value={sellerInfo.bankName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            name="ifscCode"
            value={sellerInfo.ifscCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
