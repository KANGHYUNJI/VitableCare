var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var MySQLStore = require('express-mysql-session');


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


router.get('/', function (req, res, next) {
    res.render('login', {
        //  title: '로그인'
    });
});

router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();


//login POST
router.post('/', function (req, res, next) {

    var login_ID = req.body.login_ID;
    var login_PW = req.body.login_PW;
    var ID_find_sql = 'SELECT * from membership where ID=?;' + 'SELECT * from approval_ID where licensed=?;' + 'SELECT * from membership where ID =? AND PW =?;';

    var login_cipher = crypto.createCipher('aes256', 'password');
    login_cipher.update(login_PW, 'ascii', 'hex');
    var login_cipher_after = login_cipher.final('hex');

    //DB에 연결 후 ID,PW비교
    connection.query(ID_find_sql, [login_ID, login_ID, login_ID, login_cipher_after], function (err, results) {

        if (err)
            console.log(err);

        if (!results[0][0]) {

            return res.send('<script type="text/javascript">confirm("아이디를 찾을 수 없습니다.");location.replace("/login");</script>');
        }

        if (results[0][0].ID === login_ID) {
            if (!results[1][0]) {
                res.send('<script type="text/javascript">confirm("회원 가입 승인이 아직 이루어지지 않았습니다. 관리자에게 문의하세요.");location.replace("/login");</script>');
            } else {
                if (!results[2][0]) {
                    return res.send('<script type="text/javascript">confirm("비밀번호를 확인하세요");location.replace("/login");</script>');
                }

                if (results[2][0].PW === login_cipher_after) {
                    req.session.displayName = results[0][0].name;
                    var patient_info_Query = "SELECT * FROM patient_information;";
                    connection.query(patient_info_Query,
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render('patient_list', {
                                    data: rows
                                });


                            }
                        });
                }
            }

        }

    });
});


module.exports = router;
