import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716106726909 implements MigrationInterface {
    name = ' $npmConfigName1716106726909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_69e8e954dd1ad10996fa5e964a6"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_b34c85cac40dd19086584da724d"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP COLUMN "workout_id"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP COLUMN "exercise_id"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD "workout_exercise_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD CONSTRAINT "FK_0294df8c935769bb3ede1086052" FOREIGN KEY ("workout_exercise_id") REFERENCES "workout_exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_0294df8c935769bb3ede1086052"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP COLUMN "workout_exercise_id"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD "exercise_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD "workout_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD CONSTRAINT "FK_b34c85cac40dd19086584da724d" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD CONSTRAINT "FK_69e8e954dd1ad10996fa5e964a6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
