const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (searchUrl) => {
    const {data} = await axios.get(searchUrl)
    const linkElements = cheerio('h2.entry-title a', data).map(async (i,linkElement) => {
        const link = linkElement.attribs.href
        const innerHTML = await axios.get(link) 
        const downloadLink = cheerio('.wp-audio-shortcode a',  innerHTML.data).attr('href')
        const title = cheerio('h1.entry-title', innerHTML.data).text()
        return  {
            downloadLink,
            title
        }
    }).get()
    return Promise.all(linkElements)
}