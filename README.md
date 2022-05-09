## `Vitable Care`<br>: 라즈베리파이를 활용한 의료 IOT 기기 및 환자 통합관리 시스템
> **Project Period** : 2019.09.02 ~ 2019.12.13   
> **Description** : 생체정보값을 실시간으로 저장해 웹으로 시각화함으로써 환자들의 정보를 통합적으로 관리하는 시스템을 제공하여, 간호사들의 업무 부담을 줄이고 질 좋은 의료 서비스를 제공할 수 있도록 하는 목적을 가지고 있다.  

1. HardWare   
 
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165087907-931d2bcb-88f0-454c-9978-6bc31d13d353.png" width="300" height="300">
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165088102-10ad3436-0311-4427-8e8a-57784ee9f3c4.png" width="300" height="200">   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; < 센서작동 프로그램 >
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; < 케이스 3D모델 >  

* 센서작동 프로그램   
&#45; 센서가 제대로 인식되었을 때 위와 같이 심박수, 산소포화도의 측정 값을 수치와 파형을 통해 확인   
&#45; 주기적으로 상태를 검사하고 정상적으로 인식된 측정 값은 서버에 연동된 DB에 저장   
* 케이스 3D모델   
&#45; 라즈베리파이와 센서를 내장한 케이스 제작   
&#45; LCD를 통해 직접적으로 센서 값 확인 가능   

2. SortWare   

&nbsp;&nbsp;&nbsp;&nbsp; < 회원가입 >
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; < 로그인 >   
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165086014-ccdf660b-b37e-4551-aa85-1d84b94031a8.png" width="300" height="150">
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165086104-12482743-d2b3-4e6c-85c6-99b3c4df332b.png" width="300" height="150">   
&nbsp;&nbsp;&nbsp;&nbsp; < 메인 >
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; < 상세정보 >   
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165078589-37bb0706-2700-4397-b223-fa7c5f2b74d5.png" width="300" height="150">
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/50947775/165085561-8d5e9fcd-9a6c-41b7-b4fb-42d507e559e2.png" width="300" height="150">   

* 회원가입   
&#45; 사용자(의료관계인) 정보 값 입력하여 회원가입 진행   
&#45; 아이디 중복 검사를 통해 한 사람당 하나의 아이디로만 생성 가능   
&#45; 이메일 인증을 통해 본인인증 과정 진행   
&#45; 패스워드는 AES암호화되어 DB에 저장   
&#45; 모든 정보를 입력하면 회원가입 완료   

* 로그인   
&#45; 병원 측 관리자(보안담당자)가 회원 가입 대상을 확인하고 승인하면 로그인 가능   
&#45; 회원가입되어 DB에 저장된 아이디 및 비밀번호와 비교하여 일치할 시 로그인 성공   

* 메인   
&#45; 로그인하면 보여지는 첫 화면   
&#45; 입원한 환자들의 대략적인 정보(이름, 성별, 생년월일 등)가 보여지며, 심박수와 산소포화도 값 또한 확인 가능   
&#45; 새로운 환자 추가 시 상세 정보 페이지로 전환되며, 메인 페이지에서도 즉각적으로 자동 추가되어 반영   

* 상세정보   
&#45; 메인페이지에서 환자 한 명을 선택하면 보여지는 상세 정보 화면   
&#45; 환자의 주민번호와 같은 보안이 필요한 정보는 AES암호화되어 DB에 존재   
&#45; 각 환자별 자세한 인적사항과 생체정보의 실시간 수치 및 그래프를 조회 가능   
&#45; 실시간으로 측정되고 있는 환자의 센서 값을 JSON형식으로 반환받고, Ajax통신을 통해 0.5초 단위로 업데이트

<br>
&nbsp;&nbsp; <모바일버전>   
<img src="https://user-images.githubusercontent.com/50947775/165078130-620efe0f-dae9-49fe-b9d3-3603878f323f.png" width="500" height="200">

* 모바일 버전   
&#45; 편의성을 제공하기 위해 반응형 웹으로 구현   
&#45; 의료진들은 이동하며 즉각적인 확인 및 관리 가능   

## Environment   
* Operation System
  - Ubuntu
  - Raspberry Pi 3B
  - Google Cloud
* Tools
  - Node.js
  - Mysql
  - Express
  - Bracket
  - Bootstrep 4
* Language
  - C
  - HTML
  - javascript
  - CSS 

## Contact
email: khyunji9@naver.com
