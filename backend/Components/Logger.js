let winston = require('winston')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

let winstonDaily = require('winston-daily-rotate-file')
let moment = require('moment')

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;    // log 출력 포맷 정의
});

const options = {
    // log파일
    file: {
      level: 'info',
      filename: `c:/logs/GamLive/Server_%DATE%.log`, // 로그파일을 남길 경로
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      format: combine(        
        timestamp(),
        myFormat    // log 출력 포맷
      )
    },
    // 개발 시 console에 출력
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false, // 로그형태를 json으로도 뽑을 수 있다.
      colorize: true,
      format: combine(        
        timestamp(),
        myFormat
      )
    }
  }

class Logger {
    constructor() {
        let self = this;
        this.logger = winston.createLogger({
            transports: [
                new winstonDaily(options.file),
                new winston.transports.Console(options.console)
            ]
        })        
    }
    
    timeStampFormat() {
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ')
    }
}

let _obj = new Logger()

module.exports = _obj.logger;