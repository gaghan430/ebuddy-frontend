import { setCookie } from 'nookies';
import { $instance } from ".";
import { IUser } from "./user.api";


export interface IAuthResponse {
    status: string;
    data: {
        token: string;
        user: IUser;
    }
}

export class AuthApi {
    static async register(email: string, password: string, name: string): Promise<IAuthResponse> {
        const { data } = await $instance.post<IAuthResponse>("/register", { email, password, name }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setCookie(null, "ebuddyToken", data.data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        })

        return data
    }


    static async login(email: string, password: string): Promise<IAuthResponse> {
        const { data } = await $instance.post<IAuthResponse>("/login", { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setCookie(null, "ebuddyToken", data.data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        })

        return data
    }
}