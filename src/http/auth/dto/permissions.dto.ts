import {IsIn} from 'class-validator'

export class PermissionsDTO {
  @IsIn(['ADMIN', 'MANAGER'], {
    message: 'Permissões válidas são ADMIN ou MANAGER',
  })
  permissions: 'ADMIN' | 'MANAGER';

}