import { ISignUpBody, ISignUpForm, IUpdateUserBody } from "@/types/types";
import { User } from "@prisma/client";

export const signUpRequest = async (data: ISignUpForm): Promise<User | null> => {
    try {
        console.log(data);
        const body: ISignUpBody = {
            email: data.email,
            name: data.name,
            phone: data.phone,
            father_name: data.father_name,
            password: data.password,
            skype: data.skype,
            surname: data.surname
        };
        const res = await fetch("/api/auth/user", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        return json.data;
    } catch (e: any) {
        throw e;
    }
};

export const updateUserRequest = async (data: IUpdateUserBody): Promise<User | null> => {
    try {
        console.log(data);
        const body: IUpdateUserBody = {
            email: data.email,
            name: data.name,
            phone: data.phone,
            father_name: data.father_name,
            skype: data.skype,
            surname: data.surname
        };
        const res = await fetch("/api/auth/user", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        return json.data;
    } catch (e: any) {
        throw e;
    }
};