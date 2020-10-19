//patient_information.js
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');


//클라이언트 POST request data의 body로 부터 파라미터를 편리하게 추출
var bodyParser = require('body-parser');

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host: "localhost", //서버 로콜 IP
    port: 3306, //mysql기본 포트
    user: "root", //DB 계정 ID
    password: "Mos3231!", //DB 계정 PW
    database: "vitable_care" //접속 DB
});


router.get('/', function (req, res, next) {
    res.render('patient_information', {
        title: '환자정보'
    });
});

router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

//patient_infomation 라우터
router.post('/', function (req, res) {
    var patient_name = req.body.patient_name;
    var patient_sex = req.body.patient_sex;
    var patient_social_security_number = req.body.patient_social_security_number;
    var patient_room = req.body.patient_room;
    var patient_disease = req.body.patient_disease;
    var hospitalization_date = req.body.hospitalization_date;
    var doctor_name = req.body.doctor_name;
    var patient_age = req.body.patient_age;
    var guardian_name = req.body.guardian_name;
    var guardian_phone = req.body.guardian_phone;

    var cipher = crypto.createCipher('aes256', 'password');
    cipher.update(patient_social_security_number, 'ascii', 'hex');
    var cipher_after = cipher.final('hex');


    var decipher = crypto.createDecipher('aes256', 'password');
    decipher.update(cipher_after, 'hex', 'ascii');
    var decipher_after = decipher.final('ascii');

    console.log('------------>', cipher_after);

    var patient_info_sql = 'INSERT INTO patient_information (patient_name,patient_sex,patient_social_security_number,patient_room,patient_disease,hospitalization_date,doctor_name,patient_age,guardian_name,guardian_phone) VALUES (?,?,?,?,?,?,?,?,?,?);'

    connection.query(patient_info_sql, [patient_name, patient_sex, cipher_after, patient_room, patient_disease, hospitalization_date, doctor_name, patient_age, guardian_name, guardian_phone],
        function (error, result, fields) {

            if (error) { //에러 발생시
                res.send('err: ' + error)
            } else { // 실행성공

                res.send('<script type="text/javascript">confirm("환자정보를 저장했습니다.");location.replace("/patient_list");</script>');
            }
        })
});

module.exports = router;
