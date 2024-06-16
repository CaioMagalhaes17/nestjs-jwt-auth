import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handle(@Request() req) {
    console.log(req.user)
    return this.authService.generateAuthToken(req.user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('MANAGER')
  @Get('/teste')
  getTeste(){
    return '321'
  }
}
