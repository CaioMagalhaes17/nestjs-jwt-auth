import { Body, Controller, HttpException, Param, Put, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { UserService } from "src/services/user.service";
import { PermissionsDTO } from "../auth/dto/permissions.dto";

@Controller()
export class UserController {
  constructor (private userService: UserService){}
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ADMIN')
  @Put('/user/permissions/:userId')
  async changePermissions(@Param('userId') userId: string, @Body() changePermissionData: PermissionsDTO){
    if (changePermissionData.permissions !== 'ADMIN' && changePermissionData.permissions !== 'MANAGER') throw new HttpException(`Erro, permissão - ${changePermissionData.permissions} não existe`, 400)
    const response = await this.userService.changePermissions(userId, changePermissionData)
    if (!response) throw new HttpException('Erro, usuário inexistente', 400)
  }
}