-- CreateEnum
CREATE TYPE "AiUsed" AS ENUM ('GROK', 'CHATGPT', 'CLAUDE', 'GEMINI', 'OTHER', 'NONE');

-- CreateEnum
CREATE TYPE "KetamineType" AS ENUM ('PRESCRIPTION', 'NONE', 'STREET');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'AUTO_HIDDEN');

-- CreateEnum
CREATE TYPE "PrescriberStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('FIAT', 'CRYPTO');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('QUESTION', 'FEEDBACK', 'SUGGESTION', 'ISSUE', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "display_name" TEXT,
    "avatar_url" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_entries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "title" TEXT,
    "story_text" TEXT NOT NULL,
    "media_url" TEXT,
    "media_type" TEXT,
    "external_embed_url" TEXT,
    "external_embed_type" TEXT,
    "display_name" TEXT,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT true,
    "feeling_loved_before" INTEGER NOT NULL,
    "feeling_loved_after" INTEGER NOT NULL,
    "suicidal_before" INTEGER NOT NULL,
    "suicidal_after" INTEGER NOT NULL,
    "depression_before" INTEGER NOT NULL,
    "depression_after" INTEGER NOT NULL,
    "anxiety_before" INTEGER NOT NULL,
    "anxiety_after" INTEGER NOT NULL,
    "hope_before" INTEGER NOT NULL,
    "hope_after" INTEGER NOT NULL,
    "belonging_before" INTEGER NOT NULL,
    "belonging_after" INTEGER NOT NULL,
    "days_since_starting" INTEGER NOT NULL,
    "ai_used" "AiUsed" NOT NULL DEFAULT 'GROK',
    "ketamine_type" "KetamineType" NOT NULL,
    "genuine_experience" BOOLEAN NOT NULL DEFAULT false,
    "moderation_status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "moderation_score" DOUBLE PRECISION,
    "moderation_flags" TEXT[],
    "heart_count" INTEGER NOT NULL DEFAULT 0,
    "flag_count" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledger_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ledger_entry_id" TEXT NOT NULL,
    "vote_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescribers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "specialty" TEXT,
    "practice_name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT,
    "country" TEXT NOT NULL DEFAULT 'USA',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "offers_telemedicine" BOOLEAN NOT NULL DEFAULT false,
    "accepts_insurance" BOOLEAN NOT NULL DEFAULT false,
    "insurance_accepted" TEXT[],
    "status" "PrescriberStatus" NOT NULL DEFAULT 'PENDING',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prescribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "donation_type" "DonationType" NOT NULL,
    "token_amount" DOUBLE PRECISION,
    "token_symbol" TEXT,
    "tx_hash" TEXT,
    "wallet_address" TEXT,
    "chain_id" INTEGER,
    "display_name" TEXT,
    "message" TEXT,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT true,
    "show_on_wall" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_signups" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'wear_frequency',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_signups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "type" "FeedbackType" NOT NULL DEFAULT 'FEEDBACK',
    "message" TEXT NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'UNREAD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "ledger_entries_moderation_status_idx" ON "ledger_entries"("moderation_status");

-- CreateIndex
CREATE INDEX "ledger_entries_heart_count_idx" ON "ledger_entries"("heart_count");

-- CreateIndex
CREATE INDEX "ledger_entries_created_at_idx" ON "ledger_entries"("created_at");

-- CreateIndex
CREATE INDEX "ledger_entries_is_featured_idx" ON "ledger_entries"("is_featured");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_ledger_entry_id_vote_type_key" ON "votes"("user_id", "ledger_entry_id", "vote_type");

-- CreateIndex
CREATE INDEX "prescribers_status_idx" ON "prescribers"("status");

-- CreateIndex
CREATE INDEX "prescribers_state_idx" ON "prescribers"("state");

-- CreateIndex
CREATE INDEX "prescribers_city_idx" ON "prescribers"("city");

-- CreateIndex
CREATE INDEX "donations_created_at_idx" ON "donations"("created_at");

-- CreateIndex
CREATE INDEX "donations_show_on_wall_idx" ON "donations"("show_on_wall");

-- CreateIndex
CREATE UNIQUE INDEX "email_signups_email_key" ON "email_signups"("email");

-- CreateIndex
CREATE INDEX "feedback_status_idx" ON "feedback"("status");

-- AddForeignKey
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_ledger_entry_id_fkey" FOREIGN KEY ("ledger_entry_id") REFERENCES "ledger_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
