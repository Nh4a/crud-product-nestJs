import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublicIdColumnToTblProduct1794236510692 implements MigrationInterface {
    name = 'AddPublicIdColumnToTblProduct1794236510692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "imagePublicId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imagePublicId"`);
    }

}
