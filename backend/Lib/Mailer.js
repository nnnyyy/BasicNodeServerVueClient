const configFile = require('../config/MailerConf.json');
const nodemailer = require('nodemailer');

class MailHelper {
    constructor() {

    }

    sendMail(to, subject, content) {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: configFile.user,  // gmail 계정 아이디를 입력
                pass: configFile.pass   // gmail 계정의 비밀번호를 입력
            }
        });

        let mailOptions = {
            from: configFile.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: to ,                     // 수신 메일 주소
            subject: subject,   // 제목
            text: content  // 내용
        };

        return new Promise((res,rej)=> {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res({ret: -1, res: null, err: error})
                }
                else {
                    res({ret: 0, res: info.response, err: error})
                }
            });
        })        
    }
}

helper = new MailHelper

module.exports = helper