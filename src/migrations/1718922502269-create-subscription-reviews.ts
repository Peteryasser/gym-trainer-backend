import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSubscriptionReviews1718922502269
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'subscription_reviews',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          { name: 'subscriptionId', type: 'int', isNullable: false },
          {
            name: 'rating',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'subscription_reviews',
      new TableForeignKey({
        columnNames: ['subscriptionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_subscription',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('subscription_reviews');

    const foreignKeySubscription = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('subscriptionId') !== -1,
    );

    await queryRunner.dropForeignKey(
      'subscription_reviews',
      foreignKeySubscription,
    );
    await queryRunner.dropTable('subscription_reviews');
  }
}
