const {getSongs, getSongDownloadLink} = require('./scraper')
const downloader = require('./downloader')
const inquirer = require('inquirer')

const homePage = 'https://www.hitxgh.com/'

async function fetchSongs() {
    const questions = []
    const songs = await getSongs(homePage)
    const songTitles = songs.map(song => song.songTitle)
    questions.push({
        type: 'list',
        name: 'songs',
        message: 'Please choose which latest song to download',
        choices: songTitles,
        default: songTitles[0]
    })
    const answer = await inquirer.prompt(questions)
    const songLink = songs.find(song => song.songTitle === answer.songs)
    return songLink
}

fetchSongs().then(songLink => console.log(songLink))