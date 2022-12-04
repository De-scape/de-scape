# 개발을 위해 docker-compose로 MongoDB Replica set 구축

Replica set을 구축하는 이유

- fault-tolerance 시스템 구축
- Transaction 처리
  - MongoDB의 Transaction 작업은 Replica set을 기반으로 이루어지므로, MongoDB's Atlas 호스팅을 사용하지 않고 로컬 DB를 사용하는 경우 직접 Replica set을 구축해야함 (https://www.prisma.io/docs/guides/database/using-prisma-with-mongodb)

## 1. Docker Network 생성

- replica set 의 컨테이너들이 작동할 docker network 생성

```sh
docker network create mongoCluster
```

## 2. Key File 생성

- replica set에 참여하는 mongod 인스턴스 간의 인증, 클라이언트 접속 시 access control에 사용되는 key file 생성

```shell
openssl rand -base64 756 > mongodb.key
chmod 400 mongodb.key
```

## 3. 컨테이너 실행

```shell
docker-compose up --build -d
```

## 4. 컨테이너 접속

```shell
docker exec -it mongo1 /bin/bash
```

## 5. mongosh 접속

```shell
mongosh
```

## 6. MongoDB root 계정 생성

```shell
use admin
db.createUser({user: <root user name>, pwd: <root user password>, roles:['root']})
```

## 7. mongosh 생성한 계정으로 재접속

```shell
exit
mongosh -u <root username> -p <root password>
```

## 8. Replica set 초기화

```
config = {
    _id: "myReplicaSet",
    members: [
        {_id: 0, host: <hostIp>:27017},
        {_id: 1, host: <hostIp>:27018},
        {_id: 2, host: <hostIp>:27019},
    ]
}
- 주의점:
  - 로컬에서 구축할때는 host에 컨테이너 이름을 적어도되지만 원격 구축시 ip:port를 명시
rs.initiate(config)
```

## 9. Replica set 생성 결과 확인

```
# mongosh 재접속 후
rs.status()
```
