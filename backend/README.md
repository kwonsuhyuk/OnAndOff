# On & Off API

기존 Firebase Realtime Database 백엔드를 대체하기 위한 NestJS·PostgreSQL API입니다. 기존 React 앱은 유지하고 기능 단위로 REST API를 연결합니다.

## 기술 선택

- NestJS + TypeScript: 모듈 경계, Guard 기반 권한 제어, 테스트 가능한 구조
- PostgreSQL + Prisma: 근태·휴가·급여 데이터의 관계와 트랜잭션 보장
- JWT + Argon2: 서버 주도 인증과 안전한 비밀번호 해시
- Swagger: 프론트엔드 협업 및 API 포트폴리오 문서
- Jest: 서비스 단위 테스트

## 로컬 실행

```bash
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run start:dev
```

- API: `http://localhost:4000/api/v1`
- Swagger: `http://localhost:4000/docs`
- Health check: `http://localhost:4000/api/v1/health`

## 데이터 설계

`CompanyMember`는 사용자와 회사 사이의 멤버십입니다. 역할, 직무, 고용 형태, 급여는 사용자 자체가 아닌 회사별 멤버십에 속합니다. 근태·휴가·외근 데이터에는 모두 `companyId`가 포함되어 회사 간 데이터가 섞이지 않도록 합니다.

## 전환 순서

1. ✅ 인증 및 회사 멤버십 기반 연결
2. 회사·직무·근무지 관리
3. GPS 출퇴근과 서버 측 반경 검증
4. 외근·휴가 요청 및 트랜잭션 승인
5. 월별 근태 통계와 급여 정산
6. 알림과 기존 Firebase 데이터 마이그레이션

Firebase 제거는 마지막에 진행합니다. 전환 중에는 React의 API 모듈 단위로 Firebase 구현과 REST 구현을 교체합니다.

현재 React의 회원가입, 로그인, 세션 복원, 로그아웃은 이 API와 PostgreSQL을 사용합니다. 회사 설정과 근태 기능은 다음 단계 전환 전까지 Firebase를 사용합니다.
