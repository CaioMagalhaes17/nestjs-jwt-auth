import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDTO } from "./dto/login-payload.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  validateUser({login, password} : LoginPayloadDTO) : {id: number, login: string} | void {
    const user = this.findUserByLogin(login)
    if (user && user.password === password){
      return {id: user.id, login: user.login}
    }
  }

  generateAuthToken(user: { login: string; id: number; }){
    const payload = { username: user.login, sub: user.id };
    return this.jwtService.sign(payload);
  }

  findUserByLogin(login: string){
    const validUser = {id: 1, login: 'loginTeste', password: '123'}
    return login === validUser.login ? validUser : null;
  }
}