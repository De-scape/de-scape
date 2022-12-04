# prisma 명령어

#### \* MongoDB는 migration 관련 명령어를 지원하지 않음

## 프로젝트 초기화

### 1. prisma cli 설치

```
yarn add -D prisma
```

### 2. 프로젝트에 prisma 설정 초기화

```
npx prisma init
```

### 3. prisma client 설치

```
yarn add @prisma/client
```

### 4. prisma client generate

- schema 가 변경되면 generate 명령어를 사용해서 client를 업데이트

```
npx prisma generate
```

---

## 추가 명령어들

## prisma studio 실행

```
npx prisma studio
```

## schema 수정사항 적용하기

```
npx prisma db push
```

## schema 수정사항 가져오기

- MongoDB의 경우 re-introspection을 제공하지 않아서 pull을 사용하고 싶은 경우 --force 옵션을 추가해야함

```
npx prisma db pull
```
