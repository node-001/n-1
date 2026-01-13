-- AlterTable
ALTER TABLE "prescribers" ADD COLUMN     "agrees_accurate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agrees_no_liability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agrees_voluntary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ai_experience" TEXT,
ADD COLUMN     "license_number" TEXT,
ADD COLUMN     "philosophy_statement" TEXT,
ADD COLUMN     "prescribes_at_home" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reviewed_portal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "service_area" TEXT,
ADD COLUMN     "years_experience" INTEGER;
