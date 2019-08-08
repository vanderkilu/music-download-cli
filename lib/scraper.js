'use strict';function _asyncToGenerator(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(a){return void c(a)}return g.done?void a(h):Promise.resolve(h).then(function(a){d('next',a)},function(a){d('throw',a)})}return d('next')})}}var rp=require('request-promise'),cheerio=require('cheerio'),getSongs=function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){var c,d;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,rp(b);case 2:return c=a.sent,d=cheerio('h2.entry-title a',c).map(function(a,b){var c=b.attribs.href,d=cheerio(b).text();return{link:c,songTitle:d}}).get(),a.abrupt('return',d.filter(function(a){return void 0!==a.link}));case 5:case'end':return a.stop();}},a,void 0)}));return function(){return a.apply(this,arguments)}}(),getSong=function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){var c,d,e;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,rp(b);case 2:return c=a.sent,d=cheerio('.wp-audio-shortcode a',c).attr('href'),e=cheerio('h1.entry-title',c).text(),a.abrupt('return',{downloadLink:d,title:e});case 6:case'end':return a.stop();}},a,void 0)}));return function(){return a.apply(this,arguments)}}();/**
 * scrapes sites song link
 * @param {String} searchUrl 
 * @returns {Array} of object of links and song title
 *//**
 * 
 * @param {String} songLink
 * @returns {Object} of download link and song title 
 */module.exports={getSongs:getSongs,getSong:getSong//todo add cache to reduce call to server
//feature allow multiple downloads
};