import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1783613582390 implements MigrationInterface {
  name = 'Migration1783613582390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "platzi_store"`);
    await queryRunner.query(`SET search_path TO "platzi_store"`);
    await queryRunner.query(
      `CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `,
    );
    await queryRunner.query(
      `CREATE TABLE "order-items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_605fbaee38242facaa1a34b67ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" text NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b942d55b92ededa770041db9ded" UNIQUE ("name"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "customer_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2ab02c7074aaa8ece19442eb5" ON "users" ("email", "customer_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "products_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_634f5e1b5983772473fe0ec0008" PRIMARY KEY ("product_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products_categories" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products_categories" ("category_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-items" ADD CONSTRAINT "FK_4640b5bdb54311d9d1a4db9c0aa" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-items" ADD CONSTRAINT "FK_d42918a88740ece11347e20918f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_f2c76a4306a82c696d620f81f08" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" ADD CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET search_path TO "platzi_store"`);
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories" DROP CONSTRAINT "FK_f2c76a4306a82c696d620f81f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-items" DROP CONSTRAINT "FK_d42918a88740ece11347e20918f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-items" DROP CONSTRAINT "FK_4640b5bdb54311d9d1a4db9c0aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`,
    );
    await queryRunner.query(
      `DROP INDEX "platzi_store"."IDX_19fe0fe8c2fcf1cbe1a80f639f"`,
    );
    await queryRunner.query(
      `DROP INDEX "platzi_store"."IDX_f2c76a4306a82c696d620f81f0"`,
    );
    await queryRunner.query(`DROP TABLE "products_categories"`);
    await queryRunner.query(
      `DROP INDEX "platzi_store"."IDX_a2ab02c7074aaa8ece19442eb5"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order-items"`);
    await queryRunner.query(
      `DROP INDEX "platzi_store"."IDX_4fbc36ad745962e5c11001e1a8"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "brands"`);
  }
}
