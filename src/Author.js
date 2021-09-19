const Quote = require("./Quote");
class Author {
    /**
     * 
     * @param {string} _id 
     * @param {string} bio 
     * @param {string} description 
     * @param {string} link 
     * @param {string} name 
     * @param {string} slug 
     * @param {number} quoteCount 
     * @param {Quote[] | Promise<Author>} [quotes] 
     */
    constructor(_id, bio, description, link, name, slug, quoteCount, quotes) {
        this._id = _id;
        this.bio = bio;
        this.description = description;
        this.link = link;
        this.name = name;
        this.slug = slug;
        this.quoteCount = quoteCount;
        this.quotes = quotes || null
    }
}
module.exports = Author;