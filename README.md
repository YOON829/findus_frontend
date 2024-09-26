### 프로젝트 개요

FIND US는 애니메이션에서 나온 장소(로케이션) 정보를 **한 곳에서 쉽게 검색하고 관리할 수 있도록 돕기 위한 웹 애플리케이션** 입니다. 기존에는 로케이션 정보가 커뮤니티 및 블로그에 분산되어 정보를 얻기 어려웠으며, 사용자는 원하는 장소에 대한 정보를 찾기 위해 많은 시간을 소비해야 했습니다. 이 프로젝트는 이러한 문제를 해결하기 위해 최신 장소 정보와 **사용자 리뷰, 즐겨찾기 기능** 을 제공하여 여행자들이 쉽게 정보를 찾고 관리할 수 있도록 돕습니다.


### 기능요약

인터렉티브 맵 : **등록된 마커들을 통해 해당 로케이션**에 대한 더 자세한 정보를 얻을 수 있는 기능 
지역별 장소 조회:  **지역에 있는 로케이션을 검색** 할 수 있는 기능
작품별 장소 조회: **애니메이션 마다 있는 로케이션을 검색** 할 수 있는 기능
리뷰 기능: 사용자가 **로케이션에 대한 리뷰를 작성하고 평가** 할 수 있는 기능
즐겨찾기 기능: 마음에 드는 **로케이션을 즐겨찾기 목록에 추가하고 관리** 할 수 있는 기능
구글 로그인: 구글 계정을 사용해 **로그인 및 인증** 이 가능

### 서비스 기대효과

시간 절약 : 여러 커뮤니티나 블로그에서 **정보를 일일이 검색할 필요 없이**, 한 곳에서 원하는 애니메이션 장소 정보를 쉽게 찾을 수 있어 사용자들이 소요하는 시간을 크게 절약할 수 있습니다.
여행 계획 최적화 : **지역별, 작품별 로케이션 정보를 한눈에 확인**하고, 사용자 리뷰와 평점을 참고하여 여행 일정을 더욱 효율적으로 구성할 수 있습니다.

### 폴더구조
```bash
findus_front_end/
├── build/                          # 빌드된 정적 파일들
├── node_modules/                   # 라이브러리 종속성 파일
├── public/                         # 공개적으로 접근 가능한 정적 자원
├── src/                            # 소스 코드
│   ├── components/                 # 재사용 가능한 컴포넌트
│   ├── context/                    # React 컨텍스트 파일들
│   ├── css/                        # CSS 스타일 시트
│   ├── fonts/                      # 폰트 파일
│   ├── html/                       # HTML 파일
│   ├── pages/                      # 각 페이지 컴포넌트
│   └── services/                   # API 통신 등 서비스 로직
│   ├── App.css                     # App 컴포넌트 스타일
│   ├── App.js                      # App 루트 컴포넌트
│   ├── App.test.js                 # App 컴포넌트 테스트 파일
│   ├── index.css                   # 전역 스타일 시트
│   └──index.js                    # 엔트리 포인트
├── .env                            # 환경변수
├── .env.development                # 개발 환경변수
├── .env.production                 # 프로덕션 환경변수
├── .gitignore                      # Git에서 추적하지 않을 파일 목록
├── package.json                    # 프로젝트 메타데이터 및 종속성 목록
├── package-lock.json               # 종속성 버전을 고정
└── README.md                       # 프로젝트 설명
```
```bash
findus_back_end/
├── config/                         # 설정 파일
├── controllers/                    # 요청을 처리하는 컨트롤러
├── middlewares/                    # 미들웨어 파일
├── models/                         # 데이터베이스 모델
├── node_modules/                   # 라이브러리 종속성 파일
├── passport/                       # Passport 인증 설정
├── public/                         # 공개적으로 접근 가능한 정적 자원
├── routes/                         # 라우터 파일
├── uploads/                        # 업로드 파일 저장 폴더
├── views/                          # 템플릿 뷰 파일
├── .env                            # 환경변수
├── .env.development                # 개발 환경변수
├── .env.production                 # 프로덕션 환경변수
├── .gitignore                      # Git에서 추적하지 않을 파일 목록
├── .prettierignore                 # Prettier에서 제외할 파일 목록
├── app.js                          # 어플리케이션 진입점
├── package.json                    # 프로젝트 메타데이터 및 종속성 목록
└── package-lock.json               # 종속성 버전을 고정
```

