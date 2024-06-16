import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";

export const SequelizeConfigService = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '01052003Cc@',
  database: 'jwt_auth',
  models: [User],
})