"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddPrescriberPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [credentials, setCredentials] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [offersTelemedicine, setOffersTelemedicine] = useState(false);
  const [acceptsInsurance, setAcceptsInsurance] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/prescribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          credentials,
          email,
          phone: phone || undefined,
          practiceName: practiceName || undefined,
          specialty: specialty || undefined,
          website: website || undefined,
          address: address || undefined,
          city,
          state,
          zipCode: zipCode || undefined,
          offersTelemedicine,
          acceptsInsurance,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add prescriber");
      }

      router.push("/admin/prescribers?filter=approved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/prescribers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Add Prescriber</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Add a new prescriber directly to the directory (will be auto-approved and verified)
        </p>
      </div>

      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle>Prescriber Information</CardTitle>
          <CardDescription>
            Enter the prescriber&apos;s details. All required fields are marked with *.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credentials">Credentials *</Label>
                <Input
                  id="credentials"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  placeholder="MD, DO, NP, etc."
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@clinic.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="practice">Practice Name</Label>
                <Input
                  id="practice"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  placeholder="Healing Mind Clinic"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Psychiatry"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourclinic.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street, Suite 100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Los Angeles"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="CA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="90001"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="telemedicine"
                  checked={offersTelemedicine}
                  onCheckedChange={(checked) => setOffersTelemedicine(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="telemedicine" className="cursor-pointer font-medium">
                    Offers telemedicine
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This prescriber can see patients remotely
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="insurance"
                  checked={acceptsInsurance}
                  onCheckedChange={(checked) => setAcceptsInsurance(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="insurance" className="cursor-pointer font-medium">
                    Accepts insurance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This prescriber accepts health insurance
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                "Adding..."
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Prescriber
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
