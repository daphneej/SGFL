/*
  Warnings:

  - Added the required column `thumbnailId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `thumbnailId` VARCHAR(191) NOT NULL,
    ADD COLUMN `videoId` VARCHAR(191) NOT NULL;
