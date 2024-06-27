import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719186805811 implements MigrationInterface {
    name = ' $npmConfigName1719186805811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_3111c7cf13da976d7ed18287811"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "imageURL" character varying`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "imageURL" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_d89009b328c39e42964f8b3f95b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_d89009b328c39e42964f8b3f95b"`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "imageURL" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "imageURL"`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_3111c7cf13da976d7ed18287811" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
