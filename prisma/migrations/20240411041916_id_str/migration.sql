/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `File` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[uniqueName]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` DROP PRIMARY KEY,
    ADD COLUMN `uniqueName` VARCHAR(512) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `File_uniqueName_key` ON `File`(`uniqueName`);
