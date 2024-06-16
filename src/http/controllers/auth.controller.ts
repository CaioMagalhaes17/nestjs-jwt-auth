import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginPayloadDTO } from '../auth/dto/login-payload.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/guards/local-guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handle(@Request() req) {
    console.log(req.user)
    return this.authService.generateAuthToken(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/teste')
  getTeste(){
    return '321'
  }
}
