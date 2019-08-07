const axios = require('axios')
const cheerio = require('cheerio')

const getSongs = async (searchUrl)=> {
    const {data} = await axios.get(searchUrl)
    const linkElements = cheerio('h2.entry-title a', data).map(async (i,linkElement) => {
        const link = linkElement.attribs.href
        const songTitle = cheerio(linkElement).text()
        return  {
            link,
            songTitle
        }
    }).get()
}

const getSongDownloadLink = async (songLink) => {
    const innerHTML = await axios.get(link) 
    const downloadLink = cheerio('.wp-audio-shortcode a',  innerHTML.data).attr('href')
    const title = cheerio('h1.entry-title', innerHTML.data).text()
    return  {
        downloadLink,
        title
    }
}

module.exports = {
    getSongs,
    getSongDownloadLink
}