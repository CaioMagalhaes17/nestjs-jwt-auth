import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: ['ADMIN' | 'MANAGER']) => SetMetadata('permissions', permissions);