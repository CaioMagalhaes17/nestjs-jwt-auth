import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { UserRepository } from "src/database/repositories/user.repository";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { JwtStrategy } from "./auth/strategies/jwt-strategy";
import { UserController } from "./controllers/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/services/user.service";

@Module({
  imports:[
    AuthModule,
    JwtModule.register({
    secret: 'asdasd',
    signOptions: { expiresIn: '10min' },
  })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, PermissionsGuard, UserRepository],
})
export class HttpModule {}