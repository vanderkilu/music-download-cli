"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rp = require('request-promise');

var cheerio = require('cheerio');
/**
 * scrapes sites song link
 * @param {String} searchUrl 
 * @returns {Array} of object of links and song title
 */


var getSongs =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(searchUrl) {
    var html, linkElements;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return rp(searchUrl);

          case 2:
            html = _context.sent;
            linkElements = cheerio('h2.entry-title a', html).map(function (i, linkElement) {
              var link = linkElement.attribs.href;
              var songTitle = cheerio(linkElement).text();
              return {
                link: link,
                songTitle: songTitle
              };
            }).get();
            return _context.abrupt("return", linkElements.filter(function (linkElement) {
              return linkElement.link !== undefined;
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSongs(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 
 * @param {String} songLink
 * @returns {Object} of download link and song title 
 */


var getSong =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(songLink) {
    var innerHTML, downloadLink, title;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return rp(songLink);

          case 2:
            innerHTML = _context2.sent;
            downloadLink = cheerio('.wp-audio-shortcode a', innerHTML).attr('href');
            title = cheerio('h1.entry-title', innerHTML).text();
            return _context2.abrupt("return", {
              downloadLink: downloadLink,
              title: title
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSong(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  getSongs: getSongs,
  getSong: getSong //todo add cache to reduce call to server
  //feature allow multiple downloads

};