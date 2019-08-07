const scraper = require('./scraper')
const downloader = require('./downloader')

scraper('https://www.hitxgh.com/')
.then(links => {
    console.log(links[0])
    downloader(links[0]).then(() => "successful")
    .catch((err)=> console.log(err))
})
.catch((err)=> console.log(err))