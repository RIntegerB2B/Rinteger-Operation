export class LogIn {
    userName: string;
    password: string;
    token: string;
    constructor(
        userName: string,
        password: string) {
        this.userName = userName;
        this.password = password;
    }
}
