import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const validPermission = this.reflector.get<'ADMIN'|'MANAGER'>('permissions', context.getHandler());
    if (!validPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    const user = this.jwtService.verify(token);
    console.log(user.permissions, validPermission)
    const hasPermission = () => user.permissions === validPermission;
    if (!hasPermission()) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}