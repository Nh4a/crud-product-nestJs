import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToTblPriduct1794222157345 implements MigrationInterface {
    name = 'AddDescriptionToTblPriduct1794222157345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

}
