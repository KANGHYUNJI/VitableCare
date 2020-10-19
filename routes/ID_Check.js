var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ID_check;
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


router.use(bodyParser.urlencoded({
    extended: true
}));

//mysql 접속
connection.connect();

//membership 라우터
router.post('/', function (req, res) {
    var ID_check = req.body.ID;

    var ID_check_sql = 'SELECT * from membership where ID=?;';

    connection.query(ID_check_sql, [ID_check], function (error, result, fields) {

        if (error) { //에러 발생시
            res.send('err: ' + error)
        }
        if (result != 0 || ID_check == '') { // 중복값이 있다면

            res.send('<script type="text/javascript">alert("이미 사용중인 아이디이거나 입력하시지않았습니다..");location.replace("/sign_up");</script>')
        } else {
            connection.query("INSERT INTO ID_check (check_id) VALUES ('" + ID_check + "');",
                function (error, result, fields) {

                    if (error) { //에러 발생시
                        res.send('err: ' + error)
                    } else {
                        console.log('성공!');
                        res.send('<script type="text/javascript">confirm("사용 가능한 아이디입니다.");location.replace("/sign_up");</script>');

                    }
                });
        }
    });
});

module.exports = router;
