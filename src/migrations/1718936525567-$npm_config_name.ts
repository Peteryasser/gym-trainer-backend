import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718936525567 implements MigrationInterface {
    name = ' $npmConfigName1718936525567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`CREATE TABLE "user_package_meal_plans" ("id" SERIAL NOT NULL, "mealPlanId" integer, "userId" integer, CONSTRAINT "PK_5161ccee55c583a698d1a3de651" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" ADD CONSTRAINT "FK_81fcaa9502871bc89c072b6ea13" FOREIGN KEY ("mealPlanId") REFERENCES "meal_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" ADD CONSTRAINT "FK_e490124fe5fe88329c23f579bbb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" DROP CONSTRAINT "FK_e490124fe5fe88329c23f579bbb"`);
        await queryRunner.query(`ALTER TABLE "user_package_meal_plans" DROP CONSTRAINT "FK_81fcaa9502871bc89c072b6ea13"`);
        await queryRunner.query(`DROP TABLE "user_package_meal_plans"`);
    }

}
