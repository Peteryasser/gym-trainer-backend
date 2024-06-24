import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueConstraintToPostLikes1719239845427
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'coach_posts_likes',
      new TableUnique({
        name: 'UNIQUE_USER_POST',
        columnNames: ['userId', 'postId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(
      'coach_posts_likes',
      'UNIQUE_USER_POST',
    );
  }
}
