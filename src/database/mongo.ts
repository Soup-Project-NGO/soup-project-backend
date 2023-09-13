import { MongoClient, Db } from 'mongodb';

export class MongoDBConnection {
  private client = undefined as unknown as MongoClient;
  private db = undefined as unknown as Db;

  async connect(): Promise<void> {
    await this.initializeClient();

    try {
      await this.client?.connect();

      this.db = this.client?.db('soup-project-db');

      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error}`);
    }
  }

  async initializeClient(): Promise<void> {
    const url = process.env.MONGODB_URL as string;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(
      url, { auth: { username, password } }
    );

    this.client = client;
  }

  getClient(): MongoClient {
    return this.client;
  }

  getDatabase(): Db {
    return this.db;
  }
}
