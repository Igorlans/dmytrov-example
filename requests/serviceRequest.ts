import {Prisma} from "@prisma/client";

export const createServiceRequest = async (data : Prisma.ServicesRequestUncheckedCreateInput) : Promise<Prisma.ServicesRequestUncheckedCreateInput | null> => {
    try {
        console.log("BODY", data)
        const res = await fetch('/api/servicesLeads', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await res.json();
        if (!res.ok) throw new Error(json.message)
        return json.data;
    } catch (e: any) {
        throw e
    }
}