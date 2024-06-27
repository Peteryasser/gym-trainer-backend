import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaveTables1718643274977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // write for add the saveExercise Table and saveWorkoutCollection table
    await queryRunner.query(
      `CREATE TABLE "save_exercise" ("id" SERIAL NOT NULL, "exercise_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_6d7f3d3c9f4d0e9a7e0c4f7f0c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "save_workout_collection" ("id" SERIAL NOT NULL, "workout_collection_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_8d3f3d3c9f4d0e9a7e0c4f7f0c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_exercise" ADD CONSTRAINT "FK_6d7f3d3c9f4d0e9a7e0c4f7f0c9" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_exercise" ADD CONSTRAINT "FK_6d7f3d3c9f4d0e9a7e0c4f7f0c8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_workout_collection" ADD CONSTRAINT "FK_8d3f3d3c9f4d0e9a7e0c4f7f0c9" FOREIGN KEY ("workout_collection_id") REFERENCES "workout_collections"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_workout_collection" ADD CONSTRAINT "FK_8d3f3d3c9f4d0e9a7e0c4f7f0c8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // write for drop the saveExercise Table and saveWorkoutCollection table
    await queryRunner.query(
      `ALTER TABLE "save_exercise" DROP CONSTRAINT "FK_6d7f3d3c9f4d0e9a7e0c4f7f0c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_exercise" DROP CONSTRAINT "FK_6d7f3d3c9f4d0e9a7e0c4f7f0c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_workout_collection" DROP CONSTRAINT "FK_8d3f3d3c9f4d0e9a7e0c4f7f0c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_workout_collection" DROP CONSTRAINT "FK_8d3f3d3c9f4d0e9a7e0c4f7f0c8"`,
    );
    await queryRunner.query(`DROP TABLE "save_exercise"`);
    await queryRunner.query(`DROP TABLE "save_workout_collection"`);
  }
}
