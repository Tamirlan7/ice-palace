export interface IRegisterRequest {
    email: string,
    password: string,
    confirmPassword: string
}

export interface ILoginRequest {
    email: string,
    password: string,
}

export interface IToken {
    accessToken: string,
    refreshToken: string,
}

export interface IJwtClaims {
    iat: number,
    exp: number
    role: string,
    userId: number,
}
