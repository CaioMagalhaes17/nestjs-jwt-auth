import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDTO } from "./dto/login-payload.dto";
import { HttpException, Injectable } from "@nestjs/common";
import { JwtPayloadDTO } from "./dto/jwt-payload.dto";
import { UserRepository } from "src/database/repositories/user.repository";
import { User } from "src/database/models/user.model";
import { permission } from "process";

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

  async createUser(userData: Partial<User>){
    const existentUser = await this.findUserByLogin(userData.login)
    if (existentUser) return null
    const createdUser = await this.userRepository.createUser(userData)
    const token = this.generateAuthToken({ login: createdUser.login, id: createdUser.id, name: createdUser.name, permissions: createdUser.permissions})
    return {
      authToken: token,
      permissions: createdUser.permissions
    }
  }
}