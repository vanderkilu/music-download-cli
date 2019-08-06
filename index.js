const scraper = require('./scraper')

scraper('https://www.hitxgh.com/').then(links => console.log(links))