// winston 모듈을 이용하여 log file 만들기

var winston = require('winston');

// 매일 다른 로그 파일을 생성
var winstonDaily = require('winston-daily-rotate-file');
// 날짜, 시간 관련 기능들
var moment = require('moment');

// 현재 시간 포맷 만들기
function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

// log를 찍는 설정 객체 logger
var logger = new (winston.Logger)({
    transports: [
        new (winstonDaily)({
            name:'info-file',
            filename:'./log/server',
            datePattern:'_yyyy-MM-dd.log',
            colorize:false,
            maxsize:50000000,
            maxFiles:1000,
            level:'info',
            showLevel:true,
            json:false,
            timestamp:timeStampFormat
        }),
        new (winston.transports.Console)({
            name:'debug-console',
            colorize:true,
            level:'debug',
            showLevel:true,
            json:false,
            timestamp:timeStampFormat
        })
    ]
});

logger.debug('디버깅 메시지입니다.');
logger.error('에러 메시지입니다.');
