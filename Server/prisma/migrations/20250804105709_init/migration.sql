-- CreateTable
CREATE TABLE `GameHistory` (
    `id` VARCHAR(191) NOT NULL,
    `boardSize` INTEGER NOT NULL,
    `moves` JSON NOT NULL,
    `winner` VARCHAR(191) NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
