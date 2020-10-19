var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
//클라이언트 POST request data의 body로 부터 파라미터를 편리하게 추출
var bodyParser = require('body-parser');

//mysql 커넥션 생성

/*router.get('/', function (req, res, next) {
    res.render('smoothie1', {
        data:res
    });

});*/

router.use(bodyParser.urlencoded({
    extended: true
}));



var connection = mysql.createConnection({
    host: "localhost", //서버 로콜 IP
    port: 3306, //mysql기본 포트
    user: "root", //DB 계정 ID
    password: "Mos3231!", //DB 계정 PW
    database: "vitable_care", //접속 DB
    multipleStatements: true //다중 쿼리 사용
});



//mysql 접속
connection.connect();
//membership 라우터
router.get('/', function (req, res) {

    res.render('smoothie', {

    });

});


module.exports = router;
