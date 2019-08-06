const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (searchUrl) => {
    const html = await axios.get(searchUrl)
    const linkElements = cheerio('.entry > a').map(linkElement => {
        const link = linkElement.attribs.href
        return link
    })
}