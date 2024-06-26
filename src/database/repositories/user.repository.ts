import { permission } from "process";
import { User } from "../models/user.model";
import { HttpException } from "@nestjs/common";
import { PermissionsDTO } from "src/http/auth/dto/permissions.dto";

export class UserRepository {
  constructor(private userModel: User){}

  async getUserById(id: string){
    const result = await User.findByPk(id)
    if (result) return result
  }

  async getUserByLogin(login: string){
    const result = await User.findAll({
      where: {login}
    })
    return result[0]
  }

  async createUser(userData: Partial<User>){
    const result = await User.create(userData)
    return result
  }

  async changePermissions(userId: string, changePermissionData: PermissionsDTO){
    if (await this.getUserById(userId)) {
      const result = await User.update({permissions: changePermissionData.permissions}, {
        where: {id: userId},
        returning: true
      })
      console.log(result)
      return result
    }
  }

  async getAdmins(){
    const result = await User.findAll({
      where: {permissions: 'ADMIN'}
    })
    return result
  }
}