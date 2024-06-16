import { Body, Controller, Get, HttpException, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { JwtPayloadDTO } from '../auth/dto/jwt-payload.dto';
import { User } from 'src/database/models/user.model';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handle(@Request() req: {user: JwtPayloadDTO}) {
    return this.authService.generateAuthToken(req.user)
  }

  @Post('/user')
  async createUser(@Body() userData: Partial<User>){
    const response = await this.authService.createUser(userData)
    if (!response){
      throw new HttpException('Usuário já existe', 400)
    }
    return response
  }
}
