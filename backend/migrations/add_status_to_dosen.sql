-- Migration: Add status column to dosen table
-- Date: 2026-01-12
-- Description: Adds a status enum column to track dosen account verification status

ALTER TABLE `dosen` 
ADD COLUMN `status` ENUM('pending', 'submitted', 'verified', 'rejected') DEFAULT 'pending' 
AFTER `foto_profil`;

-- Update existing records to have 'verified' status (assuming they're already active)
UPDATE `dosen` SET `status` = 'verified' WHERE `status` IS NULL;

-- Optional: Add comment to the column for clarity
ALTER TABLE `dosen` 
MODIFY COLUMN `status` ENUM('pending', 'submitted', 'verified', 'rejected') DEFAULT 'pending' 
COMMENT 'Account verification status';
