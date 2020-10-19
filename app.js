var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//-------------------------내가 입력한 것들----------------------------------------
var Sign_upRouter = require('./routes/sign_up');
var LoginRouter = require('./routes/login');
var ID_CheckRouter = require('./routes/ID_Check');
var Patient_infoRouter = require('./routes/patient_info');
var Patient_informationRouter = require('./routes/patient_information');
var Certification_emailRouter = require('./routes/certification_email');
var Confirm_emailRouter = require('./routes/confirm_email');
var Patient_lsitRouter = require('./routes/patient_list');
var Bio_informationRouter = require('./routes/bio_information');
var LcdRouter=require('./routes/LCD');
var Lcd1Router=require('./routes/LCD1');
var patientinfoRouter=require('./routes/patient_info');
var graphRouter=require('./routes/graph');
var smoothieRouter=require('./routes/smoothie');

//--------------------------------------------------------------
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var crypto = require('crypto'); //AES암호화를 위한 모듈

//mysql 커넥션 생성
var connection = mysql.createConnection({
    host: "localhost", //서버 로컬 IP
    port: 3306, //mysql기본 포트
    user: "root", //DB 계정 ID
    password: "Mos3231!", //DB 계정 PW
    database: "vitable_care" //접속 DB
});

// -------------------------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//-------------------------------------------------------------
app.set('view engine', 'ejs'); //ejs를 그리기위한 코드
app.set('views', './views');
//-------------------------------------------------------------


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({
    extended: false
})); //미들웨어 등록부분

//resave 세션아이디를 접속할때마다 발급하지 않는다.
app.use(session({
    secret: '!@#$^&*', //세션을 암호화해줌
    resave: false, //세션을 항상 저장할지 여부를 정하는 값.(false 권장)
    saveUninitialized: true, // 초기화되지 않은채 스토에 저장되는세션
    store: new MySQLStore({ //데이터를 저장되는 형식
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Mos3231!',
        database: 'vitable_care'
    })

}));


app.get('/login_session', function (req, res) {

    delete req.session.displayName; //세션삭제
    var session_not_login = '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}';
    var session_delete = 'DELETE FROM sessions WHERE data=?;';
    connection.query(session_delete, [session_not_login],
        function (err, not_in) {
            if (err)
                console.log(err);

            else
                console.log('성공');
        });

    req.session.save(function () { //데이터 저장이 끝났을때 호출됨 안전하게 redirect하기 위함
        res.redirect('/login');
    });
});




/*app.get('/', function (req, res) {
    if (!req.session.name)
        res.redirect('/login');
    else
        res.redirect('/login_session');
});*/

/*app.get('/login', function (req, res) {
    if (!req.session.name)
        res.render('login', {
            message: '아이디와 비밀번호를 입력하세요',
            title: 'login'
        });
    else
        res.redirect('/login_session');
});*/

/* app.get('login_session', function (req, res) {
    if (!req.session.name)
        return res.resdirect('/login');
    else
        res.render('login_session', {
            name: req.session.name,
            title: 'login_session'
        });
}); */

/*app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});*/

//----------------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);

//<------내가 입력 -----------------------------------------------------
app.use('/sign_up', Sign_upRouter);
app.use('/login', LoginRouter);
app.use('/ID_Check', ID_CheckRouter);
app.use('/patient_info', Patient_infoRouter);
app.use('/patient_information', Patient_informationRouter);
app.use('/certification_email', Certification_emailRouter);
app.use('/confirm_email', Confirm_emailRouter);
app.use('/patient_list', Patient_lsitRouter);
app.use('/bio_information', Bio_informationRouter);
app.use('/LCD', LcdRouter);
app.use('/LCD1', Lcd1Router);
app.use('/patient_info', patientinfoRouter);
app.use('/graph', graphRouter);
app.use('/smoothie', smoothieRouter);
//--------------------------------------------------------------------

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(app.get('port'), function () {
    console.log("서버가 성공적으로 가동 했습니다.");
});


//테스트입니다.
