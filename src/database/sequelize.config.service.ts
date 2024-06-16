import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as dotenv from 'dotenv';
dotenv.config();

export const SequelizeConfigService = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
  models: [User],
})