interface Quote {
    _id: string,
    content: string,
    author: string,
    authorSlug: string,
    length: number,
    tags: string[]
}
interface Author {
    _id: string,
    bio: string,
    description: string,
    link: string,
    name: string,
    slug: string,
    quoteCount: number,
}
interface AuthorWithQuotes extends Author {
    quotes: Quote[]
}
export class Quoteable {
    constructor();
    GetRandom(maxLength?: number, minLength?: number, tags?: string[], matchAll?: boolean, author?: string): Promise<Quote>;
    ListQuotes(maxLength?: number, minLength?: number, tags?: string[], matchAll?: boolean, author?: string, sortBy?: "dateAdded" | "dateModified" | "author" | "content", order?: "asc" | "desc", limit?: number, page?: number): Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Quote[]}>;
    GetQuoteByID(id: string): Promise<Quote>;
    ListAuthors(slug?: string, sortBy?: "dateAdded" | "dateModified" | "name" | "quoteCount", order?: "asc" | "desc", limit?: number, page?: number): Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Author[]}>;
    GetAuthorByID(id: string): Promise<AuthorWithQuotes>;
    ListTags(sortBy?: "dateAdded" | "dateModified" | "name" | "quoteCount", order?: "asc" | "desc"): Promise<{count: number, results: {_id: string, name: string, dateAdded: string, dateModified: string, __v: number, quoteCount: number}[]}>;
}