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

                var decipher = crypto.createDecipher('aes256', 'password');
                decipher.update(rows[0].patient_social_security_number, 'hex', 'ascii');
                var decipher_after = decipher.final('ascii');
                res.render('bio_information', {
                    data: rows,
                    data1: decipher_after
                });


            }
        });



});

//mysql 접속
connection.connect();

router.post('/', function (req, res) {


    /*var patient_list1_name = req.body.name1;
    console.log('이름', patient_list1_name);

    var fatient_info_sql = 'SELECT * from patient_information WHERE patient_name=?;';



    connection.query(fatient_info_sql, function (err, result) {

        if (err)
            console.log(err);

        if (!result[0]) {
            res.send('<script type="text/javascript">confirm("환자정보를 찾을 수 없습니다.");location.replace("/patient_list");</script>');
        } else {
            res.render('patient_list', {
                title: '환자정보',
                message: '',
                data: result
            });
        }

    });*/


});


module.exports = router;
