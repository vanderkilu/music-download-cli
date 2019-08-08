"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(searchUrl) {
    var html, linkElements;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(songLink) {
    var innerHTML, downloadLink, title;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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