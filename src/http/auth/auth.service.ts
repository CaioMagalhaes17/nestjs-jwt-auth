import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDTO } from "./dto/login-payload.dto";
import { Injectable } from "@nestjs/common";
import { JwtPayloadDTO } from "./dto/jwt-payload.dto";
import { UserRepository } from "src/database/repositories/user.repository";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userRepository: UserRepository) {}

  async validateUser({login, password} : LoginPayloadDTO) : Promise<void | JwtPayloadDTO> {
    const user = await this.findUserByLogin(login)
    if (user && user.password === password){
      return {id: user.id, login: user.login, name: user.name, permissions: user.permissions}
    }
  }

  generateAuthToken(jwtUserPayload: JwtPayloadDTO){
    return this.jwtService.sign(jwtUserPayload);
  }

  async findUserByLogin(login: string){
    const validUser: JwtPayloadDTO | undefined = await this.userRepository.getUserByLogin(login)
    if (validUser){
      return login === validUser.login ? validUser : null;
    }
  }
}