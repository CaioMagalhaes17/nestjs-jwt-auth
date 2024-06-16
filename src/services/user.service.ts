import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async changePermissions(userId: string, changePermissionData: {permissions: 'ADMIN' | 'MANAGER'}){
    const result = await this.userRepository.changePermissions(userId, changePermissionData)
    if (result) return result
  }
}