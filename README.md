# CORE (Code Review)

>## Introduction
- **CORE**는 사용자가 **코드 리뷰**를 직접 요청하기도 하고 리뷰를 할 수 있는 웹 어플리케이션 입니다.
---

>## Table of Contents
- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Test](#Test)
- [Deployment](#Deployment)
---

>## Installation
```
git clone https://github.com/Cheg-ya/corejs.git
npm i

//development
npm run dev
```
---

>## Features
- Github Social Login 기능
- JSON Web Token을 이용한 사용자 인증 및 로그인 유지
- 코드 리뷰 신청 포스팅 기능
- 리뷰를 원하는 줄에 코멘트 등록 기능
- 사용자가 등록한 포스트 모아 보기 기능
---

>## Skills
- Webpack을 사용해 Client-Side & Server-Side 통합 개발 환경 구축

>### Client-Side
- Babel을 이용한 Modern Javascript (ES6+)
- Axios & Async Await을 이용한 API 요청
- Firebase 기반 Social login 구현
- React Component 기반 UI 설계
- React Router 기반 SPA Routing 관리
- Redux를 활용한 Store 관리 및 Component 단위 Separate Concerns

>### Server-Side
- 자바스크립트 서버 플렛폼 Nodejs
- Server-Size 프레임워크 Express를 이용한 RESTful API 설계
- ODM 라이브러리 Mongoose
- MongoBD 기반 NoSQL Database 설계

>### Test
- 자바스크립트 테스트 프레임워크 Jest를 활용한 Unit Test
>### Deployment
- AWS Elastic beanstalk 서비스를 이용해 배포

>### Management Tool
- MockUp을 이용해 기획 단계 UX & UI 설계
- Lucid Chart를 활용해 Database Schema 설계
- Trello를 이용해 Server-side, Client-side 업무 세분화 및 탄력적 스케쥴 관리
---

>## Challenge
- Database Schema 변경으로 인한 Client-Side의 전반적인 수정 작업 발생
- 배포 단계에서 발생한 Static file path 문제
- 배포 환경에 대한 이해 부족으로 인한 새로고침 오류 문제

---
>## Need to be done
- Component Unit test
- Server-Side Code Refactoring & File Directory Re-structuring
---
