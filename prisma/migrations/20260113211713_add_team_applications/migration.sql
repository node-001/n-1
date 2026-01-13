-- CreateTable
CREATE TABLE "team_applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "team_applications_created_at_idx" ON "team_applications"("created_at");
