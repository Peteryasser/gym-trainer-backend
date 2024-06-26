import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716119325432 implements MigrationInterface {
    name = ' $npmConfigName1716119325432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_plan_details" ("id" SERIAL NOT NULL, "workout_plan_id" integer NOT NULL, "workout_id" integer NOT NULL, CONSTRAINT "PK_afc7be53aedaa3470199ab10cd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_plans" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "startTime" date NOT NULL, "endTime" date NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9ae1bdd02db446a7541e2e5b161" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_plan_details" ADD CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plan_details" ADD CONSTRAINT "FK_a8f1e99db5f43d19117a3b5bf2b" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_d7fb89ee8bd7affdaa0d9963c3f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_d7fb89ee8bd7affdaa0d9963c3f"`);
        await queryRunner.query(`ALTER TABLE "workout_plan_details" DROP CONSTRAINT "FK_a8f1e99db5f43d19117a3b5bf2b"`);
        await queryRunner.query(`ALTER TABLE "workout_plan_details" DROP CONSTRAINT "FK_169ac07b22fce2874fc43d8ba99"`);
        await queryRunner.query(`DROP TABLE "workout_plans"`);
        await queryRunner.query(`DROP TABLE "workout_plan_details"`);
    }

}
