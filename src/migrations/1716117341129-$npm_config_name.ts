import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716117341129 implements MigrationInterface {
    name = ' $npmConfigName1716117341129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_exercise_history" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "user_id" integer NOT NULL, "exercise_id" integer NOT NULL, CONSTRAINT "PK_ad82a739d637928553954b8fe78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_exercise_history" ADD CONSTRAINT "FK_52d773c11605724110a3486de65" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_exercise_history" ADD CONSTRAINT "FK_3490afc1cd1cd92ab84b74b3846" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_exercise_history" DROP CONSTRAINT "FK_3490afc1cd1cd92ab84b74b3846"`);
        await queryRunner.query(`ALTER TABLE "user_exercise_history" DROP CONSTRAINT "FK_52d773c11605724110a3486de65"`);
        await queryRunner.query(`DROP TABLE "user_exercise_history"`);
    }

}
