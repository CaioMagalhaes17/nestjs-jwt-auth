export class JwtPayloadDTO {
  id: number
  name: string
  login: string
  permissions: ['ADMIN' | 'MANAGER']
  password?: string
}