"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
});
exports.default = dbConfig;
//# sourceMappingURL=ormconfig.js.map