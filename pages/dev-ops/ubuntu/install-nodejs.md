# Node.js 원하는 버전 설치

**ubuntu 20.04**에 특정 버전의 **_nodejs_**를 설치하고 싶을 때 설치하는 방법을 메모해 놓는다.

---

## APT Update & Upgrade

일단 패키징 툴인 `apt`를 최신화한다.

```bash
sudo apt update
sudo apt upgrade
```

## cURL installation

`cURL`은 **client URL**의 약자이며, 다양한 통신 프로토콜을 이용하여 데이터를 전송하기 위한 라이브러리와 명령어 도구를 제공하는 컴퓨터 소프트웨어 프로젝트이다.

여기서는 **NodeSource**에서 설치 스크립트를 다운로드하는 데에 사용되므로 없으면 설치한다.

```bash
sudo apt install -y curl
```

## grab NodeSource

1. 원하는 버전을 설치하기 위해 아래의 명령어에서 숫자 부분을 설치하고 싶은 버전으로 바꿔준다.

```bash filename="v.18"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

```bash filename="v.14"
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

2. 스크립트가 문제없이 받아졌으면 `apt update`를 다시 해준다.

```bash
sudo apt update
```

## Nodejs Installation

스크립트 다운로드 후, apt 업데이트에도 문제가 없었다면 이제 **_nodejs_**를 설치한다.

```bash
sudo apt install -y nodejs
```

설치가 끝나면 원하는 버전이 정상적으로 설치 되었는지 버전 체크를 하자.

```bash
node --version
```

끝.
