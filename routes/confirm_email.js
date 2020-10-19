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
    multipleStatements: true //다중쿼리를 위한 설정
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

    console.log('컨펌 실행됨');
    var Email_check = req.body.e_mail_certification;

    var email_check_sql = 'SELECT * FROM email_checker WHERE e_mail_code=?';
    var email_check_code_sql = "UPDATE email_checker SET check_final =? where e_mail_code=?;";

    connection.query(email_check_sql, [Email_check],
        function (error, result, fields) {
            console.log('쿼리는 실행됨');
            if (error) { //에러 발생시
                res.send('err: ' + error)
            }
            if (!result[0] || Email_check == '') { // 인증코드가 틀리거나 입력하지 않으면
                //console.log('----------->', result[0].e_mail_code);
                console.log('인증코드가 틀리면 조건문 실행');
                res.send('<script type="text/javascript">alert("인증코드가 틀리거나 입력하시지않았습니다..");location.replace("/sign_up");</script>')
            } else {
                console.log('else문 실행됨');
                connection.query(email_check_code_sql, [1,Email_check],
                    function (error, result, fields) {

                        if (error) { //에러 발생시
                            res.send('err: ' + error)
                        } else {
                            console.log('성공!');
                            res.send('<script type="text/javascript">alert("인증되었습니다.");location.replace("/sign_up");</script>');
                        }
                    });
            }
        });
});

module.exports = router;
