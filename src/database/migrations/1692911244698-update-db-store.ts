import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDbStore1692911244698 implements MigrationInterface {
    name = 'UpdateDbStore1692911244698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand_id\` \`brand_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``);
        await queryRunner.query(`DROP INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`customer_id\` \`customer_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_4640b5bdb54311d9d1a4db9c0aa\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_d42918a88740ece11347e20918f\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` ON \`users\` (\`email\`, \`customer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_4640b5bdb54311d9d1a4db9c0aa\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_d42918a88740ece11347e20918f\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_d42918a88740ece11347e20918f\``);
        await queryRunner.query(`ALTER TABLE \`order-items\` DROP FOREIGN KEY \`FK_4640b5bdb54311d9d1a4db9c0aa\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`DROP INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`order-items\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_d42918a88740ece11347e20918f\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order-items\` ADD CONSTRAINT \`FK_4640b5bdb54311d9d1a4db9c0aa\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`customer_id\` \`customer_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`IDX_a2ab02c7074aaa8ece19442eb5\` ON \`users\` (\`email\`, \`customer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand_id\` \`brand_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

}
