const shortId = require('shortid')

class Link{
    constructor(url){
        this._url = url  
        this._virtualUrl = shortId.generate()
        this._click = 0
    }
}

module.exports = Link