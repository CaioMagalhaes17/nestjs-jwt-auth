import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SequelizeConfigService } from './database/sequelize.config.service';

@Module({
  imports: [HttpModule, SequelizeConfigService],
})
export class AppModule {}
