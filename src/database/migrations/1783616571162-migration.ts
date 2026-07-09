import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1783616571162 implements MigrationInterface {
    name = 'Migration1783616571162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platzi_store"."customers" RENAME COLUMN "lastName" TO "lastname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platzi_store"."customers" RENAME COLUMN "lastname" TO "lastName"`);
    }

}
