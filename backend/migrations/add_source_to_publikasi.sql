-- Migration: Add source column to publikasi table
-- Date: 2026-01-12
-- Description: Adds a source enum column to track the origin of publications

ALTER TABLE `publikasi` 
ADD COLUMN `source` ENUM('scopus', 'rama', 'garuda', 'google_scholar') NULL DEFAULT NULL 
AFTER `id_jurnal`;

-- Optional: Add comment to the column for clarity
ALTER TABLE `publikasi` 
MODIFY COLUMN `source` ENUM('scopus', 'rama', 'garuda', 'google_scholar') NULL DEFAULT NULL 
COMMENT 'Source of the publication data';
