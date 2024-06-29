import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719309291816 implements MigrationInterface {
    name = ' $npmConfigName1719309291816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "measurements" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "weight" numeric(5,2), "height" numeric(5,2), "body_fat" numeric(5,2), "weight_goal" numeric(5,2), "waist" numeric(5,2), "neck" numeric(5,2), "shoulders" numeric(5,2), "chest" numeric(5,2), "arm" numeric(5,2), "forearm" numeric(5,2), "wrist" numeric(5,2), "hips" numeric(5,2), "thighs" numeric(5,2), "calf" numeric(5,2), "user_id" integer NOT NULL, CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD CONSTRAINT "FK_63398be08cc5c00457b503ddca1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP CONSTRAINT "FK_63398be08cc5c00457b503ddca1"`);
        await queryRunner.query(`DROP TABLE "measurements"`);
    }

}
