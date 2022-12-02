import express from 'express';
import session from "express-session";
import dbConfig from './ormconfig';
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from 'helmet';
import router from './routes';
import './passport';
import passport from 'passport';
import { Request, Response, NextFunction } from "express";
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
  console.log(`this is a session: ${req.session}`);
  console.log(`user is: ${req.body.user}`);
  next();
});
app.use('/', router);

const connect = async () =>{
  try {
    await dbConfig.initialize();
    console.log('Database connected');
  } catch(err) {
    console.error("Error connecting to database", err);
  }
}


connect();



const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
  console.log(`Server connected! Open http://localhost:${port}/api`);
})

app.use('/api', router);
