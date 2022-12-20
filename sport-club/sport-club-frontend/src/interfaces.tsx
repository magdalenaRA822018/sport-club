export interface Login{
    username: string,
    password: string
}

export interface UserTokenState {
    accessToken: string;
    expiresIn: number;
    username: string;
    roles: string
}