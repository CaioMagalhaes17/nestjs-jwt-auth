import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./auth/strategies/local-strategy";
import { JwtStrategy } from "./auth/strategies/jwt-strategy";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { UserRepository } from "src/database/repositories/user.repository";

@Module({
  imports: [
    JwtModule.register({
      secret: 'asdasd',
      signOptions: { expiresIn: '10min' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PermissionsGuard, UserRepository],
})

export class AuthModule {}