export interface Credentials{
    username: string,
    password: string
}

export interface  User {
    id: number;
    role: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface UserTokenState {
    accessToken: string;
    expiresIn: number;
    username: string;
    roles: string
}

export interface Player {
    id: number;
    playerName: string;
    image: string;
    salary: number;
}

export interface SportClub {
    id: number;
    name: string;
    players: Array<Player>;
}
