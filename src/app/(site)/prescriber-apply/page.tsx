import { redirect } from "next/navigation";

// Public prescriber applications are disabled.
// Prescribers are added by admins through the admin portal.
export default function PrescriberApplyPage() {
  redirect("/directory");
}
