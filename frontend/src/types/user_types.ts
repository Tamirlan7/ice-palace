export enum UserRole {
    USER = "ROLE_USER",
    ADMIN = "ROLE_ADMIN",
}

export interface IUserResponse {
    id: number
    role: string
}
