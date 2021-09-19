import { Author } from "./Author";
import { Quote } from "./Quote";
export class Quoteable {
    constructor();
    async GetRandom(maxLength?: number, minLength?: number, tags?: string[], matchAll?: boolean, author?: string): Promise<Quote>;
    async ListQuotes(maxLength?: number, minLength?: number, tags?: string[], matchAll?: boolean, author?: string, sortBy?: "dateAdded" | "dateModified" | "author" | "content", order?: "asc" | "desc", limit?: number, page?: number): Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Quote[]}>;
    async GetQuoteByID(id: string): Promise<Quote>;
    async ListAuthors(slug?: string, sortBy?: "dateAdded" | "dateModified" | "name" | "quoteCount", order?: "asc" | "desc", limit?: number, page?: number): Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Author[]}>;
    async GetAuthorByID(id: string): Promise<Author>;
    async ListTags(sortBy?: "dateAdded" | "dateModified" | "name" | "quoteCount", order?: "asc" | "desc"): Promise<{count: number, results: {_id: string, name: string, dateAdded: string, dateModified: string, __v: number, quoteCount: number}[]}>;
}