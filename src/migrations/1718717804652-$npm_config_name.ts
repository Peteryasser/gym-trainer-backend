import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718717804652 implements MigrationInterface {
    name = ' $npmConfigName1718717804652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meal_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e2087be1487fe85d8b364dc87ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bf30badf08ab1761ae217c26030" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cuisines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_22b98d435f9359f707c764953a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_ingredients" ("id" SERIAL NOT NULL, "userId" integer, "ingredientId" integer, CONSTRAINT "PK_41b709406d9e9b520b6a1c35def" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes_ingredients" ("id" SERIAL NOT NULL, "recipeId" integer, "ingredientId" integer, CONSTRAINT "PK_128176fc97ba8afde4b0befd9ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_recipes" ("id" SERIAL NOT NULL, "userId" integer, "recipeId" integer, CONSTRAINT "PK_11e7caa47f845935f979231d190" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "name" character varying(90) NOT NULL, "imageURL" character varying NOT NULL, "calories_kcal" real NOT NULL, "fat_g" real NOT NULL, "sugar_g" real NOT NULL, "protein_g" real NOT NULL, "instructions" character varying NOT NULL, "summary" character varying NOT NULL, "is_custom" boolean NOT NULL, "user_id" integer, "dishTypeId" integer, "cuisineId" integer, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal_recipes" ("id" SERIAL NOT NULL, "mealId" integer, "recipeId" integer, CONSTRAINT "PK_f25b41690bab7891761cc284b8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal_plans" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6270d3206d074e2a2520f8d0a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal_plan_meals" ("id" SERIAL NOT NULL, "mealPlanId" integer, "mealId" integer, CONSTRAINT "PK_e1217b8d94a671032e449b16938" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meals" ("id" SERIAL NOT NULL, "name" character varying(90) NOT NULL, "description" character varying NOT NULL, "is_custom" boolean NOT NULL, "total_calories" integer NOT NULL, "userId" integer, "categoryId" integer, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_meals" ("meal_id" SERIAL NOT NULL, "userId" integer, "mealId" integer, CONSTRAINT "PK_24d674460dc2b7a2b5629409f53" PRIMARY KEY ("meal_id"))`);
        await queryRunner.query(`CREATE TABLE "user_meals_history" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "userId" integer, "mealId" integer, CONSTRAINT "PK_b9a82d57911b1e3ba800bb00fcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_ingredients" ADD CONSTRAINT "FK_0981baa5ce90db458317c1b55d7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_ingredients" ADD CONSTRAINT "FK_7a2191fac22477a1cc79b65da39" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_c84920dabbb1b467807d663b682" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_da3666d01f0d650f34d0d4df902" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_recipes" ADD CONSTRAINT "FK_ef79f3baa55df3e93ef87f7e44a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_recipes" ADD CONSTRAINT "FK_99e2945dac11da77ec4da894705" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_67d98fd6ff56c4340a811402154" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_2d5051c967fdfbc0ca6e0bd0f17" FOREIGN KEY ("dishTypeId") REFERENCES "dish_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_4622b1f6f1cb7540a7a2ed1e5f3" FOREIGN KEY ("cuisineId") REFERENCES "cuisines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" ADD CONSTRAINT "FK_6cdc1d6f4cd1ea58226c62627a3" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" ADD CONSTRAINT "FK_2fcbd4f4f265864015c6798229a" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plan_meals" ADD CONSTRAINT "FK_7d52d6486e69b1a0977b4450a35" FOREIGN KEY ("mealPlanId") REFERENCES "meal_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plan_meals" ADD CONSTRAINT "FK_51103e37a512c193b2b2ea2cf89" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_3111c7cf13da976d7ed18287811" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_54cdfce448e02c20ee5dcfca61b" FOREIGN KEY ("categoryId") REFERENCES "meal_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_meals" ADD CONSTRAINT "FK_ded193e8214aa23b0499011b9f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_meals" ADD CONSTRAINT "FK_9fbf020281c609f81cc1c6311e8" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_meals_history" ADD CONSTRAINT "FK_1ecec1e84e84455e75259f738e0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_meals_history" ADD CONSTRAINT "FK_e3e82e7ed62c139a8a510f710cb" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_meals_history" DROP CONSTRAINT "FK_e3e82e7ed62c139a8a510f710cb"`);
        await queryRunner.query(`ALTER TABLE "user_meals_history" DROP CONSTRAINT "FK_1ecec1e84e84455e75259f738e0"`);
        await queryRunner.query(`ALTER TABLE "saved_meals" DROP CONSTRAINT "FK_9fbf020281c609f81cc1c6311e8"`);
        await queryRunner.query(`ALTER TABLE "saved_meals" DROP CONSTRAINT "FK_ded193e8214aa23b0499011b9f4"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_54cdfce448e02c20ee5dcfca61b"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_3111c7cf13da976d7ed18287811"`);
        await queryRunner.query(`ALTER TABLE "meal_plan_meals" DROP CONSTRAINT "FK_51103e37a512c193b2b2ea2cf89"`);
        await queryRunner.query(`ALTER TABLE "meal_plan_meals" DROP CONSTRAINT "FK_7d52d6486e69b1a0977b4450a35"`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" DROP CONSTRAINT "FK_2fcbd4f4f265864015c6798229a"`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" DROP CONSTRAINT "FK_6cdc1d6f4cd1ea58226c62627a3"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_4622b1f6f1cb7540a7a2ed1e5f3"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_2d5051c967fdfbc0ca6e0bd0f17"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_67d98fd6ff56c4340a811402154"`);
        await queryRunner.query(`ALTER TABLE "saved_recipes" DROP CONSTRAINT "FK_99e2945dac11da77ec4da894705"`);
        await queryRunner.query(`ALTER TABLE "saved_recipes" DROP CONSTRAINT "FK_ef79f3baa55df3e93ef87f7e44a"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_da3666d01f0d650f34d0d4df902"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_c84920dabbb1b467807d663b682"`);
        await queryRunner.query(`ALTER TABLE "saved_ingredients" DROP CONSTRAINT "FK_7a2191fac22477a1cc79b65da39"`);
        await queryRunner.query(`ALTER TABLE "saved_ingredients" DROP CONSTRAINT "FK_0981baa5ce90db458317c1b55d7"`);
        await queryRunner.query(`DROP TABLE "user_meals_history"`);
        await queryRunner.query(`DROP TABLE "saved_meals"`);
        await queryRunner.query(`DROP TABLE "meals"`);
        await queryRunner.query(`DROP TABLE "meal_plan_meals"`);
        await queryRunner.query(`DROP TABLE "meal_plans"`);
        await queryRunner.query(`DROP TABLE "meal_recipes"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "saved_recipes"`);
        await queryRunner.query(`DROP TABLE "recipes_ingredients"`);
        await queryRunner.query(`DROP TABLE "saved_ingredients"`);
        await queryRunner.query(`DROP TABLE "cuisines"`);
        await queryRunner.query(`DROP TABLE "dish_types"`);
        await queryRunner.query(`DROP TABLE "meal_categories"`);
    }

}
