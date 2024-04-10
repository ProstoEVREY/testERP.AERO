-- AlterTable
ALTER TABLE `InvalidatedToken` MODIFY `tokenstr` VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE `Token` MODIFY `tokenstr` VARCHAR(512) NOT NULL;