### AWS 아키텍쳐
![](https://velog.velcdn.com/images/ue1700/post/ad3584b3-739e-44d6-af89-8c99e97ca2f0/image.png)
AWS 클라우드 인프라를 기반으로 구축된 웹 애플리케이션입니다. 사용자의 요청은 AWS Route 53을 통해 관리되는 도메인 이름 시스템(DNS)에 의해 처리되며, EC2 인스턴스들이 프론트엔드와 백엔드 서버 역할을 수행합니다. 데이터는 AWS RDS에서 관리하는 MySQL 데이터베이스에 저장됩니다.

#### 구성 요소
Route 53 (DNS)
도메인: https://findus-jp.link
사용자의 요청을 적절한 서버로 라우팅합니다.

EC2 (Web Server - Frontend)
정적 리소스 및 클라이언트 사이드 렌더링을 처리합니다.
Nginx를 통해 React 기반의 프론트엔드 애플리케이션을 서빙합니다.

EC2 (Web Application Server - Backend)
Node.js와 Express 프레임워크를 사용하여 API 요청을 처리합니다.
사용자 인증, 데이터 처리 등 백엔드 로직을 수행합니다.
RDS (MySQL)
데이터베이스 관리 시스템으로 MySQL을 사용합니다.
사용자 데이터, 애플리케이션 데이터 등을 저장하고 관리합니다.

#### 트래픽 흐름
사용자는 웹 브라우저를 통해 https://findus-jp.link 도메인으로 접속합니다.
Route 53은 사용자의 요청을 프론트엔드 서버로 라우팅합니다.
프론트엔드 서버는 사용자에게 웹 페이지를 제공하고, 추가 데이터 요구사항은 백엔드 서버로 요청합니다.
백엔드 서버는 필요한 데이터를 처리하고 RDS에서 데이터를 조회하거나 저장 후 결과를 반환합니다.


### ERD
![](https://velog.velcdn.com/images/ue1700/post/2e3168f5-4790-4291-bf58-e4af03343cbc/image.png)



### 기술 스택 (Tech Stack)
| 구성 요소        | 기술 스택                               |
|------------------|-----------------------------------------|
| **프론트엔드**   | React                                   |
| **백엔드**       | Node.js, Express                        |
| **데이터베이스** | MySQL (Sequelize ORM 사용)              |
| **배포**         | AWS EC2, RDS, Route 53, ALB             |


### 설치 및 실행 방법 (Installation and Setup)
의존성 설치
```js
npm install
```
프론트엔드 빌드
```js
cd findus_frontend
npm run build

```
백엔드 서버 실행
```js
cd findus_backend
npm start
```

### 서버 구축 및 배포 과정 (Deployment Guide)
- EC2 인스턴스 생성 및 보안 그룹 설정
인스턴스 생성 후, HTTP(80), HTTPS(443), SSH(22), API 포트(5000 등) 오픈.

- 프론트엔드 - Nginx 설치
Nginx 설치 및 설정 후 React 빌드 파일 서빙.
Nginx 설정에서 root를 React 빌드 파일 경로로 지정 후 Nginx 재시작.

- 백엔드 - Node.js 및 PM2 설치
환경 변수 설정
.env 파일에 필요한 환경 변수 (포트, DB 정보 등) 설정.

- 도메인 설정 (Route 53)
Route 53을 사용해 도메인과 EC2 인스턴스 연결.

- HTTP에서 HTTPS로 전환
HTTP 트래픽을 자동으로 HTTPS로 리디렉션하여 보안을 강화.



### 스크린샷 및 데모 (Screenshots & Demo)

![](https://velog.velcdn.com/images/ue1700/post/51264863-3f0d-4cec-8766-6cda5ec84803/image.png)

배포된 사이트: findus-jp.link



### 사용 사례 및 FAQ (Usage Examples & FAQ)

- 애니메이션 장소 검색
사용자가 웹사이트에 접속하여 탐색창에 특정 애니메이션 제목이나 장소를 조회하고, 결과로 나온 장소 목록에서 원하는 장소를 선택하여 상세 정보를 확인합니다.

- 장소 상세 정보 확인
사용자가 인기 애니메이션의 특정 장소를 클릭하여 해당 장소의 사진, 주소, 관련 작품, 리뷰 등을 확인하고, 필요한 경우 위치를 지도에서 탐색합니다.

- 리뷰 작성:
사용자가 방문한 장소에 대한 리뷰를 작성합니다. 리뷰 작성 시 별점을 매기고, 간단한 코멘트를 작성합니다

- 북마크 기능 활용:
사용자가 자주 방문하거나 나중에 방문하고 싶은 장소를 북마크합니다. 이를 통해 사용자는 북마크한 장소 목록을 쉽게 관리하고, 필요할 때 다시 확인할 수 있습니다.


Q: 어떻게 장소를 북마크할 수 있나요?
A: 장소 상세 페이지에서 북마크 버튼을 클릭하여 즐겨찾기에 추가할 수 있습니다.

Q: 리뷰는 어떻게 쓰나요?
A: 구글 로그인 후에 리뷰 작성이 가능합니다.

Q: 어떤 애니메이션이 있나요?
A: 러브라이브 시리즈 ,  봇치 더 록! 이 있습니다. 추후 업데이트 예정입니다.


### API 설계서 (API Documentation)

1. GET /api/place/:placeId
설명 특정 장소의 상세 정보를 가져옵니다.
요청 예시
GET /api/place/162
응답 예시:
```json
{
  "place_id": 162,
  "work_id": 58,
  "user_id": null,
  "place_name": "KOWA 관광망원경",
  "description": "OVA 엔딩  「SINGING, DREAMING, NOW!」 의 장면 (QU4RTZ)",
  "address_region": "도쿄",
  "address_city": "도쿄",
  "address_district": "오다이바",
  "detailed_address": "일본 〒135-0091 Tokyo, Minato City, Daiba, 1 Chome−4, お台場海浜公園 (부정확)",
  "latitude": "35.627708649691",
  "longitude": "139.771510075224",
  "latestshot_date": "2023-12-08",
  "opening_hours": "24시간 영업",
  "Images": [
    { "image_url": "/uploads/aniPlace/162.PNG" },
    { "image_url": "/uploads/realPlace/162.PNG" },
    { "image_url": "/uploads/userUpload/162.PNG" }
  ],
  "Work": {
    "work_name": "러브 라이브! 니지가사키 학원 스쿨 아이돌 동호회",
    "work_season": "ova",
    "work_ep": "ova"
  }
}
```
2. POST /api/review
설명: 새로운 리뷰를 작성합니다.
요청 예시:
POST /api/review
요청 본문:
```json
{
  "place_id": 162,
  "user_id": 1,
  "rating": 5,
  "comment": "Great place!"
}
```
응답 예시:
``` json
{
  "message": "Review successfully added"
}
```

3. POST /api/bookmark
설명: 장소를 즐겨찾기에 추가하거나 제거합니다.
요청 예시:
POST /api/bookmark
요청 본문:

```json
{
  "place_id": 162,
  "user_id": 1,
  "check": true
}
```

응답 예시:
```json
{
  "message": "Bookmark added successfully"
}
```
4. GET /api/work/all
설명: 모든 작품의 목록을 가져옵니다.
요청 예시:
GET /api/work/all
응답 예시:

```json
[
  {
    "work_name": "러브 라이브! 니지가사키 학원 스쿨 아이돌 동호회",
    "poster": "/uploads/poster/nijigasaki_1.webp",
    "work_key": "nijigasaki"
  },
  {
    "work_name": "러브 라이브! 선샤인!!",
    "poster": "/uploads/poster/sunshine_1.webp",
    "work_key": "sunshine"
  }
]
```
5. GET /api/work/
설명: 특정 작품의 상세 정보를 가져옵니다.
요청 예시:
GET /api/work/nijigasaki
```json
{
  "work": {
    "work_name": "러브 라이브! 니지가사키 학원 스쿨 아이돌 동호회",
    "description": "도쿄 오다이바에 위치한 자유로운 교풍과 다양한 전공을 배울 수 있는 인기 고등학교 '니지가사키 학원'...",
    "poster": "/uploads/poster/nijigasaki_1.webp",
    "start_date": "2020-10-03",
    "end_date": "2020-12-26",
    "work_key": "nijigasaki"
  },
  "seasons": [
    {
      "season": "1",
      "season_key": "1",
      "poster": "/uploads/poster/nijigasaki_1.webp"
    },
    {
      "season": "ova",
      "season_key": "ova",
      "poster": "/uploads/poster/nijigasaki_ova.webp"
    }
  ]
}
```
6. GET /api/regions
설명: 모든 지역의 목록을 가져옵니다.
요청 예시:
GET /api/regions
응답 예시:
```json
[
  "시즈오카",
  "가나가와",
  "도쿄",
  "이시카와",
  "치바"
]
```
7. GET /api/regions/
설명: 특정 지역에 속한 도시 목록을 가져옵니다.
요청 예시:
GET /api/regions/tokyo
응답 예시:
```json
{
  "region": "도쿄",
  "cities": [
    "도쿄"
  ]
}
```

8. GET /api/regions/
설명: 특정 도시의 장소 목록을 가져옵니다.
요청 예시:
GET /api/regions/tokyo/tokyo
응답 예시:
```json
[
  {
    "place_id": 49,
    "address_city": "도쿄",
    "place_name": "다이바시티 도쿄프라자 세븐일레븐 옆",
    "address_district": "오다이바"
  }
]
```

9. GET /api/regions/
설명: 특정 구역의 장소 목록을 가져옵니다.
요청 예시:
GET /api/regions/tokyo/tokyo/odaiba
응답 예시:
``` json
[
  {
    "place_id": 49,
    "work_id": 33,
    "place_name": "다이바시티 도쿄프라자 세븐일레븐 옆",
    "description": "TVA 1기 오프닝 「무지갯빛 Passions!」 의 배경 (세츠나)",
    "address_region": "도쿄",
    "address_city": "도쿄",
    "address_district": "오다이바",
    "detailed_address": "일본 〒135-0064 Tokyo, Koto City, Aomi, 1 Chome−1−10 ダイバーシティ東京プラザ １階",
    "latitude": "35.625892237126",
    "longitude": "139.776293701677",
    "Images": [
      { "image_url": "/uploads/aniPlace/49.PNG" },
      { "image_url": "/uploads/realPlace/49.PNG" },
      { "image_url": "/uploads/userUpload/49.PNG" }
    ]
  }
]
```

10. GET /api/reviews
설명: 모든 리뷰 목록을 가져옵니다.
요청 예시:
GET /api/reviews
응답 예시:
```json
[
  {
    "review_id": 71,
    "place_id": 114,
    "user_id": 1,
    "rating": 3,
    "comment": "시모키타자와역 앞 대규모 광장 조성 때문에 25년 말에 철거된다는 소문이 있어요...",
    "User": {
      "user_name": "윤."
    },
    "Place": {
      "place_name": "아티스트 샷 촬영 장소",
      "description": "TVA 1기 4화 아티스트 사진 찍는 결속밴드",
      "address_region": "도쿄",
      "address_city": "도쿄",
      "address_district": "시모키타자와"
    },
    "Images": [
      { "image_url": "/uploads/aniPlace/114.PNG" },
      { "image_url": "/uploads/realPlace/114.PNG" }
    ]
  }
]
```