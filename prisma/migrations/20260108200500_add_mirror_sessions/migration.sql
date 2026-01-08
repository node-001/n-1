-- CreateTable
CREATE TABLE "mirror_sessions" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "turn_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mirror_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mirror_sessions_fingerprint_key" ON "mirror_sessions"("fingerprint");

-- CreateIndex
CREATE INDEX "mirror_sessions_fingerprint_idx" ON "mirror_sessions"("fingerprint");

-- CreateIndex
CREATE INDEX "mirror_sessions_last_used_at_idx" ON "mirror_sessions"("last_used_at");
