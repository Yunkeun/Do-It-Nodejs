var url = require('url');

var urlStr = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=popcorn';
// parse() : URL 문자열을 입력하면 URL 객체를 만든다. 'format()'의 반대  
var curUrl = url.parse(urlStr);
console.dir(curUrl);

console.log ('query -> ' + curUrl.query);

// format() : URL 객체를 입력하면 URL 문자열을 반환한다. 'parse()'의 반대  
var curStr = url.format(curUrl);
console.log('url -> ' + curStr);

var querystring = require('querystring');
var params = querystring.parse(curUrl.query);
console.log('검색어 : ' + params.query);