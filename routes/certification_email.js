var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto'); //AES암호화를 위한 모듈
var nodemailer = require('nodemailer'); //이메일인증
var smtpTransport = require('nodemailer-smtp-transport');

//클라이언트 POST request data의 body로 부터 파라미터를 편리하게 추출
var bodyParser = require('body-parser');

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host: "localhost", //서버 로콜 IP
    port: 3306, //mysql기본 포트
    user: "root", //DB 계정 ID
    password: "Mos3231!", //DB 계정 PW
    database: "vitable_care", //접속 DB
    multipleStatements: true//다중쿼리를 위한 설정
});


router.get('/', function (req, res, next) {

    res.render('sign_up', {
        // title: '회원관리'
    });
});


router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

//membership 라우터
router.post('/', function (req, res) {

    var e_mail = req.body.e_mail;

    var email_check_code_sql = 'INSERT INTO email_checker (e_mail_code,check_final,email) VALUES (?,?,?);';
    var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
    var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
    var e_mail_code = key_one + key_two;

    var check_final =0;
    //randomBytes를 사용하여 256자의 랜덤값을 만든 후, hex로 인코딩해서 100번째부터 5자 +base64로 인코딩하여 50번째부터 5자

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: 'shinebin51@gmail.com',
            pass: 'gogobebe3231!'
        }
    }));

    var mailOptions = {
        from: 'shinebin51@gmail.com',
        to: e_mail,
        subject: 'VITABLE CARE',
        text: '이메일 인증을 위해 아래의 인증코드를 작성해주세요.' + e_mail_code

    };


    connection.query(email_check_code_sql, [e_mail_code, check_final,e_mail],
        function (error, result, fields) {

            if (error) { //에러 발생시
                console.log('sql에러');
                console.log('=====인증코드는 ', e_mail_code);
                res.send('err: ' + error)
            } else { // 실행성공
                console.log('성공!');
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('sendmail 에러');
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send('<script type="text/javascript">confirm("이메일을 확인해주세요.");location.replace("/sign_up");</script>');

                    }
                });
            }
        })




});

module.exports = router;
