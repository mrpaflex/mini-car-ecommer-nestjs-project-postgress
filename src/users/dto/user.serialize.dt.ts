import { Expose } from "class-transformer";

export class userSeriliazeDTO {
    @Expose()
    id: number;
    
    @Expose()
    email: string
}