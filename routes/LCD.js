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
    var patient_info_Query = "SELECT * FROM patient_information;";
    connection.query(patient_info_Query,
        function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.render('LCD', {
                    data: rows
                });
            }
        });
});


router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

//membership 라우터
router.post('/', function (req, res) {




});


module.exports = router;
