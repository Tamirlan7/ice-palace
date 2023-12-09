export interface ICsrfResponse {
    headerName: string,
    token: string
}

export interface IRegisterRequest {
    phone: number
    password: string
}

export interface ILoginRequest {
    phone: number
    password: string
}