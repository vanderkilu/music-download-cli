const rp = require('request-promise')
const cheerio = require('cheerio')

/**
 * scrapes sites song link
 * @param {String} searchUrl 
 * @returns {Array} of object of links and song title
 */

const getSongs = async (searchUrl)=> {
    const html = await rp(searchUrl)
    const linkElements = cheerio('h2.entry-title a', html).map((i,linkElement) => {
        const link = linkElement.attribs.href
        const songTitle = cheerio(linkElement).text()
        return  {
            link,
            songTitle
        }
    }).get()
    return linkElements.filter(linkElement => linkElement.link !== undefined)
}

/**
 * 
 * @param {String} songLink
 * @returns {Object} of download link and song title 
 */

const getSong = async (songLink) => {
    const innerHTML = await rp(songLink) 
    const downloadLink = cheerio('.wp-audio-shortcode a',  innerHTML).attr('href')
    const title = cheerio('h1.entry-title', innerHTML).text()
    return  {
        downloadLink,
        title
    }
}

module.exports = {
    getSongs,
    getSong
}

//todo add cache to reduce call to server
//feature allow multiple downloads