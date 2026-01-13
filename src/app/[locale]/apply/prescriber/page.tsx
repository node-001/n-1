"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function PrescriberApplicationPage() {
  const t = useTranslations("prescriberApply");
  const tc = useTranslations("common");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [credentials, setCredentials] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [offersTelemedicine, setOffersTelemedicine] = useState(false);
  const [prescribesAtHome, setPrescribesAtHome] = useState(false);

  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  const [reviewedPortal, setReviewedPortal] = useState(false);
  const [philosophyStatement, setPhilosophyStatement] = useState("");
  const [aiExperience, setAiExperience] = useState("");

  const [agreesVoluntary, setAgreesVoluntary] = useState(false);
  const [agreesNoLiability, setAgreesNoLiability] = useState(false);
  const [agreesAccurate, setAgreesAccurate] = useState(false);

  // All required agreements must be checked
  const allAgreementsChecked = reviewedPortal && agreesVoluntary && agreesNoLiability && agreesAccurate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/prescribers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          credentials,
          practiceName: practiceName || undefined,
          email,
          website: website || undefined,
          country,
          state,
          city,
          serviceArea: serviceArea || undefined,
          offersTelemedicine,
          prescribesAtHome,
          licenseNumber: licenseNumber || undefined,
          specialty: specialty || undefined,
          yearsExperience: yearsExperience ? parseInt(yearsExperience, 10) : undefined,
          reviewedPortal,
          philosophyStatement: philosophyStatement || undefined,
          aiExperience: aiExperience || undefined,
          agreesVoluntary,
          agreesNoLiability,
          agreesAccurate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />
        <div className="relative z-10 px-6 py-12 flex flex-col items-center">
          <div className="max-w-2xl w-full">
            <Card className="bg-card/80 border-border">
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-6 text-emerald-500" />
                <h2 className="text-2xl font-bold mb-4">{t("successTitle")}</h2>
                <p className="text-muted-foreground mb-8">{t("successMessage")}</p>
                <Button asChild>
                  <Link href="/">{tc("backToHome")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />
      <div className="relative z-10 px-6 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {tc("back")}
              </Link>
            </Button>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("pageTitle")}</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              {t("pageDescription")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Contact Info */}
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle>{t("contactInfo.title")}</CardTitle>
                <CardDescription>{t("contactInfo.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contactInfo.name")} *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("contactInfo.namePlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credentials">{t("contactInfo.credentials")} *</Label>
                    <Input
                      id="credentials"
                      value={credentials}
                      onChange={(e) => setCredentials(e.target.value)}
                      placeholder={t("contactInfo.credentialsPlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practice">{t("contactInfo.practiceName")}</Label>
                  <Input
                    id="practice"
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                    placeholder={t("contactInfo.practiceNamePlaceholder")}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contactInfo.email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("contactInfo.emailPlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">{t("contactInfo.website")}</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={t("contactInfo.websitePlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Location & Availability */}
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle>{t("location.title")}</CardTitle>
                <CardDescription>{t("location.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("location.country")} *</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder={t("location.countryPlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t("location.state")} *</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder={t("location.statePlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("location.city")} *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t("location.cityPlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceArea">{t("location.serviceArea")}</Label>
                  <Input
                    id="serviceArea"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    placeholder={t("location.serviceAreaPlaceholder")}
                  />
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
                        {t("location.offersTelemedicine")}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {t("location.offersTelemedicineDescription")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="atHome"
                      checked={prescribesAtHome}
                      onCheckedChange={(checked) => setPrescribesAtHome(checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="atHome" className="cursor-pointer font-medium">
                        {t("location.prescribesAtHome")}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {t("location.prescribesAtHomeDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Professional Credentials */}
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle>{t("credentials.title")}</CardTitle>
                <CardDescription>{t("credentials.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="license">{t("credentials.licenseNumber")}</Label>
                    <Input
                      id="license"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder={t("credentials.licenseNumberPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">{t("credentials.specialty")}</Label>
                    <Input
                      id="specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder={t("credentials.specialtyPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">{t("credentials.yearsExperience")}</Label>
                    <Input
                      id="years"
                      type="number"
                      min="0"
                      max="70"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      placeholder={t("credentials.yearsExperiencePlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Protocol Alignment */}
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle>{t("alignment.title")}</CardTitle>
                <CardDescription>{t("alignment.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="reviewed"
                    checked={reviewedPortal}
                    onCheckedChange={(checked) => setReviewedPortal(checked === true)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="reviewed" className="cursor-pointer font-medium">
                      {t("alignment.reviewedPortal")} *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("alignment.reviewedPortalDescription")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="philosophy">{t("alignment.philosophyStatement")}</Label>
                  <Textarea
                    id="philosophy"
                    value={philosophyStatement}
                    onChange={(e) => setPhilosophyStatement(e.target.value)}
                    placeholder={t("alignment.philosophyStatementPlaceholder")}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aiExp">{t("alignment.aiExperience")}</Label>
                  <Textarea
                    id="aiExp"
                    value={aiExperience}
                    onChange={(e) => setAiExperience(e.target.value)}
                    placeholder={t("alignment.aiExperiencePlaceholder")}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Agreements */}
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle>{t("agreements.title")}</CardTitle>
                <CardDescription>{t("agreements.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="voluntary"
                    checked={agreesVoluntary}
                    onCheckedChange={(checked) => setAgreesVoluntary(checked === true)}
                    required
                  />
                  <Label htmlFor="voluntary" className="cursor-pointer leading-relaxed">
                    {t("agreements.voluntary")} *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="liability"
                    checked={agreesNoLiability}
                    onCheckedChange={(checked) => setAgreesNoLiability(checked === true)}
                    required
                  />
                  <Label htmlFor="liability" className="cursor-pointer leading-relaxed">
                    {t("agreements.noLiability")} *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="accurate"
                    checked={agreesAccurate}
                    onCheckedChange={(checked) => setAgreesAccurate(checked === true)}
                    required
                  />
                  <Label htmlFor="accurate" className="cursor-pointer leading-relaxed">
                    {t("agreements.accurate")} *
                  </Label>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting || !allAgreementsChecked}
            >
              {isSubmitting ? (
                t("submitting")
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t("submit")}
                </>
              )}
            </Button>
          </form>

          <div className="h-12" />
        </div>
      </div>
    </div>
  );
}
