import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718883578679 implements MigrationInterface {
    name = ' $npmConfigName1718883578679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`CREATE TABLE "recipe-extentedIngredient" ("id" SERIAL NOT NULL, "ingredients" character varying NOT NULL, CONSTRAINT "PK_62ff9ce2a3af3722714261a843d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "readyInMinutes" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "extentedIngredientsId" integer`);        
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_d1a776f1d370f59b443f24ae256" FOREIGN KEY ("extentedIngredientsId") REFERENCES "recipe-extentedIngredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_d1a776f1d370f59b443f24ae256"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "extentedIngredientsId"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "readyInMinutes"`);
        await queryRunner.query(`DROP TABLE "recipe-extentedIngredient"`);
    }

}
