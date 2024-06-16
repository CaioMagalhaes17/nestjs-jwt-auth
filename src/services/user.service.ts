import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";
import { PermissionsDTO } from "src/http/auth/dto/permissions.dto";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async changePermissions(userId: string, changePermissionData: PermissionsDTO){
    const result = await this.userRepository.changePermissions(userId, changePermissionData)
    if (result) return result
  }
}