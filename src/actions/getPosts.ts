"use server"

import { Post } from "@/types/Post"
import { getApiUrl } from "@/utils/getApiUrl"
import { handleError } from "@/utils/handleError";

export const getPosts = async (
    offset: number,
    limit: number,
): Promise<Post[]> => {
    const url = getApiUrl(offset,limit);
    try{
        const response = await fetch(url);
        const data = (await response.json()) as Post[];

        if(!response.ok){
            throw await handleError(response);
        }

        return data;
    } catch (error: unknown){
        console.error(error);
        throw new Error(`An error happened: ${error}`);
    }
}