import { Message } from "@/model/User";

export interface ApiResponse{            // Here we declare a type/template of Api response (src/types/ApiResponse.ts) for ease in returning the response.
    success: boolean,
    message: string,
    isAcceptingMessage?: boolean,
    messages?: Array<Message>
}