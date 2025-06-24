-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `stock` INTEGER NOT NULL,
    `product_image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_Categories` (
    `product_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`product_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(191) NOT NULL,
    `email_address` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_per_item` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_Categories` ADD CONSTRAINT `Product_Categories_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Categories` ADD CONSTRAINT `Product_Categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
