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
    let warning = ''
    if (userData.permissions){
      const admins = await this.userRepository.getAdmins()
      if (admins.length > 0){
        warning = `AVISO! Usuários novos não tem permissão para criar contas como administradores, peça para que um administrador atualize suas permissões`
        delete userData.permissions
      }
    }
    const existentUser = await this.findUserByLogin(userData.login)
    if (existentUser) return null
    const createdUser = await this.userRepository.createUser(userData)
    const token = this.generateAuthToken({ login: createdUser.login, id: createdUser.id, name: createdUser.name, permissions: createdUser.permissions})
    return {
      warning: warning,
      authToken: token,
      permissions: createdUser.permissions
    }
  }
}