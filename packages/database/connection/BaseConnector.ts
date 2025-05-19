import 'dotenv/config';
import mongoose, { Connection } from 'mongoose';

export default class BaseConnector {
  connectionString: string;

  db: Connection | null = null;

  constructor() {
    const isBuild = process.env.BUILD_MODE === 'true';

    // In order to defer usage of the connection until the build is complete
    // we can use a placeholder connection string.
    if (isBuild) {
      this.connectionString = 'mongodb://buildplaceholder:27017';
      return;
    }

    const connectionString = process.env.MONGO_URL;

    if (!connectionString) {
      throw new Error('MONGO_URL is not defined');
    }

    this.connectionString = connectionString;
  }

  public getConnection(): Connection {
    if (!this.db) {
      this.db = mongoose.createConnection(this.connectionString);
    }

    return this.db;
  }
}
