import { $authInstance } from "."

export interface IUser {
    id: string
    email: string
    name: string
}

export interface IUserResponse {
    status: string;
    data: IUser
}

export class UserApi {
    static async getMe(token: string) {
        const { data } = await $authInstance.get<IUserResponse>("/fetch-user-data", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    }

    static async updateMe() {
        const { data } = await $authInstance.put<IUserResponse>("/update-user-data");
        return data;
    }
}