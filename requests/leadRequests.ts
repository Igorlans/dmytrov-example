import Prisma from "@prisma/client";

export const createLeadRequest = async (data : Prisma.Request) : Promise<Prisma.Request | null> => {
    try {
        console.log("BODY", data)
        const res = await fetch('/api/leads', {
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