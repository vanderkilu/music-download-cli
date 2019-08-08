"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('./scraper'),
    getSongs = _require.getSongs,
    getSong = _require.getSong;

var inquirer = require('inquirer');

var fs = require('fs');

var path = require('path');

var request = require('request');

var progress = require('request-progress');

var ProgressBar = require('./progressBar');

var Spinner = require('cli-spinner').Spinner;

var homePage = 'https://www.hitxgh.com/';
/**
 * fetch songs 
 * prompt for songs to download
 */

function fetchSongs() {
  return _fetchSongs.apply(this, arguments);
}
/**
 * downloads the selected song
 * @todo allow batch downloads
 */


function _fetchSongs() {
  _fetchSongs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var questions, songs, spinner, songTitles, answer, song;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            questions = [];
            _context.prev = 1;
            spinner = new Spinner('retrieving lastest song.. %s');
            spinner.setSpinnerString('|/-\\');
            spinner.start();
            _context.next = 7;
            return getSongs(homePage);

          case 7:
            songs = _context.sent;
            spinner.stop();
            process.stdout.write('\n\n');
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log('there was an error retrieving songs');

          case 15:
            songTitles = songs.map(function (song) {
              return song.songTitle;
            });
            questions.push({
              type: 'list',
              name: 'songs',
              message: 'Please choose which latest song to download',
              choices: songTitles,
              "default": songTitles[0]
            });
            _context.next = 19;
            return inquirer.prompt(questions);

          case 19:
            answer = _context.sent;
            song = songs.find(function (song) {
              return song.songTitle === answer.songs;
            });
            return _context.abrupt("return", song);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));
  return _fetchSongs.apply(this, arguments);
}

function downloadSong(_x) {
  return _downloadSong.apply(this, arguments);
}
/**
 * program starts here
 * checks if path is provided
 * if not use current directory
 * it checks also if provided path exists
 */


function _downloadSong() {
  _downloadSong = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(downloadPath) {
    var song, spinner, _ref, downloadLink, title, pathUrl, writer, setting, Bar;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchSongs(homePage);

          case 2:
            song = _context2.sent;
            spinner = new Spinner('preparing to download song .. %s');
            spinner.setSpinnerString('|/-\\');
            spinner.start();
            _context2.next = 8;
            return getSong(song.link);

          case 8:
            _ref = _context2.sent;
            downloadLink = _ref.downloadLink;
            title = _ref.title;
            spinner.stop();
            process.stdout.write('\n\n');
            pathUrl = path.resolve(downloadPath, title + '.mp3');
            writer = fs.createWriteStream(pathUrl);
            setting = {
              url: encodeURI(downloadLink),
              method: 'GET',
              encoding: null
            };
            Bar = new ProgressBar();
            progress(request(setting)).on('progress', function (state) {
              var hasInit = false;

              if (!hasInit) {
                Bar.init(state.size.total);
                hasInit = true;
              }

              Bar.update(state.size.transferred);
            }).on('error', function (err) {
              return console.log(err);
            }).on('end', function () {
              return console.log('\n download completed');
            }).pipe(writer);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _downloadSong.apply(this, arguments);
}

function init() {
  var downloadPath = process.argv.slice(2).join("");
  var filePath;

  if (downloadPath === "") {
    filePath = process.cwd();
    downloadSong(filePath);
  } else {
    filePath = downloadPath;

    try {
      fs.lstatSync(filePath).isDirectory();
      downloadSong(filePath);
    } catch (err) {
      console.log('path does not exists, kindly check well');
    }
  }
}

module.exports = init;