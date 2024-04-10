/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `InvalidatedToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `InvalidatedToken` DROP COLUMN `expiredAt`;

-- AlterTable
ALTER TABLE `Token` DROP COLUMN `expiredAt`;
