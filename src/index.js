const axios = require("axios").default;
const Quote = require("./Quote");
const Author = require("./Author");
const instance = axios.create({
    method: "GET",
    baseURL: "https://api.quotable.io",
    headers: {
        "Accept": "application/json"
    }
})
class Quoteable {
    constructor(){};
    /**
     * 
     * @param {number} [maxLength] - The maximum Length in characters ( can be combined with `minLength` )
     * @param {number} [minLength] - The minimum Length in characters ( can be combined with `maxLength` )
     * @param {string[]} [tags] - Filter random quote by tag(s). Takes a list of one or more tag names.
     * @param {boolean} [matchAll] - Does the quote need to match **All** the provided tags?
     * @param {string} [author] - Get random quote by a specific author(s). The value can be an author `name` or `slug`. To include quotes by multiple authors, provide a pipe-separated list of author names/slugs.
     * @returns {Promise<Quote>}
     */
    async GetRandom(maxLength, minLength, tags, matchAll = true, author) {
        return instance({
            url: "/random",
            params: {
                "maxLength": maxLength || "",
                "minLength": minLength || "",
                "tags": (tags) ? (matchAll) ? tags.join(",") : tags.join("|") : "",
                "author": author
            }
        }).then(({data}) => {
            return new Quote(data._id, data.content, data.author, data.authorSlug, data.length, data.tags);
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {number} [maxLength] - The maximum Length in characters ( can be combined with `minLength` )
     * @param {number} [minLength] - The minimum Length in characters ( can be combined with `maxLength` )
     * @param {string[]} [tags] - Filter quotes by tag(s). Takes a list of one or more tag names.
     * @param {boolean} [matchAll] - Do the quotes need to match **All** the provided tags?
     * @param {string} [author] - Get quotes by a specific author. The value can be an author `name` or `slug`. To get quotes by multiple authors, provide a pipe separated list of author names/slugs.
     * @param {"dateAdded" | "dateModified" | "author" | "content"} [sortBy] - The field used to sort quotes
     * @param {"asc" | "desc"} [order] - The order in which results are sorted.
     * @param {number} [limit] - Sets the number of results per page. 	`Min: 1   Max: 150   Default: 20`
     * @param {number} [page] - The page of results to return. If the value is greater than the total number of pages, request will not return any results   `Min: 1   Default: 1`
     * @returns {Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Quote[]}>}
     */
    async ListQuotes(maxLength, minLength, tags, matchAll = true, author, sortBy, order, limit = 20, page = 1) {
        return instance({
            url: "/quotes",
            params: {
                "maxLength": maxLength || "",
                "minLength": minLength || "",
                "tags": (tags) ? (matchAll) ? tags.join(",") : tags.join("|") : "",
                "author": author,
                "sortBy": sortBy || "",
                "order": order || "",
                "limit": limit,
                "page": page
            }
        }).then(({data}) => {
            return {
                count: data.count,
                totalCount: data.totalCount,
                page: data.page,
                totalPages: data.totalPages,
                lastItemIndex: data.lastItemIndex,
                results: data.results.map((r) => {return new Quote(r._id, r.content, r.author, r.authorSlug, r.length, r.tags)})
            }
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} id
     * @returns {Promise<Quote>} 
     */
    async GetQuoteByID(id) {
        return instance({
            url: `/quotes/${id}`
        }).then(({data}) => {
            return new Quote(data._id, data.content, data.author, data.authorSlug, data.length, data.tags);
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} [slug] 
     * @param {"dateAdded" | "dateModified" | "name" | "quoteCount"} [sortBy] - The field used to sort quotes
     * @param {"asc" | "desc"} [order] - The order in which results are sorted.
     * @param {number} [limit] - Sets the number of results per page. 	`Min: 1   Max: 150   Default: 20`
     * @param {number} [page] - The page of results to return. If the value is greater than the total number of pages, request will not return any results   `Min: 1   Default: 1`
     * @returns {Promise<{count: number, totalCount: number, page: number, totalPages: number, lastItemIndex: number, results: Author[]}>}
     */
    async ListAuthors(slug, sortBy, order, limit = 20, page = 1) {
        return instance({
            url: "/authors",
            params: {
                "slug": slug || "",
                "sortBy": sortBy || "",
                "order": order || "",
                "limit": limit,
                "page": page
            }
        }).then(({data}) => {
            return {
                count: data.count,
                totalCount: data.totalCount,
                page: data.page,
                totalPages: data.totalPages,
                lastItemIndex: data.lastItemIndex,
                results: data.results.map((r) => {return new Author(r._id, r.bio, r.description, r.link, r.name, r.slug, r.quoteCount, this.GetAuthorByID(r._id).then((d) => {
                    return d.quotes
                }))})
            }
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} id
     * @returns {Promise<Author} 
     */
    async GetAuthorByID(id) {
        return instance({
            url: `/authors/${id}`
        }).then(({data}) => {
            return new Author(data._id, data.bio, data.description, data.link, data.name, data.slug, data.quoteCount,data.quotes.map((r) => {return new Quote(r._id, r.content, r.author, r.authorSlug, r.length, r.tags)}))
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {"dateAdded" | "dateModified" | "name" | "quoteCount"} [sortBy] - The field used to sort quotes
     * @param {"asc" | "desc"} [order] - The order in which results are sorted.
     * @returns {Promise<{count: number, results: {_id: string, name: string, dateAdded: string, dateModified: string, __v: number, quoteCount: number}[]}>}
     */
    async ListTags(sortBy, order) {
        return instance({
            url: "/tags",
            params: {
                "sortBy": sortBy || "",
                "order": order || ""
            }
        }).then(({data}) => {
            return data;
        }).catch((err) => {throw new Error(err)})
    }
}
module.exports = Quoteable;