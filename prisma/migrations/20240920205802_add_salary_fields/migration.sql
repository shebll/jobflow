/*
  Warnings:

  - Added the required column `contractDuration` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "contractDuration" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "negotiable" BOOLEAN NOT NULL DEFAULT false;
