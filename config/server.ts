import express from 'express';
import dbConfig from './ormconfig';
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from 'helmet';

import router from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connect = async () =>{
  try {
    await dbConfig.initialize();
    console.log('Database connected');
  } catch(err) {
    console.error("Error connecting to database", err);
  }
}

connect();

app.use('/api', router);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port locahost:${port}`);
})
