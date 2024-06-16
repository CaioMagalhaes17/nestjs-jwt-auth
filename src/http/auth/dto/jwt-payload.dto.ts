export class JwtPayloadDTO {
  id: string
  name: string
  permissions: ['ADMIN' | 'MANAGER']
}