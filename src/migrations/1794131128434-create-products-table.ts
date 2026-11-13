import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1794131128434 implements MigrationInterface {
    name = 'CreateProductsTable1794131128434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "productName" character varying NOT NULL, "unitPrice" integer NOT NULL, "imageUrl" character varying, "stockQty" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
