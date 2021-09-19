import { Quote } from "./Quote";

export type Author = {
    _id: string,
    bio: string,
    description: string,
    link: string,
    name: string,
    slug: string,
    quoteCount: number,
    quotes: Quote[] | Promise<Author>
}