export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expiresAt: Date;
    username: string;
}