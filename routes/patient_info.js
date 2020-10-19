var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto'); //AES암호화를 위한 모듈



//클라이언트 POST request data의 body로 부터 파라미터를 편리하게 추출
var bodyParser = require('body-parser');

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host: "localhost", //서버 로콜 IP
    port: 3306, //mysql기본 포트
    user: "root", //DB 계정 ID
    password: "Mos3231!", //DB 계정 PW
    database: "vitable_care", //접속 DB
    multipleStatements: true //다중 쿼리 사용
});


router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

router.get('/', function (req, res, next) {
    res.render('patient_info', {
        title: '환자정보1',
        message: '',
        data: res
    });
});

//membership 라우터
router.post('/', function (req, res) {

    var fatient_info_sql = 'SELECT * from patient_information;';

    connection.query(fatient_info_sql, function (err, result) {


        if (err)
            console.log(err);

        if (!result[0]) {
            return res.send('<script type="text/javascript">confirm("환자정보를 찾을 수 없습니다.");location.replace("/patient_info");</script>');
        } else {
            res.render('patient_info', {
                title: '환자정보2',
                message: '',
                data: result
            });
        }

    });

});


module.exports = router;
