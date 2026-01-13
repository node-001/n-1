"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Check, X, Shield, ShieldOff, Trash2, Plus, Eye, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "@/lib/utils";

interface Prescriber {
  id: string;
  name: string;
  credentials: string;
  email: string;
  phone: string | null;
  website: string | null;
  practiceName: string | null;
  specialty: string | null;
  city: string;
  state: string;
  country: string;
  offersTelemedicine: boolean;
  acceptsInsurance: boolean;
  prescribesAtHome: boolean;
  serviceArea: string | null;
  licenseNumber: string | null;
  yearsExperience: number | null;
  reviewedPortal: boolean;
  philosophyStatement: string | null;
  aiExperience: string | null;
  agreesVoluntary: boolean;
  agreesNoLiability: boolean;
  agreesAccurate: boolean;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminPrescribersPage() {
  const [prescribers, setPrescribers] = useState<Prescriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedPrescriber, setSelectedPrescriber] = useState<Prescriber | null>(null);

  const fetchPrescribers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/prescribers?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setPrescribers(data);
      }
    } catch (error) {
      console.error("Failed to fetch prescribers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescribers();
  }, [filter]);

  const handleAction = async (id: string, action: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/prescribers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchPrescribers();
      }
    } catch (error) {
      console.error("Failed to update prescriber:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/prescribers/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPrescribers();
      }
    } catch (error) {
      console.error("Failed to delete prescriber:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string, verified: boolean) => {
    if (verified && status === "APPROVED") {
      return <Badge className="bg-emerald-500/20 text-emerald-600">Verified</Badge>;
    }
    switch (status) {
      case "PENDING":
        return <Badge variant="outline" className="border-amber-500/50 text-amber-600">Pending</Badge>;
      case "APPROVED":
        return <Badge className="bg-blue-500/20 text-blue-600">Approved</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500/20 text-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Prescribers</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage prescriber applications and listings
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/prescribers/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Prescriber
          </Link>
        </Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card/80 border-border">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : prescribers.length === 0 ? (
        <Card className="bg-card/80 border-border">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No prescribers found</h3>
            <p className="text-muted-foreground">
              {filter === "pending" ? "No applications waiting for review" : `No ${filter} prescribers`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {prescribers.map((prescriber) => (
            <Card key={prescriber.id} className="bg-card/80 border-border overflow-hidden">
              <CardContent className="px-3 py-1.5 sm:py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  {/* Left side: Name, Location, Badges */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2 sm:justify-start">
                        <h3 className="font-medium text-sm flex items-center gap-1 truncate">
                          {prescriber.name}, {prescriber.credentials}
                          {prescriber.isVerified && (
                            <Shield className="h-3 w-3 text-emerald-500" />
                          )}
                        </h3>
                        <div className="shrink-0 sm:hidden">
                          {getStatusBadge(prescriber.status, prescriber.isVerified)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {prescriber.city}, {prescriber.state} • {prescriber.email}
                      </p>
                    </div>

                    {/* Badge - desktop only */}
                    <div className="hidden sm:block shrink-0">
                      {getStatusBadge(prescriber.status, prescriber.isVerified)}
                    </div>

                    {/* Extra Badges - desktop only */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                      {prescriber.offersTelemedicine && (
                        <Badge variant="outline" className="border-blue-500/50 text-blue-600 text-xs">
                          Tele
                        </Badge>
                      )}
                      {prescriber.prescribesAtHome && (
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 text-xs">
                          At-Home
                        </Badge>
                      )}
                      {prescriber.acceptsInsurance && (
                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 text-xs">
                          Insurance
                        </Badge>
                      )}
                      {prescriber.specialty && (
                        <Badge variant="outline" className="text-xs">{prescriber.specialty}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions - full width on mobile, right side on desktop */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 pt-2.5 sm:pt-0 w-full sm:w-auto shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2"
                      onClick={() => setSelectedPrescriber(prescriber)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {prescriber.status !== "APPROVED" && (
                      <Button
                        size="sm"
                        className="h-8 px-2 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleAction(prescriber.id, "approve")}
                        disabled={actionLoading === prescriber.id}
                      >
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Approve</span>
                      </Button>
                    )}

                    {prescriber.status !== "REJECTED" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-2"
                        onClick={() => handleAction(prescriber.id, "reject")}
                        disabled={actionLoading === prescriber.id}
                      >
                        <X className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Reject</span>
                      </Button>
                    )}

                    {prescriber.status === "APPROVED" && !prescriber.isVerified && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(prescriber.id, "verify")}
                        disabled={actionLoading === prescriber.id}
                        title="Verify"
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    )}

                    {prescriber.isVerified && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(prescriber.id, "unverify")}
                        disabled={actionLoading === prescriber.id}
                        title="Unverify"
                      >
                        <ShieldOff className="h-4 w-4" />
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-destructive hover:text-destructive"
                          disabled={actionLoading === prescriber.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Prescriber</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this prescriber? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(prescriber.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedPrescriber} onOpenChange={(open) => !open && setSelectedPrescriber(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPrescriber && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedPrescriber.name}, {selectedPrescriber.credentials}
                  {selectedPrescriber.isVerified && (
                    <Shield className="h-4 w-4 text-emerald-500" />
                  )}
                </DialogTitle>
                <DialogDescription>
                  Application submitted {formatDistanceToNow(new Date(selectedPrescriber.createdAt))} ago
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedPrescriber.status, selectedPrescriber.isVerified)}
                  {selectedPrescriber.offersTelemedicine && (
                    <Badge variant="outline" className="border-blue-500/50 text-blue-600">Telemedicine</Badge>
                  )}
                  {selectedPrescriber.prescribesAtHome && (
                    <Badge variant="outline" className="border-purple-500/50 text-purple-600">At-Home Ketamine</Badge>
                  )}
                  {selectedPrescriber.acceptsInsurance && (
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-600">Accepts Insurance</Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <a href={`mailto:${selectedPrescriber.email}`} className="text-blue-500 hover:underline">
                        {selectedPrescriber.email}
                      </a>
                    </div>
                    {selectedPrescriber.phone && (
                      <div>
                        <span className="text-muted-foreground">Phone:</span> {selectedPrescriber.phone}
                      </div>
                    )}
                    {selectedPrescriber.website && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Website:</span>{" "}
                        <a
                          href={selectedPrescriber.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline inline-flex items-center gap-1"
                        >
                          {selectedPrescriber.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    {selectedPrescriber.practiceName && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Practice:</span> {selectedPrescriber.practiceName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <div className="text-sm space-y-1">
                    <p>{selectedPrescriber.city}, {selectedPrescriber.state}, {selectedPrescriber.country}</p>
                    {selectedPrescriber.serviceArea && (
                      <p className="text-muted-foreground">Service Area: {selectedPrescriber.serviceArea}</p>
                    )}
                  </div>
                </div>

                {/* Credentials */}
                <div>
                  <h4 className="font-semibold mb-2">Credentials</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedPrescriber.specialty && (
                      <div>
                        <span className="text-muted-foreground">Specialty:</span> {selectedPrescriber.specialty}
                      </div>
                    )}
                    {selectedPrescriber.licenseNumber && (
                      <div>
                        <span className="text-muted-foreground">License:</span> {selectedPrescriber.licenseNumber}
                      </div>
                    )}
                    {selectedPrescriber.yearsExperience != null && (
                      <div>
                        <span className="text-muted-foreground">Years Experience:</span> {selectedPrescriber.yearsExperience}
                      </div>
                    )}
                  </div>
                </div>

                {/* Protocol Alignment */}
                {(selectedPrescriber.philosophyStatement || selectedPrescriber.aiExperience) && (
                  <div>
                    <h4 className="font-semibold mb-2">Protocol Alignment</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${selectedPrescriber.reviewedPortal ? "text-emerald-500" : "text-muted-foreground"}`} />
                        <span>Reviewed n=1 portal</span>
                      </div>
                      {selectedPrescriber.philosophyStatement && (
                        <div>
                          <span className="text-muted-foreground block mb-1">Philosophy Statement:</span>
                          <p className="bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{selectedPrescriber.philosophyStatement}</p>
                        </div>
                      )}
                      {selectedPrescriber.aiExperience && (
                        <div>
                          <span className="text-muted-foreground block mb-1">AI Experience:</span>
                          <p className="bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{selectedPrescriber.aiExperience}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Agreements */}
                <div>
                  <h4 className="font-semibold mb-2">Agreements</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className={`h-4 w-4 ${selectedPrescriber.agreesVoluntary ? "text-emerald-500" : "text-muted-foreground"}`} />
                      <span>Understands listing is voluntary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`h-4 w-4 ${selectedPrescriber.agreesNoLiability ? "text-emerald-500" : "text-muted-foreground"}`} />
                      <span>Agrees to liability terms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`h-4 w-4 ${selectedPrescriber.agreesAccurate ? "text-emerald-500" : "text-muted-foreground"}`} />
                      <span>Confirms information accuracy</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  {selectedPrescriber.status !== "APPROVED" && (
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        handleAction(selectedPrescriber.id, "approve");
                        setSelectedPrescriber(null);
                      }}
                      disabled={actionLoading === selectedPrescriber.id}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {selectedPrescriber.status !== "REJECTED" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleAction(selectedPrescriber.id, "reject");
                        setSelectedPrescriber(null);
                      }}
                      disabled={actionLoading === selectedPrescriber.id}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
