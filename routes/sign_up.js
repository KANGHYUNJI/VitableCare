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
    multipleStatements: true
});


router.get('/', function (req, res, next) {
    res.render('sign_up', {
        //  title: '회원가입'
    });
});

router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

//membership 라우터
router.post('/', function (req, res) {

    var ID = req.body.ID;
    var PW = req.body.PW;
    var NAME = req.body.name;
    var E_MAIL = req.body.e_mail;
    var PHONE_NUM = req.body.phone_num;
    var BIRTH = req.body.birth;
    var CODE_NUM = req.body.code_num;
    var E_MAIL_CERTIFICATION = req.body.e_mail_certification;
    var membership_sql = 'INSERT INTO membership (ID,PW,name,e_mail,phone_num,birth,code_num) VALUES (?,?,?,?,?,?,?);'
    var ID_find_sql = 'SELECT * FROM ID_check WHERE check_id=?;' + 'SELECT * FROM email_checker WHERE check_final=?;' + 'SELECT * FROM email_checker WHERE email=?;';
    //var E_MAIL_CERTIFICATION_find_sql = 'SELECT * FROM email_checker WHERE e_mail_code=?';
    var ID_check_delet_sql = 'DELETE from ID_check;' + 'DELETE from email_checker;';
    //var ID_check_email_delet_sql = 'DELETE from email_checker;';

    connection.query(ID_find_sql, [ID, 1, E_MAIL], function (err, results) {
        console.log('========dadsakljdksljadlksjlakjd');
        console.log('============000000000>', results[0]);
        console.log('============000000000>', results[1]);
        console.log('============??????????>', results[2]);
        if (err)
            console.log(err);

        else if (results[0] == '' || !results[0]) {
            res.send('<script type="text/javascript">confirm("중복 확인한 아이디가 아닙니다.");location.replace("/sign_up");</script>');
        }
        else if (results[1] == '' || !results[1]) {
            res.send('<script type="text/javascript">confirm("이메일인증을 하지 않으셨습니다.");location.replace("/sign_up");</script>');
        }
        else if (results[2] == '' || !results[2]) {
            res.send('<script type="text/javascript">confirm("이메일인증을 진행했던 이메일 주소가 아닙니다.");location.replace("/sign_up");</script>');
        } else {
            var cipher = crypto.createCipher('aes256', 'password');
            cipher.update(PW, 'ascii', 'hex');
            var cipher_after = cipher.final('hex');
            /* var Cipher객체 = crypto module.createCipher('암호화 방식', '암호화 key');
Cipher객체.update('평문(암호화 이전 글)'[, 'input type'][, 'output type']); 인풋 타입과 아웃풋 타입은 생략 가능
var 암호문 = cipher.final(['output type']); */

            if (ID && PW) { //ID와 PW가 ㅡ유효하다면

                //SQL문 실행
                connection.query(membership_sql, [ID, cipher_after, NAME, E_MAIL, PHONE_NUM, BIRTH, CODE_NUM],
                    function (error, result, fields) {

                        if (error) { //에러 발생시
                            res.send('err: ' + error)
                        } else { // 실행성공
                            res.send('<script type="text/javascript">confirm("회원가입이 완료되었습니다.");location.replace("/login");</script>');
                        }
                    });

                connection.query(ID_check_delet_sql,
                    function (error, result, fields) {

                        if (error) { //에러 발생시
                            res.send('err: ' + error)
                        } else { // 실행성공
                            console.log('아이디체크 데이터와 이메일인증 데이터 삭제완료');
                        }
                    });
            }

        }



    });
});


module.exports = router;
