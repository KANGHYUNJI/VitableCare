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

//mysql 접속
connection.connect();

router.get('/', function (req, res) {

    var users;
    var sensor_Query = "SELECT * FROM sensor;";
    connection.query(sensor_Query,
        function (err, rows) {
            if (err) {
                console.log(err);

            } else {

                var sensor1 = [
                    {
                        Wave: rows[rows.length-1].Wave,
                        Hr: rows[rows.length-1].Hr,
                        Spo2: rows[rows.length-1].Spo2
    }
    ]
                return res.json(sensor1);

            }
        });

});

router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = router;
