import { Role } from '../enums'

export interface IJwtPayload {
  sub: string
  role: Role
}
