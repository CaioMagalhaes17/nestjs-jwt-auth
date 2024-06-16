import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";

@Module({
  imports:[AuthModule],
  controllers: []
})
export class HttpModule {}