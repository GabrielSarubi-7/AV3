-- CreateTable
CREATE TABLE `Aeronave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NULL,
    `alcance` INTEGER NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Aeronave_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aeronaveId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `fornecedor` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etapa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aeronaveId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `prazo_dias` INTEGER NULL,
    `status` VARCHAR(191) NULL,
    `responsaveis` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `permissao` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Funcionario_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aeronaveId` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `resultado` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peca` ADD CONSTRAINT `Peca_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etapa` ADD CONSTRAINT `Etapa_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teste` ADD CONSTRAINT `Teste_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
