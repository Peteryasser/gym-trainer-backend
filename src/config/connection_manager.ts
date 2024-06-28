import { connectionSource } from '../config/typeorm';
import { DataSource } from 'typeorm';

/* The ConnectionManager class provides a static method to get a connection to the AppDataSource. */
export class ConnectionManager {
  private static connection: DataSource;

  static async getConnection() {
    if (!ConnectionManager.connection) {
      ConnectionManager.connection = await connectionSource.initialize();
    }
    return ConnectionManager.connection;
  }
}
