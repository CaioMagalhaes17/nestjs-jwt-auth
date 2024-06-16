import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./auth/strategies/local-strategy";
import { JwtStrategy } from "./auth/strategies/jwt-strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: 'asdasd',
      signOptions: { expiresIn: '10min' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})

export class AuthModule {}