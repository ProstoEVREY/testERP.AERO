/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uniqueName` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `File_uniqueName_key` ON `File`;

-- AlterTable
ALTER TABLE `File` DROP PRIMARY KEY,
    DROP COLUMN `uniqueName`,
    MODIFY `id` VARCHAR(512) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `File_id_key` ON `File`(`id`);
