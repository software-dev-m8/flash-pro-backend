export interface ICreateToken {
  accessToken: string
  refreshToken: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: any
}

export interface ILogoutResponse {
  message: string
}

export interface IRefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
