var path = require('path');

var directories = ['Users', 'SAMSUNG', 'docs'];
// 세 개의 정보가 ','를 기준으로 문자열로 붙어서 리턴
var dirStr = directories.join();
console.log('dir : ' + dirStr);

// file seperator '\'를 기준으로 문자열로 붙어서 리턴
var dirStr2 = directories.join(path.sep);
console.log('dir2 : ' + dirStr2);

// *** file의 path를 구성하기 위한 각각의 요소를 서로 붙여줌
var filepath = path.join('/Users/SAMSUNG', 'notepad.exe');
console.log('filepath : ' + filepath);

var dirname = path.dirname(filepath);
console.log('dirname : ' + dirname);

// basename은 file name
var basename = path.basename(filepath);
console.log('basename : ' + basename);

// '.'까지 포함한 확장자
var extname = path.extname(filepath);
console.log('extname : ' + extname);