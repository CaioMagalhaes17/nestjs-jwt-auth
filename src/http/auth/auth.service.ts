import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDTO } from "./dto/login-payload.dto";
import { Injectable } from "@nestjs/common";
import { JwtPayloadDTO } from "./dto/jwt-payload.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  validateUser({login, password} : LoginPayloadDTO) : JwtPayloadDTO | void {
    const user = this.findUserByLogin(login)
    if (user && user.password === password){
      return {id: user.id, login: user.login, name: user.name, permissions: user.permissions}
    }
  }

  generateAuthToken(jwtUserPayload: JwtPayloadDTO){
    return this.jwtService.sign(jwtUserPayload);
  }

  findUserByLogin(login: string){
    const validUser: JwtPayloadDTO = {id: 1, login: 'loginTeste', password: '123', name: 'Caio', permissions: ['ADMIN']}
    return login === validUser.login ? validUser : null;
  }
}