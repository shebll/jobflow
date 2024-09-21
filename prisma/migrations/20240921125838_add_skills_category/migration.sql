/*
  Warnings:

  - Added the required column `category` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "experienceLevel" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "subcategories" TEXT[];
