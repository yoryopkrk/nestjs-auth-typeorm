import { MigrationInterface, QueryRunner } from "typeorm";

export class First1692916685341 implements MigrationInterface {
    name = 'First1692916685341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`brand_id\` int NULL, INDEX \`IDX_4fbc36ad745962e5c11001e1a8\` (\`price\`, \`stock\`), UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`role\` text NOT NULL, \`customer_id\` int NULL, INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` (\`email\`, \`customer_id\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_c7bc1ffb56c570f42053fa7503\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order-items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`quantity\` int NOT NULL, \`productId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` text NOT NULL, \`phone\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_b942d55b92ededa770041db9de\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_categories\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_f2c76a4306a82c696d620f81f0\` (\`product_id\`), INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_4640b5bdb54311d9d1a4db9c0aa\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_d42918a88740ece11347e20918f\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_f2c76a4306a82c696d620f81f08\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_19fe0fe8c2fcf1cbe1a80f639f1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_19fe0fe8c2fcf1cbe1a80f639f1\``);
        await queryRunner.query(`ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_f2c76a4306a82c696d620f81f08\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_d42918a88740ece11347e20918f\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_4640b5bdb54311d9d1a4db9c0aa\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`DROP INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` ON \`products_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2c76a4306a82c696d620f81f0\` ON \`products_categories\``);
        await queryRunner.query(`DROP TABLE \`products_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_b942d55b92ededa770041db9de\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order-items\``);
        await queryRunner.query(`DROP INDEX \`REL_c7bc1ffb56c570f42053fa7503\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fbc36ad745962e5c11001e1a8\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
