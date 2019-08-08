const {getSongs, getSong} = require('./scraper')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const request = require('request')
const progress = require('request-progress')
const ProgressBar = require('./progressBar')
const Spinner = require('cli-spinner').Spinner

const homePage = 'https://www.hitxgh.com/'

/**
 * fetch songs 
 * prompt for songs to download
 */

async function fetchSongs() {
    const questions = []
    let songs
    try {
        const spinner = new Spinner('retrieving lastest song.. %s')
        spinner.setSpinnerString('|/-\\')
        spinner.start()

        songs = await getSongs(homePage)

        spinner.stop()
        process.stdout.write('\n\n')
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

/**
 * downloads the selected song
 * @todo allow batch downloads
 */
async function downloadSong(downloadPath) {

    const song = await fetchSongs(homePage)

    const spinner = new Spinner('preparing to download song .. %s')
    spinner.setSpinnerString('|/-\\')
    spinner.start()

    const {downloadLink, title }= await getSong(song.link)

    spinner.stop()
    process.stdout.write('\n\n')

    const pathUrl = path.resolve(downloadPath, title +'.mp3')
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

/**
 * program starts here
 * checks if path is provided
 * if not use current directory
 * it checks also if provided path exists
 */
function init() {
    const downloadPath = process.argv.slice(2).join("")
    let filePath
    if (downloadPath === "") {
        filePath = process.cwd()
        downloadSong(filePath)
    }
    else {
        filePath = downloadPath
        try {
            fs.lstatSync(filePath).isDirectory()
             downloadSong(filePath)
        }
        catch(err) {
            console.log('path does not exists, kindly check well')
        }
    }
}

init()
