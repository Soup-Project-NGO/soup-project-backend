import express from 'express';
import { config } from 'dotenv';

import { MongoDBConnection } from './database/mongo';

config();

const app = express();
const mongoDBConnection = new MongoDBConnection();

const port = process.env.PORT;

mongoDBConnection
  .connect()
  .then(() => app.listen(port, () => console.log(`Server running on the port: ${port}!`)))
  .catch((error) => console.error(`Error starting the server: ${error}`));
