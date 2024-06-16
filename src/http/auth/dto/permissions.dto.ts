import {IsIn} from 'class-validator'

export class PermissionsDTO {
  @IsIn(['ADMIN', 'MANAGER', 'USUARIO'], {
    message: 'Permissões válidas são USUARIO, ADMIN ou MANAGER',
  })
  permissions: 'ADMIN' | 'MANAGER' | 'USUARIO';

}