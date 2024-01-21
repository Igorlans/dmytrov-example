import { IApiResponse } from "@/types/types";

export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

export interface IApiRequestOptions {
    url: `/${string}`;
    data?: { [key: string]: any };
    method: RequestMethod;
}

type NonDataMethods = "GET" | "DELETE";
type DataMethods = Exclude<RequestMethod, NonDataMethods>;

export type ApiRequestOptions =
    | (IApiRequestOptions & { method: NonDataMethods })
    | (IApiRequestOptions & {
          method: DataMethods;
          data: { [key: string]: any };
      });

export const apiRequest = async <T extends any>({
    url,
    data,
    method,
}: ApiRequestOptions): Promise<T | any> => {
    try {
        console.log("BODY", data);
        const res = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json: IApiResponse<T | any> = await res.json();
        if (!res.ok) throw new Error(json.message);
        return json?.data;
    } catch (e) {
        throw e;
    }
};
