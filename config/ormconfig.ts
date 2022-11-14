import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.user,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
});

export default dbConfig;
