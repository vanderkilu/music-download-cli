const {getSongs, getSong} = require('./scraper')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const request = require('request')
const progress = require('request-progress')

const homePage = 'https://www.hitxgh.com/'

async function fetchSongs() {
    const questions = []
    let songs
    try {
        songs = await getSongs(homePage)
    }
    catch(err) {
        console.log('there was an error retrieving songs')
    }
    const songTitles = songs.map(song => song.songTitle)
    questions.push({
        type: 'list',
        name: 'songs',
        message: 'Please choose which latest song to download',
        choices: songTitles,
        default: songTitles[0]
    })
    const answer = await inquirer.prompt(questions)
    const song = songs.find(song => song.songTitle === answer.songs)
    return song
}

async function fetchSong() {
    console.log('fetching songs ......' + '\n')
    const song = await fetchSongs(homePage)
    console.log('preparing to download ......'+ '\n')
    const {downloadLink, title }= await getSong(song.link)
    console.log(downloadLink)

    const pathUrl = path.resolve(__dirname, 'songs', title +'.mp3')
    const writer = fs.createWriteStream(pathUrl)
    
    const setting = {
        url: encodeURI(downloadLink),
        method: 'GET',
        encoding: null
    }
    progress(request(setting))
    .on('progress', (state)=> {
        console.log(state.percent + '\t ' + state.speed + '\t ' + state.time.elapsed)
    })
    .on('error', console.log(err))
    .on('end', ()=> console.log('download completed'))
    .pipe(writer)
}

fetchSong()