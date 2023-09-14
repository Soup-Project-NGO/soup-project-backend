import express from 'express';

import { config } from 'dotenv';

import MongoDB from '@database/mongo';

import { router } from '@routes/index';

config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(router);

MongoDB
  .connect()
  .then(() => app.listen(port, () => console.log(`🎉 Server running on the port: ${port}!`)))
  .catch((error) => console.log(`🚫 Unable to run the server: ${error}`));
