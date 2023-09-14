import { MongoClient, Db } from 'mongodb';

class MongoDB {
  private client!: MongoClient;
  private db!: Db;

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL as string;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    try {
      this.client = new MongoClient(
        url, { auth: { username, password } }
      );
      this.db = this.client.db('soup-project-db');

      console.log('🎉 Connected to MongoDB!');
    } catch (error) {
      console.log(`🚫 Unable to connect to MongoDB: ${error}`);
    }
  }

  getClient(): MongoClient {
    return this.client;
  }

  getDb(): Db {
    return this.db;
  }
}

export default new MongoDB();
