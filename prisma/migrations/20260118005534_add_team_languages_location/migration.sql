/*
  Warnings:

  - Added the required column `languages` to the `team_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `team_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_applications" ADD COLUMN     "languages" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
