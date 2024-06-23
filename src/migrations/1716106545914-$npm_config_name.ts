import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716106545914 implements MigrationInterface {
    name = ' $npmConfigName1716106545914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_exercise_details" ("id" SERIAL NOT NULL, "sets" integer NOT NULL, "reps" integer NOT NULL, "duration" integer NOT NULL, "durationUnit" character varying(10) NOT NULL, "workout_id" integer NOT NULL, "exercise_id" integer NOT NULL, CONSTRAINT "PK_432306ecdcf3ae27d9628bcf902" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workouts" ("id" SERIAL NOT NULL, "type" bit NOT NULL, "description" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_exercises" ("id" SERIAL NOT NULL, "workout_id" integer NOT NULL, "exercise_id" integer NOT NULL, CONSTRAINT "PK_377f9ead6fd69b29f0d0feb1028" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD CONSTRAINT "FK_b34c85cac40dd19086584da724d" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" ADD CONSTRAINT "FK_69e8e954dd1ad10996fa5e964a6" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_2df679279a7ac263bcff20c78dd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" ADD CONSTRAINT "FK_7e6040e931b008308aaddbb7d32" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" ADD CONSTRAINT "FK_9a0656f321d9a96de2eb685e85a" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_exercises" DROP CONSTRAINT "FK_9a0656f321d9a96de2eb685e85a"`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" DROP CONSTRAINT "FK_7e6040e931b008308aaddbb7d32"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_2df679279a7ac263bcff20c78dd"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_69e8e954dd1ad10996fa5e964a6"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise_details" DROP CONSTRAINT "FK_b34c85cac40dd19086584da724d"`);
        await queryRunner.query(`DROP TABLE "workout_exercises"`);
        await queryRunner.query(`DROP TABLE "workouts"`);
        await queryRunner.query(`DROP TABLE "workout_exercise_details"`);
    }

}
