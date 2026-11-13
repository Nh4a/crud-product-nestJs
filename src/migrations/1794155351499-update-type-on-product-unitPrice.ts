import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeOnProductUnitPrice1794155351499 implements MigrationInterface {
  name = 'UpdateTypeOnProductUnitPrice1794155351499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"
      ALTER COLUMN "unitPrice" TYPE numeric
      USING "unitPrice"::numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` ALTER TABLE "products"
      ALTER COLUMN "unitPrice" TYPE integer
      USING "unitPrice"::integer`,
    );
  }
}
