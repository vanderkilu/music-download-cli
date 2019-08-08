const {getSongs, getSong} = require('./scraper')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const request = require('request')
const progress = require('request-progress')
const ProgressBar = require('./progressBar')
const Spinner = require('cli-spinner').Spinner

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

async function downloadSong() {

    const spinner1 = new Spinner('retrieving lastest song.. %s')
    spinner1.setSpinnerString('|/-\\')
    spinner1.start()

    const song = await fetchSongs(homePage)
    spinner1.stop()

    const spinner2 = new Spinner('retrieving lastest song.. %s')
    spinner2.setSpinnerString('|/-\\')
    spinner2.start()

    const {downloadLink, title }= await getSong(song.link)
    spinner2.stop()

    const pathUrl = path.resolve(__dirname, 'songs', title +'.mp3')
    const writer = fs.createWriteStream(pathUrl)
    
    const setting = {
        url: encodeURI(downloadLink),
        method: 'GET',
        encoding: null
    }
    const Bar = new ProgressBar()
    progress(request(setting))
    .on('progress', (state)=> {
        let hasInit = false
        if (!hasInit) {
            Bar.init(state.size.total)
            hasInit = true
        }
		Bar.update(state.size.transferred);
    })
    .on('error', (err)=> console.log(err))
    .on('end', ()=> console.log('\n download completed'))
    .pipe(writer)
}

downloadSong()