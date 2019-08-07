const fs = require('fs')
const path = require('path')
const axios = require('axios')

module.exports = async ({downloadLink, title}) => {
    const pathUrl = path.resolve(__dirname, 'songs', title +'.mp3')
    const writer = fs.createWriteStream(pathUrl)
    
    const response = await axios({
        url: downloadLink,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', ()=> {
            console.log('download finished')
            resolve()
        })
        writer.on('error', reject)
    })
}