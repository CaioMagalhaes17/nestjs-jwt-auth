import { SetMetadata } from '@nestjs/common';

export const Permissions = (permissions: 'ADMIN' | 'MANAGER' | 'USUARIO') => SetMetadata('permissions', permissions);