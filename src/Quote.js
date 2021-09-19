class Quote {
    /**
     * 
     * @param {string} _id 
     * @param {string} content 
     * @param {string} author 
     * @param {string} authorSlug 
     * @param {number} length 
     * @param {string[]} tags 
     */
    constructor(_id, content, author, authorSlug, length, tags) {
        this._id = _id;
        this.content = content;
        this.author = author;
        this.authorSlug = authorSlug;
        this.length = length;
        this.tags = tags;
    }
}
module.exports = Quote;